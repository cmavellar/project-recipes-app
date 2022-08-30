import React from 'react';
/* import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg'; */
import emptyheart from '../images/emptyheart.png';
import fullheart from '../images/fullheart.jpg';
import '../styles/details.css';

const isFavoritedButton = (favorite) => {
  if (favorite === false) {
    return (<img
      className="empty-heart"
      src={ emptyheart }
      alt="white heart"
      data-testid="favorite-btn"
    />);
  } if (favorite === true) {
    return (<img
      className="empty-heart"
      src={ fullheart }
      alt="black heart"
      data-testid="favorite-btn"
    />);
  }
};

export default isFavoritedButton;
