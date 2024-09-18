import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { loadData } from './storage';

interface Friend {
  username: string;
  balance: number;
}

interface HomeScreenProps {
  username: string | null;
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username, onNavigate }) => {
  const [data, setData] = React.useState<{ friends: Friend[]; expenses: any[] }>({
    friends: [],
    expenses: [],
  });

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

  const handleNavigate = (screen: string) => {
    onNavigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {username}!</Text>
      <Text style={styles.baseline}>Record, Connect, Split... Easy way!! Happy Payments :)</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('addFriend')}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('friends')}>
          <Text style={styles.buttonText}>View Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('addExpense')}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('expenseOverview')}>
          <Text style={styles.buttonText}>View Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('settleUp')}>
          <Text style={styles.buttonText}>Settle Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#BDDDFC',
  },
  welcome: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#6A8987',
  },
  baseline: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
    color: '#6A8987',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#88BDF2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    opacity: 0.9,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
