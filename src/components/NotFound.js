import React from 'react';
import Asset from './Asset';
import styles from '../styles/NotFound.module.css';
import NoResultsImage from '../assets/no-results.png';

// 404 page
const NotFound = () => {
  return (
    <div className={styles.Margin}>
      <Asset
        src={NoResultsImage}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </div>
  );
};

export default NotFound;