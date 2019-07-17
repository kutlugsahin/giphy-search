import React from 'react';
import ImageProvider from './ImageProvider';
import styles from './app.module.css';
import AppBar from './AppBar';
import ImageList from './ImageList';

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className={styles.app}>
        <AppBar />
        <ImageList />
      </div>
    </ImageProvider>
  );
}

export default App;
