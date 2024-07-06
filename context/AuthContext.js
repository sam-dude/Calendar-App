import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Check AsyncStorage for user state on app load
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

  return (
    <AuthContext.Provider 
        value={{ 
          user, 
          setUser, 
          handleContextLogin, 
          handleLogout,
          events,
          saveEvents
        }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };