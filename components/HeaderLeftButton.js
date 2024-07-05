import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/Feather';
const styles = StyleSheet.create({
  left: {
    marginLeft: 20,
    marginRight: -10,
  },
  leftIcon: {
    fontSize: 24,
    color: '#222222',
  },
});

const HeaderLeftButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.left}>
      <AntDesign name="chevron-left" style={styles.leftIcon} />
    </TouchableOpacity>
  );
};

export default HeaderLeftButton;
