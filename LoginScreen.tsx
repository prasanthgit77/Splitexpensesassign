import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveData, AppData } from './storage'; 

const LoginScreen: React.FC<{ onLogin: (username: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    if (username.trim() === '') {
      Alert.alert('Invalid Username', 'Please enter a valid username.');
      return;
    }

    
    const initialData: AppData = {
      friends: [],
      expenses: [],
    };

    await saveData(initialData);

    onLogin(username.trim()); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 16,
    backgroundColor: '#F3F9FC', 
  },
  header: {
    fontSize: 32, 
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#4A90E2', 
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A90E2', 
    padding: 12,
    marginBottom: 24,
    fontSize: 20, 
    borderRadius: 8, 
    backgroundColor: '#FFFFFF', 
    width: '100%', 
  },
  button: {
    backgroundColor: '#4A90E2', 
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    opacity: 0.9, 
  },
  buttonText: {
    fontSize: 20, 
    color: '#FFFFFF', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
