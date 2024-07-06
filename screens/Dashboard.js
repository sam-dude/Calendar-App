import {he} from 'date-fns/locale';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Contact from '../components/Contact';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import { FetchEventsApi } from '../utils/api';

const Data = [
  {
    event: 'Panama Open Air',
    backColor: '#A68BF2',
    iconUrl: require('../assets/images/event/event5.png'),
    date: 'Fr 25 June, 2024.',
    avatarUrl: require('../assets/images/friends/DarleneRobertson.png'),
  },
  {
    event: 'Taylor Swift Concert',
    backColor: '#8BBAF2',
    iconUrl: require('../assets/images/event/event1.png'),
    date: 'Sa 26 June, 2024.',
    avatarUrl: require('../assets/images/friends/ArleneMcCoy.png'),
  },
  {
    event: 'Japan',
    backColor: '#F28B8B',
    iconUrl: require('../assets/images/event/event2.png'),
    date: 'Su 27 June, 2024.',
    avatarUrl: require('../assets/images/friends/CourtneyHenry.png'),
  },
  {
    event: 'Mail Opening',
    backColor: '#8BF28F',
    iconUrl: require('../assets/images/event/event3.png'),
    date: 'Mo 28 June, 2024.',
    avatarUrl: require('../assets/images/friends/TheresaWebb.png'),
  },
  {
    event: 'Football Club',
    backColor: '#F28BE2',
    iconUrl: require('../assets/images/event/event4.png'),
    date: 'Tu 29 June, 2024.',
    avatarUrl: require('../assets/images/friends/DarleneRobertson.png'),
  },
];

const Dashboard = () => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const [selectedCalendar, setSelectedCalendar] = useState(calendars[0]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthIncrease = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthDecrease = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const {user, events, saveEvents} = useContext(AuthContext);

  const fetchEvents = async () => {
    setIsFetching(true)
    const response = await FetchEventsApi(user.token)
    if(response) {
      saveEvents(response)
    }
    
    setIsFetching(false)
    console.log("Events", response)
  }
  useLayoutEffect(() => {
    console.log('fetching events')
    fetchEvents()
  }
  , [])

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/friends/Emily.png')}
          />
          <View style={styles.avatarText}>
            <Text style={styles.sm}>Welcome</Text>
            <Text style={styles.md}>{user.username}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.profileAdd}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/profile-add2x.jpg')}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.options}>
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
      <View style={styles.options}>
        <Text style={styles.text}>Month</Text>
        <View style={styles.dropdownButton}>
          <TouchableOpacity style={styles.option} onPress={handleMonthDecrease}>
            <Icon name="angle-left" style={styles.arrowIcon}></Icon>
          </TouchableOpacity>
          <View style={styles.calendarWrapper}>
            <AntDesign name="calendar" style={styles.calendar}></AntDesign>
            <Text style={styles.md}>
              <Text>{monthNames[currentMonth]}</Text> <Text>{currentYear}</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.option} onPress={handleMonthIncrease}>
            <Icon name="angle-right" style={styles.arrowIcon}></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.contactView}>
        <Text style={styles.text}>Events</Text>
        {
          events.length === 0 && isFetching ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: "#222"}}>Loading...</Text></View> : 
          <>
          <View>
            <Text style={styles.evenTitle}>This Week</Text>
            {events?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).map((item, index) => (
              <Contact
                key={index}
                event={item.event}
                backColor={item.backColor}
                iconUrl={item.iconUrl}
                date={item.startTime}
                avatarUrl={item.avatarUrl}
                item={item}
              />
            ))}
          </View>
          <View>
            <Text style={styles.evenTitle}>Next Week</Text>

            {Data.slice(3, 5).map((item, index) => (
              <Contact
                key={index}
                event={item.event}
                backColor={item.backColor}
                iconUrl={item.iconUrl}
                date={item.date}
                avatarUrl={item.avatarUrl}
                item={item}
              />
            ))}
          </View>
          </>
        }
      </ScrollView>
      <View style={styles.addIcon}>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation.navigate('Add an Event')}>
          <Image
            style={styles.optionIcon}
            source={require('../assets/images/gadgets/Vector2.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  text: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
  },
  dropdownButton: {
    color: '#222',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
    borderBottomColor: '#EEEEEE',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    height: 48,
    alignItems: 'center',
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  avatarWrapper: {
    flexDirection: 'row',
    width: 148,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sm: {
    color: '#888888',
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  md: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  avatarText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mr: {
    marginRight: 12,
  },
  profileAdd: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE',
  },
  plus: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  evenTitle: {
    color: '#888888',
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 12,
  },
  contactView: {
    height: 300,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#222',
  },

  calendar: {
    fontSize: 24,
    marginRight: 6,
  },
  calendarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderEffect: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRadius: 12,
    borderBottomColor: '#EEEEEE',
  },
});

export default Dashboard;
