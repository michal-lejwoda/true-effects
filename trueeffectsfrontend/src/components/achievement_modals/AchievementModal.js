import React from 'react';
import ReactDOM from 'react-dom';
import '../../new_sass/achievement_modal.scss'

const AchievementModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
      <div className="achievement_modal">
        {children}
    </div>,
    document.body
  );
};

export default AchievementModal;
