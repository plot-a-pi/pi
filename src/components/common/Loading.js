import React from 'react';
import styles from './Loading.css';
import loading from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <img src={loading} />
    </div>
  );
};

export default Loading;
