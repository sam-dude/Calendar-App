import {he} from 'date-fns/locale';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.infoDetail}>
          <Image
            source={require('../assets/images/friends/Emily.png')}
            style={styles.profileImag}
          />
          <Text style={styles.profileName}>{profileInfo.name}</Text>
          <Text style={styles.profileEmail}>{profileInfo.email}</Text>
        </View>
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/edit.png')}
            />
            <Text style={styles.md}>Edit Profile</Text>
          </View>
          <View>
            <Image
              style={styles.selectedIcon}
              source={require('../assets/images/gadgets/arrow-right.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/notification-bing.png')}
            />
            <Text style={styles.md}>Notifications</Text>
          </View>
          <View>
            <Image
              style={styles.selectedIcon}
              source={require('../assets/images/gadgets/arrow-right.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/refresh-2.png')}
            />
            <Text style={styles.md}>Sync Settings</Text>
          </View>
          <View>
            <Image
              style={styles.selectedIcon}
              source={require('../assets/images/gadgets/arrow-right.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/frame.png')}
            />
            <Text style={styles.md}>Manage Users</Text>
          </View>
          <View>
            <Image
              style={styles.selectedIcon}
              source={require('../assets/images/gadgets/arrow-right.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity style={styles.dropdownButton}>
          <View style={styles.option}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/images/gadgets/logout.png')}
            />
            <Text style={styles.redMd}>Log Out</Text>
          </View>
          <View></View>
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
});

export default Dashboard;
