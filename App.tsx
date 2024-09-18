import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddFriendScreen from './AddFriendScreen';
import ExpenseOverviewScreen from './ExpenseOverviewScreen';
import SettleUpScreen from './SettleUpScreen';
import AddExpenseScreen from './AddExpenseScreen';
import FriendsScreen from './FriendScreen'; // Ensure this component exists

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUsername(username);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeScreen username={username} onNavigate={setCurrentScreen} />;
      case 'addFriend':
        return <AddFriendScreen onBack={() => setCurrentScreen('home')} />;
      case 'addExpense':
        return <AddExpenseScreen onBack={() => setCurrentScreen('home')} />;
      case 'expenseOverview':
        return <ExpenseOverviewScreen onBack={() => setCurrentScreen('home')} />;
      case 'settleUp':
        return <SettleUpScreen onBack={() => setCurrentScreen('home')} />;
      case 'friends':
        return <FriendsScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

