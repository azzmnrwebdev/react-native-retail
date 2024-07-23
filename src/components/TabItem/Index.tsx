import React from 'react';
import {colors} from '../../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, TouchableOpacity} from 'react-native';
import {fonts} from '../../utils/Fonts';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const renderIcon = () => {
    if (label === 'Home') {
      return isFocused ? (
        <MaterialCommunityIcons
          name={'view-dashboard'}
          size={24}
          color={colors.info}
        />
      ) : (
        <MaterialCommunityIcons
          name={'view-dashboard-outline'}
          size={24}
          color={colors.secondary}
        />
      );
    }

    if (label === 'Order') {
      return isFocused ? (
        <MaterialCommunityIcons
          name={'clipboard-text'}
          size={24}
          color={colors.info}
        />
      ) : (
        <MaterialCommunityIcons
          name={'clipboard-text-outline'}
          size={24}
          color={colors.secondary}
        />
      );
    }

    if (label === 'Wishlist') {
      return isFocused ? (
        <MaterialCommunityIcons name={'heart'} size={24} color={colors.info} />
      ) : (
        <MaterialCommunityIcons
          name={'heart-outline'}
          size={24}
          color={colors.secondary}
        />
      );
    }

    if (label === 'Profile') {
      return isFocused ? (
        <MaterialCommunityIcons
          name={'account'}
          size={24}
          color={colors.info}
        />
      ) : (
        <MaterialCommunityIcons
          name={'account-outline'}
          size={24}
          color={colors.secondary}
        />
      );
    }

    return (
      <MaterialCommunityIcons
        name={'view-dashboard-outline'}
        size={24}
        color={colors.secondary}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      activeOpacity={1}>
      {renderIcon()}
      <Text
        style={{
          color: isFocused ? colors.info : colors.secondary,
          fontFamily: fonts.Regular,
          fontSize: 10,
          marginBottom: -2,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;
