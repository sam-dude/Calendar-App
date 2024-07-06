import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import {CalendarProvider, CalendarContext} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { AuthContext } from '../context/AuthContext.js';
import { CreateEvent } from '../utils/api.js';
import { Data } from '../utils/faker.js';
// import {listGoogleEvent} from '../utils/api.js';
// import axios from 'axios';

const Calendar = ({navigation}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [text2, setText2] = useState('');
  const [title2, setTitle2] = useState('');
  const colors = [
    '#A68BF2',
    '#8BBAF2',
    '#F28B8B',
    '#8BF28F',
    '#F28BE2',
    '#8BD9F2',
  ];
  const calendars = [
    {
      name: 'Apple Calendar',
      img: require('../assets/images/gadgets/apple_logo.svg.png'),
    },
    {
      name: 'Google Calendar',
      img: require('../assets/images/gadgets/google_symbol.svg.png'),
    },
    {
      name: 'Outlook Calendar',
      img: require('../assets/images/gadgets/microsoft_outlook_logo.svg.png'),
    },
  ];
  const [selectedColor, setSelectedColor] = useState('#2196f3');
  const [eventDetail, setEventDetail] = useState({});
  const options = ['2 days', '7 days', '15 days'];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedDate, setSelectedDate] = useState('2024-06-15');
  const [editableFlag, setEditableFlag] = useState(true);
  const [selectedCalendar, setSelectedCalendar] = useState(calendars[0]);
  const transformEvents = (eventsArray) => {
    const transformed = {};
  
    eventsArray.forEach(event => {
      const dateKey = event.startTime.split('T')[0]; // Extract date in 'YYYY-MM-DD' format
      transformed[dateKey] = {
        selected: true,
        marked: true,
        eventTitle: event.title, // Assuming 'event' field is used as 'eventTitle'
        eventDescription: `Go to ${event.event}`, // Example of deriving 'eventDescription'
        selectedColor: colors[0], // Assuming 'colors' array is defined elsewhere
      };
    });
    // console.log("Transfromed ", transformed);
    return transformed;
  };
  
  const {user, events} = useContext(AuthContext)
  const [eventLists, setEvents] = useState(transformEvents(events));

  // const [eventLists, setEvents] = useState({
  //   '2024-06-15': {
  //     selected: true,
  //     marked: true,
  //     eventTitle: 'Birthday Party',
  //     eventDescription: 'Go to BirthDay Party',
  //     selectedColor: colors[0],
  //   },
  //   '2024-06-29': {
  //     selected: true,
  //     marked: true,
  //     eventTitle: 'Sport meeting',
  //     eventDescription: 'Basket ball tournament',
  //     selectedColor: colors[1],
  //   },
  //   '2024-06-06': {
  //     selected: true,
  //     marked: true,
  //     selectedColor: colors[2],
  //     eventTitle: 'Physic test',
  //     eventDescription: 'Lesson 3',
  //   },
  //   '2024-06-10': {
  //     selected: true,
  //     marked: true,
  //     selectedColor: colors[3],
  //     eventTitle: 'Music',
  //     eventDescription: 'Go to the Music Hall',
  //   },
  //   '2024-06-20': {
  //     selected: true,
  //     marked: true,
  //     selectedColor: colors[4],
  //     eventTitle: 'Family Party',
  //     eventDescription: 'Grandma birthday',
  //   },
  //   // Add more event days as needed
  // });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(Data[0]);
  const getDateString = dateInput => {
    // Ensure the input is a Date object
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
    console.log(date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };
  const customDatesStyles = [];

  for (const dateString in eventLists) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const eventData = eventLists[dateString];

    customDatesStyles.push({
      date: date,
      style: {
        backgroundColor: eventData.selectedColor || 'blue',
      },
      textStyle: {
        color: 'white',
      },
      containerStyle: [],
      allowDisabled: true,
    });
  }
  const [eventDetails, setEventDetails] = useState(null);
  const onDayPress = date => {
    console.log(date, '--');
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(date);
    if (eventLists[dateString]) {
      setEventDetails({
        ...eventLists[dateString],
        selectedColor: eventLists[dateString].selectedColor || '#2196f3', // Use the event's selectedColor or default to blue
      });
      setEditableFlag(false);
      setTitle(eventLists[dateString].eventTitle);
      setText(eventLists[dateString].eventDescription);
      setTitle2(eventLists[dateString].eventTitle);
      setText2(eventLists[dateString].eventDescription);
      setIsVisible(true);
    } else {
      setTitle('');
      setText('');
      setEventDetails(null);
      setEditableFlag(true);
    }
  };

  const handleTextChange = newText => {
    setText(newText);
  };

  const handleTitleChange = newText => {
    setTitle(newText);
  };

  const handleTextChange2 = newText => {
    setText2(newText);
  };

  const handleTitleChange2 = newText => {
    setTitle2(newText);
  };

  const changeName = name => {
    let newName = '';
    for (let i = 0; i < name.length; i++) {
      if (i > 0 && name[i] === name[i].toUpperCase()) {
        newName = newName + ' ' + name[i];
      } else {
        newName += name[i];
      }
    }
    return newName;
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const handleOptionSelected = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleColorSelect = color => {
    setSelectedColor(color);
  };

  const [addingEvent, setAddingEvent] = useState(false);
  const addEvent = async () => {
    setAddingEvent(true);
    console.log("selectedDate");
    const newEvents = {...eventLists};
    const date = getDateString(selectedDate);
    newEvents[date] = {
      selected: true,
      marked: true,
      eventTitle: title,
      eventDescription: text,
      selectedColor: selectedColor,
    };
    // console.log(newEvents);
    setEvents(newEvents);
    const eventObjToServer = {
      user: selectedFriend.name,
      eventTitle: title,
      eventDescription: text,
      color: selectedColor,
      duration: selectedOption,
      startTime: selectedDate,
      endTime: selectedDate,
      creationTime: new Date(),
      creationUser: user.username,
      tag: selectedFriend.name,
      event: title,
    };

    const response = await CreateEvent(user.token, eventObjToServer);
    console.log(response);
    setAddingEvent(false);
    navigation.goBack()
  };
  const handleEventDelete = date => {
    setEvents(prevEvents => {
      // Make a copy of the existing eventLists
      const newEvents = {...prevEvents};

      // Delete the event object with the specified date
      delete newEvents[getDateString(date)];

      return newEvents;
    });
  };

  const deleteEvent = () => {
    handleEventDelete(selectedDate);
    setIsVisible(false);
    // Alert.alert(' Success', 'You delete the event successfully', [
    //   {
    //     text: 'OK',
    //     style: 'cancel',
    //     onPress: () => {
    //       navigation.reset({
    //         index: 0,
    //         // routes: [{name: 'Calendar'}],
    //       });
    //     },
    //   },
    // ]);
  };

  const handleEventUpdate = (date, event) => {
    setEvents(prevEvents => {
      // Make a copy of the existing eventLists
      const newEvents = {...prevEvents};
      console.log(event);
      if (newEvents[date]) {
        // If the dte exists, update the event object with the new values
        newEvents[date] = {
          ...newEvents[date],
          ...event,
        };
      }
      return newEvents;
    });
  };

  const updateEvent = () => {
    setActionFlag(!actionFlag);

    if (actionFlag) {
      console.log(getDateString(selectedDate));
      const updateEvent = {
        eventTitle: title2,
        eventDescription: text2,
      };
      handleEventUpdate(getDateString(selectedDate), updateEvent);
      setIsVisible(false);
      setTitle(title2);
      setText(text2);
    }
  };
  // const handleListEvents = async (month, year) => {
  //   try {
  //     const eventLists = await listGoogleEvent(month, year);
  //     // Handle the fetched eventLists, e.g., update the UI
  //     console.log('Events:', eventLists);
  //   } catch (error) {
  //     console.error('Error fetching eventLists:', error);
  //   }
  // };

  useEffect(() => {
    // const fetchEvents = async () => {
    //   try {
    //     if (selectedYear !== null && selectedMonth !== null) {
    //       const fetchedEvents = await listGoogleEvent(
    //         selectedMonth,
    //         selectedYear,
    //       );
    //       setEvents(fetchedEvents);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching eventLists:', error);
    //   }
    // };
    // fetchEvents();
    // listGoogleEvent(selectedMonth, selectedYear)
    //   .then(data => {
    //     setEvents(data);
    //   })
    //   .catch(error => console.error('Error:', error));
    // console.log([eventLists]);
  }, [selectedYear, selectedMonth]);

  return (
    <ScrollView style={styles.container}>
      <View style={(styles.options, styles.mb)}>
        <Text style={styles.text}>Calendar</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}>
          <View style={styles.option}>
            <Image
              style={(styles.optionIcon, styles.mr)}
              source={selectedCalendar.img}
            />
            <Text style={styles.md}>{selectedCalendar.name}</Text>
          </View>
          <View>
            {isDropdownOpen ? (
              <Icon name="chevron-up" size={18} color="#222" />
            ) : (
              <Icon name="chevron-down" size={18} color="#222" />
            )}
          </View>
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={(styles.dropdownMenu, styles.borderEffect)}>
            {calendars
              .filter(value => value.name !== selectedCalendar.name)
              .map((calendar, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedCalendar(calendar);
                    setIsDropdownOpen(false);
                  }}>
                  <View style={styles.option}>
                    <Image
                      style={(styles.optionIcon, styles.mr)}
                      source={calendar.img}
                    />
                    <Text style={styles.md}>{calendar.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTitleChange}
          value={title}
          placeholder="Event title"
          editable={editableFlag}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
          placeholder="Event description"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          editable={editableFlag}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Color</Text>
        <View style={styles.colorContainer}>
          {colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorBox, {backgroundColor: color}]}
              onPress={() => handleColorSelect(color)}>
              {selectedColor === color && (
                <Icon
                  name="check"
                  size={24} // Set the icon size
                  color="#FFF"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Date</Text>
        <CalendarProvider>
          <CalendarContext.Consumer>
            {context => (
              <View style={styles.container}>
                <CalendarPicker
                  style={styles.calendar}
                  startFromMonday={true}
                  todayBackgroundColor="#aaaaaa"
                  selectedDayTextColor="#FFFFFF"
                 
                  selectedDayColor={selectedColor}
                  dayOfWeekStyles={{borderBottomColor: 'red'}}
                  markedDates={eventLists}
                  onDateChange={onDayPress}
                  onMonthChange={date => {
                    const year = date.getFullYear();
                    const month = date.getMonth() + 1; // Months are zero-indexed
                    setSelectedYear(year);
                    setSelectedMonth(month);
                  }}
                  customDatesStyles={customDatesStyles}
                  previousComponent={
                    <Icon
                      name="chevron-left"
                      size={20}
                      color="#000"
                      marginLeft={30}
                    />
                  }
                  nextComponent={
                    <Icon
                      name="chevron-right"
                      size={20}
                      color="#000"
                      marginRight={30}
                    />
                  }
                  customStyles={{
                    container: {
                      backgroundColor: '#FBFBFB',
                    },
                    day: {
                      fontSize: 16,
                      textAlign: 'center',
                    },
                    headerWrapper: {
                      borderBottomWidth: 0,
                    },
                  }}
                />

                <Text style={styles.selectedDateText}>
                  Selected Date:
                  <Text>
                    {selectedMonth === undefined ? 'asd' : selectedYear}
                  </Text>
                </Text>
              </View>
            )}
          </CalendarContext.Consumer>
        </CalendarProvider>
      </View>
      <Modal isVisible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.section}>
            <Text style={styles.text}>Title</Text>
            <TextInput
              style={styles.input2}
              editable={actionFlag}
              onChangeText={handleTitleChange2}>
              {title2}
            </TextInput>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Description</Text>
            <TextInput
              style={styles.input2}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={handleTextChange2}
              editable={actionFlag}>
              {text2}
            </TextInput>
          </View>
          <View style={styles.eventActionGroup}>
            <TouchableOpacity style={styles.eventAction} onPress={updateEvent}>
              <Text style={styles.text}>
                {!actionFlag ? 'Edit Event' : 'Save Event'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eventAction} onPress={deleteEvent}>
              <Text style={styles.text}>Delete Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eventAction}
              onPress={() => setIsVisible(false)}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.section}>
        <Text style={styles.text}>Duration</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{selectedOption}</Text>
          <Text style={styles.dropdownIcon}>
            {isDropdownOpen ? (
              <Icon name="chevron-up" size={18} color="#222" />
            ) : (
              <Icon name="chevron-down" size={18} color="#222" />
            )}
          </Text>
        </TouchableOpacity>
        {isDropdownOpen && (
          <View style={styles.dropdownMenu}>
            {options
              .filter(value => value !== selectedOption)
              .map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => {
                    handleOptionSelected(option);
                  }}>
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Person</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown2}>
          <View style={styles.friend}>
            <Image source={selectedFriend.iconUrl} style={styles.logo} />
            <Text style={styles.dropdownText}>
              {changeName(selectedFriend.name)}
            </Text>
          </View>
          <Text style={styles.dropdownIcon}>
            {isDropdownOpen2 ? (
              <Icon name="chevron-up" size={18} color="#222" />
            ) : (
              <Icon name="chevron-down" size={18} color="#222" />
            )}
          </Text>
        </TouchableOpacity>
        {isDropdownOpen2 && (
          <View style={styles.dropdownMenu}>
            {Data.filter(value => value.name !== selectedFriend.name).map(
              (friend, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownButton2}
                  onPress={() => {
                    setSelectedFriend(friend);
                    setIsDropdownOpen2(false);
                  }}>
                  <View style={styles.friend}>
                    <Image source={friend.iconUrl} style={styles.logo} />
                    <Text style={styles.dropdownText}>
                      {changeName(friend.name)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            )}
          </View>
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button1} onPress={addEvent} disabled={addingEvent}>
          <AntDesign
            name="plus"
            size={20}
            color={'#FFF'}
            style={{marginRight: 10}}></AntDesign>
          <Text style={styles.buttonText} >
            {addingEvent ? 'Adding Event...' : 'Add Event'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    padding: 20,
    minHeight: '100vh',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  text: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'DM Sans',
    fontSize: 14,
    lineHeight: 18,
    color: '#222',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingLeft: 20,
  },
  input2: {
    backgroundColor: '#F5F5F5',
    fontFamily: 'DM Sans',
    fontSize: 14,
    lineHeight: 18,
    color: '#222',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 6,
    paddingLeft: 10,
  },
  dropdownButton: {
    color: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderBottomColor: '#EEEEEE',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    height: 48,
  },
  dropdownButton2: {
    color: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    height: 48,
  },
  dropdownText: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20,
  },
  button1: {
    backgroundColor: '#007AFF',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  dropdownMenu: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#EEEEEE',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  dropdownOptionText: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 0,
  },
  eventAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventActionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mr: {
    marginRight: 12,
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  md: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  borderEffect: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRadius: 12,
    borderBottomColor: '#EEEEEE',
  },
  dropdownOption: {
    color: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#ffffff',
    height: 48,
    alignItems: 'center',
  },
  mb: {
    marginBottom: 12,
  },
});

export default Calendar;
