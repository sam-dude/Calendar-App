import React from 'react';
import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Contact = ({iconUrl, event, date, avatarUrl, backColor}) => {
  return (
    <View style={[styles.contact, {backgroundColor: backColor}]}>
      <View style={styles.avatarLeft}>
        <Image style={(styles.avatar, styles.mr)} source={iconUrl} />
        <View style={styles.avatarMd}>
          <Text style={styles.eventName}>{event}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View>
        <Image style={styles.icon} source={avatarUrl} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    backgroundColor: 'red',
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  icon: {
    width: 24,
    height: 24,
  },
  mr: {
    marginRight: 12,
  },
  avatarLeft: {
    flexDirection: 'row',
  },
  eventName: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
  },
  date: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  avatarMd: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Contact;
