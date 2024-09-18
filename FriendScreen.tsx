import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { loadData, AppData } from './storage';

const FriendsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
      <Text style={styles.header}>Friends List</Text>
      <FlatList
        data={data.friends}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.username}>{item.username}</Text>
          </View>
        )}
      />
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
    marginBottom: 8,
    borderRadius: 8,
  },
  username: {
    fontSize: 20,
    color: '#6A8987',
  },
  button: {
    backgroundColor: '#88BDF2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default FriendsScreen;
