import React, { useContext, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/MyContext';

function CardDoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);

  const { doneRecipes } = useContext(MyContext);

  return (
    <div>
      {
        doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className="card-image"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  width={ 400 }
                />
              </Link>
            </div>

            <div>
              {recipe.type === 'food' && (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </h4>
              )}
              {recipe.type === 'drink' && (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </h4>
              )}

              {
                linkCopied === true && <p>Link copied!</p>
              }

              <button
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

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {recipe.name }
              </h3>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Done in: ${recipe.doneDate}`}
            </p>

            {
              recipe.tags && recipe.tags.map((tag) => (
                <h5
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ `${index}-${tag}` }
                >
                  {tag}
                </h5>))
            }

          </div>
        ))
      }
    </div>

  );
}

export default CardDoneRecipes;
