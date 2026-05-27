// src/components/EditProfileModal.tsx

import React from 'react';

import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Controller, useForm} from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from 'yup';

import CustomInput from './CustomInput';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../utils/responsive';

const schema = yup.object().shape({
  name: yup.string().required(),

  phone: yup.string().required(),

  email: yup.string().email().required(),
});

export default function EditProfileModal({
  visible,
  onClose,
  user,
  onSave,
}: any) {

  if (!user) return null;

  const {control, handleSubmit} =
    useForm({
      resolver: yupResolver(schema),

      defaultValues: {
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || '',
      },
    });

  const handleSave = async (
    data: any,
  ) => {
    try {
      const updatedUser = {
        ...user,
        ...data,
      };

      await onSave(updatedUser);
    } catch (error) {
      console.log(
        'Save Profile Error:',
        error,
      );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide">

      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            Edit Profile
          </Text>

          <Controller
            control={control}
            name="name"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <CustomInput
                label="Name"
                placeholder="Enter name"
                value={value}
                onChangeText={
                  onChange
                }
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <CustomInput
                label="Phone"
                placeholder="Enter phone"
                value={value}
                onChangeText={
                  onChange
                }
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <CustomInput
                label="Email"
                placeholder="Enter email"
                value={value}
                onChangeText={
                  onChange
                }
              />
            )}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={
                styles.cancelBtn
              }
              onPress={onClose}>
              <Text
                style={
                  styles.cancelText
                }>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit(
                handleSave,
              )}>
              <Text
                style={
                  styles.saveText
                }>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
  },

  modal: {
    backgroundColor: '#fff',
    borderRadius:
      moderateScale(18),
    padding: scale(20),
  },

  title: {
    fontSize: fontScale(18),
    fontWeight: '700',
    marginBottom:
      verticalScale(20),
  },

  buttons: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop:
      verticalScale(10),
  },

  cancelBtn: {
    flex: 1,
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius:
      moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },

  saveBtn: {
    flex: 1,
    height: verticalScale(48),
    backgroundColor:
      '#0F9D58',
    borderRadius:
      moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText: {
    color: '#333',
  },

  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
});
