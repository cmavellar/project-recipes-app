import React, { useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/MyContext';
import '../styles/doneRecipes.css';

function CardDoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);

  const { doneRecipes } = useContext(MyContext);

  return (
    <div className="recipe-container">
      {
        doneRecipes.map((recipe, index) => (
          <div className="card-recipe" key={ index }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className="recipe-image-done"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  width={ 400 }
                />
              </Link>
            </div>

            <div className="info-recipe">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <h3 className="recipe-name" data-testid={ `${index}-horizontal-name` }>
                  {recipe.name }
                </h3>
              </Link>

              <div className="category-share">
                {recipe.type === 'food' && (
                  <h4
                    className="recipe-category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </h4>
                )}
                {recipe.type === 'drink' && (
                  <h4
                    className="recipe-category"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {recipe.alcoholicOrNot}
                  </h4>
                )}

                {
                  linkCopied === true
                    && <span className="link-copied">Link copied!</span>
                }

                <button
                  className="share-button"
                  type="button"
                  onClick={ () => {
                    const url = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
                    clipboardCopy(url);
                    setLinkCopied(true);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
              </div>

              <p
                className="recipe-date"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Done in: ${recipe.doneDate}`}
              </p>

              {
                recipe.tags && recipe.tags.map((tag) => (
                  <h5
                    className="recipe-tag"
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ `${index}-${tag}` }
                  >
                    {tag}
                  </h5>))
              }
            </div>

          </div>
        ))
      }
    </div>

  );
}

export default CardDoneRecipes;
