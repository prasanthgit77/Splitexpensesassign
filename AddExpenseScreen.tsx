import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { loadData, saveData, AppData, Friend, Expense } from './storage';

const AddExpenseScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [data, setData] = useState<AppData>({ friends: [], expenses: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadData();
        setData(result);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (selectedFriends.length === 0) {
      Alert.alert('No Friends Selected', 'Please select at least one friend.');
      return;
    }

    const newExpense: Expense = {
      title,
      amount: parsedAmount,
      friends: selectedFriends,
    };

    const updatedFriends = data.friends.map((friend: Friend) => {
      if (selectedFriends.includes(friend.username)) {
        return { ...friend, balance: friend.balance + parsedAmount / selectedFriends.length };
      }
      return friend;
    });

    const updatedData: AppData = {
      ...data,
      friends: updatedFriends,
      expenses: [...data.expenses, newExpense],
    };

    try {
      await saveData(updatedData);
      setData(updatedData);
      setTitle('');
      setAmount('');
      setSelectedFriends([]);
      onBack();
    } catch (error) {
      console.error('Failed to save expense:', error);
      Alert.alert('Error', 'Failed to add expense.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>Select Friends:</Text>
      {data.friends.map((friend) => (
        <View key={friend.username} style={styles.friendItem}>
          <Text style={styles.friendName}>{friend.username}</Text>
          <TouchableOpacity
            style={[
              styles.selectButton,
              selectedFriends.includes(friend.username) && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedFriends((prev) =>
                prev.includes(friend.username)
                  ? prev.filter((username) => username !== friend.username)
                  : [...prev, friend.username]
              );
            }}
          >
            <Text style={styles.buttonText}>
              {selectedFriends.includes(friend.username) ? 'Deselect' : 'Select'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#6A8987',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6A8987',
    padding: 16,
    marginBottom: 16,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6A8987',
  },
  friendItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#6A8987',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  friendName: {
    fontSize: 20,
    color: '#6A8987',
  },
  selectButton: {
    backgroundColor: '#88BDF2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    opacity: 0.8,
  },
  selectedButton: {
    backgroundColor: '#6A8987',
  },
  submitButton: {
    backgroundColor: '#88BDF2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    opacity: 0.8,
  },
  backButton: {
    backgroundColor: '#6A8987',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddExpenseScreen;

