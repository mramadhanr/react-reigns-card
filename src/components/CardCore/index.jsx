import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

import styles from './index.module.css';
import CardHeader from '../CardHeader/CardHeader';

const CardCore = ({
  className,
  maxRotation,
  maxRotationDistance,
  headerRotationMultiplier,
  swipeThreshold,
  children
}) => {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSwiped, setSwiped] = useState(false);
  const [isDragging, setDragging] = useState(false);

  const getDirection = x => (x > 0 ? 1 : -1);

  const getCardRotation = x => {
    const direction = getDirection(x);
    const normalizedX = Math.abs(x) > maxRotationDistance ? direction * maxRotationDistance : x;
    const tmpRotation = (normalizedX / maxRotationDistance) * maxRotation;
    setRotation(tmpRotation);
  };

  const onCardStart = () => {
    setDragging(true);
  };

  const onCardDrag = (evt, data) => {
    const { x, y } = data;
    getCardRotation(x);
    setPosition({ x, y });
  };

  const onCardRelease = (evt, data) => {
    const { x } = data;
    setDragging(false);

    if (Math.abs(x) > swipeThreshold) {
      const dir = x > 0 ? 1 : -1;
      setPosition({ x: 400 * dir, y: 0 });
      setSwiped(true);
    } else {
      setPosition({ x: 0, y: 0 });
      getCardRotation(0);
    }
  };

  return (
    <Draggable
      onStart={onCardStart}
      onDrag={onCardDrag}
      onStop={onCardRelease}
      defaultClassNameDragging={styles['card--dragging']}
      position={position}
    >
      <div className={`${styles.card} ${isSwiped ? styles['card--swiped'] : ''}`}>
        <div
          id="card-rotation"
          className={`${styles['card--transition']} ${styles['card--size']} ${className}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <CardHeader
            text="Go fight for their life, and save the village!"
            rotation={-(rotation * headerRotationMultiplier)}
            active={isDragging && position.x < 0}
          />
          <CardHeader
            text="Run with her and save yourself without thinking villager life"
            rotation={-(rotation * headerRotationMultiplier)}
            active={isDragging && position.x > 0}
          />
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
  headerRotationMultiplier: PropTypes.number,
  swipeThreshold: PropTypes.number,
  children: PropTypes.oneOfType(PropTypes.arrayOf([PropTypes.element]), PropTypes.element)
};

CardCore.defaultProps = {
  className: '',
  maxRotation: 10,
  maxRotationDistance: 150,
  headerRotationMultiplier: 0.5,
  swipeThreshold: 100,
  children: null
};

export default CardCore;
