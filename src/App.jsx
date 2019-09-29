import React from 'react';
import styles from './App.module.css';
import CardStack from './components/CardStack';

const App = () => {
  return (
    <div className={styles.container}>
      <CardStack />
    </div>
  );
};

export default App;
