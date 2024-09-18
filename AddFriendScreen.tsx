import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loadData, saveData, AppData, Friend } from './storage';

const AddFriendScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [username, setUsername] = useState('');

  const handleAddFriend = async () => {
    if (username.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid username.');
      return;
    }

    try {
      const data = await loadData();
      const existingFriend = data.friends.find(friend => friend.username === username);

      if (existingFriend) {
        Alert.alert('Duplicate Friend', 'This friend already exists.');
        return;
      }

      const newFriend: Friend = { username, balance: 0 };
      const updatedData: AppData = {
        ...data,
        friends: [...data.friends, newFriend],
      };

      await saveData(updatedData);
      setUsername('');
      onBack();
    } catch (error) {
      console.error('Failed to save friend:', error);
      Alert.alert('Error', 'Failed to add friend.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter friend's username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#BDDDFC',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#6A8987',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6A8987',
    padding: 12,
    marginBottom: 24,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#88BDF2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default AddFriendScreen;
