import {he} from 'date-fns/locale';
import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Dashboard = () => {
  const profileInfo = {
    imgUrl: '../assets/images/social/Emily.png',
    name: 'Emily Gibbs',
    email: 'emilygibbs@gmail.com',
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleSwitch}>
          <View style={styles.option}>
            <Text style={styles.mdBold}>Auto Sync</Text>
          </View>
          <View>
            <Switch
              style={styles.switchContainer}
              trackColor={{false: '#F5F5F5', true: '#F5F5F5'}}
              thumbColor={isEnabled ? '#007AFF' : 'grey'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        <Text style={styles.text}>Calendars</Text>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/apple_logo.svg.png')}
            />
            <Text style={styles.md}>Apple</Text>
          </View>
          <View>
            <Text style={styles.blue}>Sync</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/google_symbol.svg.png')}
            />
            <Text style={styles.md}>Google</Text>
          </View>
          <View>
            <Text style={styles.blue}>Sync</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/microsoft_outlook_logo.svg.png')}
            />
            <Text style={styles.md}>Outlook</Text>
          </View>
          <View>
            <Text style={styles.blue}>Sync</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity style={styles.button1}>
          <Image
            style={styles.add}
            source={require('../assets/images/gadgets/add.png')}
          />
          <Text style={styles.buttonText}>Add Calendar</Text>
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
  info: {
    alignItems: 'center',
  },
  infoDetail: {
    width: 154,
    height: 177,
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImag: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  profileName: {
    fontFamily: 'DM Sans',
    fontSize: 14,
    lineHeight: 18,
    color: '#222',
    marginBottom: 4,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 8,
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
    marginBottom: 8,
    alignItems: 'center',
  },
  md: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  mdBold: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  selectedIcon: {
    width: 24,
    height: 24,
  },
  redMd: {
    color: '#FF0000',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  logout: {
    width: '100%',
    position: 'absolute',
    bottom: 12,
    right: 20,
  },
  text: {
    color: '#222',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
  },
  blue: {
    color: '#007AFF',
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  button1: {
    backgroundColor: '#007AFF',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 12,
    alignItems: 'center',
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

  add: {
    width: 24,
    height: 24,
  },
});

export default Dashboard;
