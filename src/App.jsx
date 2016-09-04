import React from 'react';

import styles from './App.css';
import logo from './logo.png';

export default () => (
  <div>
    <img src={logo} alt="logo" />
    <h1 className={styles.heading}>Hello from app</h1>
    <p className={styles.paragraph}>This is a paragraph</p>
    <input />
  </div>
);
