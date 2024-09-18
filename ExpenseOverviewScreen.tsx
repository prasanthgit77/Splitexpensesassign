import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { loadData, AppData } from './storage';

interface Props {
  onBack: () => void;
}

const ExpenseOverviewScreen: React.FC<Props> = ({ onBack }) => {
  const [data, setData] = useState<AppData>({ friends: [], expenses: [] });

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expenses:</Text>
      <FlatList
        data={data.expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.amount}>Amount: ${item.amount.toFixed(2)}</Text>
            <Text style={styles.friends}>Friends Involved: {item.friends.join(', ')}</Text>
          </View>
        )}
      />
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6A8987',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A8987',
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    color: '#88BDF2',
    marginBottom: 4,
  },
  friends: {
    fontSize: 18,
    color: '#6A8987',
  },
  backButton: {
    backgroundColor: '#6A8987',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    opacity: 0.8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ExpenseOverviewScreen;
