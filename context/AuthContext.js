import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import RNCalendarEvents from 'react-native-calendar-events';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [calendarPermissions, setCalendarPermissions] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    // Request calendar permissions on app load
    RNCalendarEvents.requestPermissions().then((status) => {
      setCalendarPermissions(status);
      console.log('Calendar permissions', status);
    });
  }, []);

  const handleContextLogin = async (user) => {
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  const saveEvents = async (events) => {
    setEvents(events);
    await AsyncStorage.setItem('events', JSON.stringify(events));
  }

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const addEventToDeviceCalendar = async (event) => {
    try {
      const { title, description, startDate, endDate, calendar } = event;
      const calendarEventId = await RNCalendarEvents.saveEvent(title, {
        startDate,
        endDate,
        notes: description,
        calendarId: calendar, // Customize for specific calendar if necessary
      });
      console.log('Event added to device calendar with ID:', calendarEventId);
    } catch (error) {
      console.error('Error adding event to device calendar:', error);
    }
  };

  const editEventInDeviceCalendar = async (eventId, updatedEvent) => {
    try {
      const { title, description, startDate, endDate, calendar } = updatedEvent;
      await RNCalendarEvents.saveEvent(title, {
        id: eventId,
        startDate,
        endDate,
        notes: description,
        calendarId: calendar, // Customize for specific calendar if necessary
      });
      console.log('Event updated in device calendar');
    } catch (error) {
      console.error('Error updating event in device calendar:', error);
    }
  };

  const deleteEventFromDeviceCalendar = async (eventId) => {
    try {
      await RNCalendarEvents.removeEvent(eventId);
      console.log('Event deleted from device calendar');
    } catch (error) {
      console.error('Error deleting event from device calendar:', error);
    }
  };

  const addBulkEventsToDeviceCalendar = async (events) => {
    try {
      for (const event of events) {
        await addEventToDeviceCalendar(event);
      }
      console.log('Bulk events added to device calendar');
    } catch (error) {
      console.error('Error adding bulk events to device calendar:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        handleContextLogin, 
        handleLogout, 
        events, 
        saveEvents, 
        addEventToDeviceCalendar, 
        editEventInDeviceCalendar, 
        deleteEventFromDeviceCalendar, 
        addBulkEventsToDeviceCalendar,
        calendarPermissions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
