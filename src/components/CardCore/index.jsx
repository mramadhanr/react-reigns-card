import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './index.module.css';

const CardCore = ({ className, maxRotation, maxRotationDistance, children }) => {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getDirection = x => (x > 0 ? 1 : -1);

  const getCardRotation = x => {
    const direction = getDirection(x);
    const normalizedX = Math.abs(x) > maxRotationDistance ? direction * maxRotationDistance : x;
    const tmpRotation = (normalizedX / maxRotationDistance) * maxRotation;
    setRotation(tmpRotation);
  };

  const onCardDrag = (evt, data) => {
    const { x, y } = data;
    getCardRotation(x);
    setPosition({ x, y });
  };

  const onCardRelease = () => {
    getCardRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Draggable
      onDrag={onCardDrag}
      onStop={onCardRelease}
      defaultClassNameDragging={styles['card--dragging']}
      position={position}
    >
      <div className={`${styles['card--transition']}`}>
        <div
          id="card-rotation"
          className={`${styles['card--transition']} ${styles['card--size']} ${className}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
};

CardCore.propTypes = {
  className: PropTypes.string,
  maxRotation: PropTypes.number,
  maxRotationDistance: PropTypes.number,
  children: PropTypes.oneOfType(PropTypes.arrayOf([PropTypes.element]), PropTypes.element)
};

CardCore.defaultProps = {
  className: '',
  maxRotation: 15,
  maxRotationDistance: 150,
  children: null
};

export default CardCore;
