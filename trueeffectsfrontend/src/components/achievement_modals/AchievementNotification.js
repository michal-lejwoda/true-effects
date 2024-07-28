import React from 'react';
import '../../new_sass/notification.scss'

const AchievementNotification = ({ message, onClose }) => {

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AchievementNotification;