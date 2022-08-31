import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drink3.png';
import mealIcon from '../images/meal2.png';
import '../styles/footer.css';

function Footer() {
  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          className="image-footer"
          src={ drinkIcon }
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/foods">
        <img
          className="image-footer"
          src={ mealIcon }
          alt="meal"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
