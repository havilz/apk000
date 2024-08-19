import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function NotificationSettings({ navigation }) {
  const [emailNotification, setEmailNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan Email/Notifikasi</Text>

      {/* Pengaturan Email Notifikasi */}
      <View style={styles.settingOption}>
        <Text style={styles.label}>Email Notifikasi</Text>
        <Switch
          value={emailNotification}
          onValueChange={(value) => setEmailNotification(value)}
        />
      </View>

      {/* Pengaturan Push Notifikasi */}
      <View style={styles.settingOption}>
        <Text style={styles.label}>Push Notifikasi</Text>
        <Switch
          value={pushNotification}
          onValueChange={(value) => setPushNotification(value)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
