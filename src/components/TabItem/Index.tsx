import React from 'react';
import {colors} from '../../utils/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fonts} from '../../utils/Fonts';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const renderIcon = () => {
    if (label === 'Home') {
      return isFocused ? (
        <FontAwesome5 name={'home'} size={18} color={colors.primary} />
      ) : (
        <FontAwesome5 name={'home'} size={18} color={colors.secondary} />
      );
    }

    if (label === 'Order') {
      return isFocused ? (
        <FontAwesome5
          name={'clipboard-list'}
          size={18}
          color={colors.primary}
        />
      ) : (
        <FontAwesome5
          name={'clipboard-list'}
          size={18}
          color={colors.secondary}
        />
      );
    }

    if (label === 'Profile') {
      return isFocused ? (
        <FontAwesome5 name={'user-alt'} size={18} color={colors.primary} />
      ) : (
        <FontAwesome5 name={'user-alt'} size={18} color={colors.secondary} />
      );
    }

    return <FontAwesome5 name={'home'} size={18} color={colors.secondary} />;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      activeOpacity={1}>
      {renderIcon()}
      <Text
        style={{
          color: isFocused ? colors.primary : colors.secondary,
          fontFamily: fonts.Regular,
          fontSize: 12,
          marginBottom: -6,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({});
