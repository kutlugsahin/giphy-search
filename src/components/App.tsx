import React from 'react';
import ImageProvider from '../providers/ImageProvider';
import styles from './app.module.css';
import AppBar from './AppBar';
import ImageList from './ImageList';
import LayoutProvider from '../providers/LayoutProvider';

export default () => {
  return (
    <ImageProvider>
      <LayoutProvider>
        <div className={styles.app}>
          <AppBar />
          <ImageList />
        </div>
      </LayoutProvider>
    </ImageProvider>
  );
}