import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExpenseItemProps {
  amount: number;
  description: string;
  users: string[];
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ amount, description, users }) => {
  return (
    <View style={styles.expenseItem}>
      <Text>{description}: ${amount.toFixed(2)}</Text>
      <Text>Shared by: {users.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default ExpenseItem;
