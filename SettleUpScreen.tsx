import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { loadData, saveData, AppData, Friend, Expense } from './storage';

const SettleUpScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [data, setData] = useState<AppData>({ friends: [], expenses: [] });
  const [amount, setAmount] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [results, setResults] = useState<{ username: string, amountOwed: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadData();
        setData(result);
        setUsername('User');
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectFriend = (username: string) => {
    setSelectedFriends(prev =>
      prev.includes(username) ? prev.filter(name => name !== username) : [...prev, username]
    );
  };

  const calculateResults = () => {
    if (!username) return;

    const peopleSharing = [username, ...selectedFriends];
    const splitAmount = parseFloat(amount) / peopleSharing.length;

    const results = peopleSharing.map(person => ({
      username: person,
      amountOwed: splitAmount,
    }));

    setResults(results);
  };

  const handleSubmit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (selectedFriends.length === 0 && !username) {
      Alert.alert('No Friends Selected', 'Please select at least one friend or enter your username.');
      return;
    }

    const peopleSharing = [username, ...selectedFriends].filter(Boolean) as string[];
    if (peopleSharing.length === 0) {
      Alert.alert('Error', 'No one to share the expense with.');
      return;
    }

    const splitAmount = parsedAmount / peopleSharing.length;

    const updatedFriends = data.friends.map((friend: Friend) => {
      if (peopleSharing.includes(friend.username)) {
        return { ...friend, balance: friend.balance + splitAmount };
      }
      return friend;
    });

    const newExpense: Expense = {
      title: 'Shared Expense',
      amount: parsedAmount,
      friends: peopleSharing,
    };

    const updatedData: AppData = {
      ...data,
      friends: updatedFriends,
      expenses: [...data.expenses, newExpense],
    };

    try {
      await saveData(updatedData);
      setData(updatedData);
      calculateResults();
      setAmount('');
      setSelectedFriends([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
      console.error('Failed to save data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settle Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>Select Friends:</Text>
      <FlatList
        data={data.friends}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.friendItem,
              selectedFriends.includes(item.username) && styles.selectedFriend
            ]}
            onPress={() => handleSelectFriend(item.username)}
          >
            <Text style={styles.friendText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Split Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>Amount Owed:</Text>
          {results.map(result => (
            <Text key={result.username} style={styles.resultItem}>
              {result.username}: ${result.amountOwed.toFixed(2)}
            </Text>
          ))}
        </View>
      )}
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
    padding: 12,
    marginBottom: 16,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedFriend: {
    backgroundColor: '#e0e0e0',
  },
  friendText: {
    fontSize: 18,
    color: '#6A8987',
  },
  submitButton: {
    backgroundColor: '#6A8987',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    opacity: 0.8,
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: '#6A8987',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    opacity: 0.8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6A8987',
  },
  resultItem: {
    fontSize: 20,
    color: '#6A8987',
    marginBottom: 4,
  },
});

export default SettleUpScreen;
