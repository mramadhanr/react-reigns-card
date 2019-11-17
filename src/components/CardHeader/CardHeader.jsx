import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './CardHeader.module.css';

const CardHeader = ({ text, rotation, active }) => {
  const [height, setHeight] = useState(0);
  const textContainerRef = useRef(null);

  useEffect(() => {
    const { current } = textContainerRef;
    if (current) {
      const { offsetHeight } = current;
      setHeight(offsetHeight);
    }
  }, [textContainerRef]);

  return (
    <div className={`${styles.header}  ${active ? styles.show : styles.hide}`}>
      <div className={styles.foreground} style={{ height }}>
        <div
          className={`${styles['foreground-color']}  ${active ? '' : styles['header--transition']}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>
      <div
        className={`${styles.header__text} ${active ? '' : styles['header--transition']}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        ref={textContainerRef}
      >
        <div className={styles['header__text--padding']}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

CardHeader.propTypes = {
  text: PropTypes.string,
  rotation: PropTypes.number,
  active: PropTypes.bool
};

CardHeader.defaultProps = {
  text: '',
  rotation: 0,
  active: false
};

export default CardHeader;
