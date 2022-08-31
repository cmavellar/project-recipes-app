import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../styles/favoriteRecipes.css';

function FavoriteRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const listRecipes = JSON
      .parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    setRecipes(listRecipes);
    setAllRecipes(listRecipes);
  }, []);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Favorite Recipes');
    setSearch(false);
  }, []);

  const deleteFavorites = (recipeId) => {
    const filterRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipes));
    setRecipes(filterRecipes);
  };

  const renderRecipesFavorites = () => recipes.map((recipe, index) => (
    recipe.type === 'food' ? (
      <div
        className="card-recipe-favorite"
        key={ index }
      >
        <Link to={ `/foods/${recipe.id}` }>
          <img
            className="recipe-image-favorite"
            src={ recipe.image }
            alt={ `Foto da comida ${recipe.name}` }
            data-testid={ `${index}-horizontal-image` }
            width="300px"
            height="300px"
          />
        </Link>

        <div className="info-recipe-favorite">
          <Link to={ `/foods/${recipe.id}` }>
            <p
              className="recipe-name-favorite"
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>
          </Link>

          <p
            className="recipe-category-favorite"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.nationality} - ${recipe.category}`}
          </p>

          <div className="buttons-favorite">
            <button
              className="share-button-favorite"
              type="button"
              onClick={ () => {
                clipboardCopy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                setLinkCopied(true);
              } }
            >
              <img
                className="icon-favorite"
                src={ shareIcon }
                alt="Botão de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              className="heart-button-favorite"
              type="button"
              onClick={ () => deleteFavorites(recipe.id) }
            >
              <img
                className="icon-favorite"
                src={ blackHeart }
                alt="Botão de desfavoritar"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>

          {
            linkCopied === true
              && <span className="link-copied-favorite">Link copied!</span>
          }
        </div>
      </div>

    ) : (

      <div
        className="card-recipe-favorite"
        key={ index }
      >
        <Link to={ `/drinks/${recipe.id}` }>
          <img
            className="recipe-image-favorite"
            src={ recipe.image }
            alt={ `Foto da comida ${recipe.name}` }
            data-testid={ `${index}-horizontal-image` }
            width="300px"
            height="300px"
          />
        </Link>

        <div className="info-recipe-favorite">
          <Link to={ `/drinks/${recipe.id}` }>
            <p
              className="recipe-name-favorite"
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </p>
          </Link>

          <p
            className="recipe-category-favorite"
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.alcoholicOrNot }
          </p>

          <div className="buttons-favorite">
            <button
              className="share-button-favorite"
              type="button"
              onClick={ () => {
                clipboardCopy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                setLinkCopied(true);
              } }
              // CRIAR UM ESTADO PARA VIR A MSG, COMECANDO COMO FALSE, E VINDO COMO TRUE
              // FUNÇÃO DE TRAZER A MSG DE LINK COPIADO - VER NO README
            >
              <img
                className="icon-favorite"
                src={ shareIcon }
                alt="Botão de compartilhar"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              className="heart-button-favorite"
              type="button"
              onClick={ () => deleteFavorites(recipe.id) }
              // FUNÇAO DE ONCLICK PARA DESFAVORITAR
            >
              <img
                className="icon-favorite"
                src={ blackHeart }
                alt="Botão de desfavoritar"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
          {
            linkCopied === true
              && <span className="link-copied-favorite">Link copied!</span>
          }
        </div>
      </div>
    )
  ));

  return (
    <div>
      <Header />
      <div className="button-container-favorite">
        <button
          className="filter-buttons-favorite"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipes(allRecipes) }
        >
          All

        </button>
        <button
          className="filter-buttons-favorite"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setRecipes(
            allRecipes.filter((recipe) => recipe.type === 'food'),
          ) }
        >
          Food

        </button>
        <button
          className="filter-buttons-favorite"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipes(
            allRecipes.filter((recipe) => recipe.type === 'drink'),
          ) }
        >
          Drinks

        </button>
      </div>
      <div className="recipe-container-favorite">
        { renderRecipesFavorites() }
      </div>

    </div>
  );
}

export default FavoriteRecipes;
