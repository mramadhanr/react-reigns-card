import React from 'react';

import CardCore from '../CardCore';
import styles from './index.module.css';
import imgSample from '../../media/img/sample-avatar.png';

const Card = () => {
  return (
    <CardCore className={styles.container}>
      <div className={styles.card}>
        <img src={imgSample} className={styles.img} alt="card" />
      </div>
    </CardCore>
  );
};

Card.propTypes = {};

Card.defaultProps = {};

export default Card;
