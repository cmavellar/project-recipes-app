import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import MyContext from '../context/MyContext';
import shareIcon from '../images/shareIcon.svg';
import {
  requestAllDrinks, requestAllFoods, requestDrinkById, requestFoodById,
} from '../helpers/requestAPI';
import {
  verifyingDoneRecipes, verifyingFavoriteRecipes, verifyingInProgressRecipes,
} from '../helpers/verifyLocalStorage';
import addFavoriteRecipe from '../helpers/saveFavorites';
import isFavoritedButton from '../helpers/isFavoriteButton';
import '../styles/details.css';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.replace(/[0-9]/g, ''); // Substitui o que é número por uma string vazia;
  const path = pathWithBars.replace(/[/]/g, ''); // Substitui as barras por string vazia;
  const id = pathname.replace(/\D/g, ''); // Substitui o que não é número por uma string vazia;
  const maxRecipes = 6;

  const {
    recipeData, setRecipeData, recomendationRecipes,
    setRecomendationRecipes, urlVideo, setUrlVideo,
  } = useContext(MyContext);

  const [linkCopied, setLinkCopied] = useState(false);
  const [renderButton, setRenderButton] = useState(true);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      if (path === 'foods') {
        const dataFood = await requestFoodById(id);
        const dataDrinks = await requestAllDrinks();
        setRecipeData(dataFood);
        setUrlVideo(dataFood.strYoutube.replace('watch?v=', 'embed/ '));
        setRecomendationRecipes(dataDrinks.slice(0, maxRecipes));
      }

      if (path === 'drinks') {
        const dataDrink = await requestDrinkById(id);
        const dataFoods = await requestAllFoods();
        setRecipeData(dataDrink);
        setRecomendationRecipes(dataFoods.slice(0, maxRecipes));
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const verifyLocalStorage = () => {
      setRenderButton(verifyingDoneRecipes(id));
      setInProgressRecipe(verifyingInProgressRecipes(id, path));
      setIsFavorited(verifyingFavoriteRecipes(id));
    };
    verifyLocalStorage();
  }, [recipeData]);

  const recomendationCards = () => {
    if (path === 'foods') {
      return (
        recomendationRecipes.map((recomendation, index) => (
          <div
            className="recomendation-container"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="recomendation-image"
              src={ recomendation.strDrinkThumb }
              alt={ recomendation.strDrink }
              width={ 180 }
            />
            <h4
              className="recomendation title"
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strDrink}
            </h4>
            <p className="recomendation-extra">{recomendation.strAlcoholic}</p>
          </div>
        ))
      );
    }
    if (path === 'drinks') {
      return (
        recomendationRecipes.map((recomendation, index) => (
          <div
            className="recomendation-container"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="recomendation-image"
              src={ recomendation.strMealThumb }
              alt={ recomendation.strMeal }
              width={ 180 }
            />
            <h4
              className="recomendation title"
              data-testid={ `${index}-recomendation-title` }
            >
              {recomendation.strMeal}
            </h4>
            <p className="recomendation-extra">{recomendation.strCategory}</p>
          </div>
        ))
      );
    }
  };

  const recipeDetailsContent = () => {
    const thumb = recipeData
      .strMealThumb ? recipeData.strMealThumb : recipeData.strDrinkThumb;
    const name = recipeData.strMeal ? recipeData.strMeal : recipeData.strDrink;
    const info = recipeData
      .strAlcoholic ? recipeData.strAlcoholic : recipeData.strCategory;

    const entriesAPI = Object.entries(recipeData);

    const ingredientsWithNull = entriesAPI
      .filter((entry) => entry[0].includes('strIngredient'));
    const ingredients = ingredientsWithNull.filter((entry) => entry[1]);

    const measuresWithNull = entriesAPI
      .filter((entry) => entry[0].includes('strMeasure'));
    const measure = measuresWithNull.filter((entry) => entry[1]);

    const instructions = recipeData.strInstructions;

    return (
      <>
        <img
          className="details-image"
          src={ thumb }
          data-testid="recipe-photo"
          alt={ name }
          width={ 400 }
        />
        <div className="details-info">
          <h1 className="details-title" data-testid="recipe-title">{name}</h1>
          <h4 className="details-category" data-testid="recipe-category">{info}</h4>
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  className="details-list-element"
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient[1]}
                  {measure[index] && measure[index][1]}
                </li>
              ))
            }
          </ul>
          <p data-testid="instructions">{instructions}</p>
        </div>
        {
          linkCopied === true && <p>Link copied!</p>
        }
        <div className="buttons-container">
          <button
            className="details-button"
            type="button"
            onClick={ () => {
              clipboardCopy(`http://localhost:3000${pathname}`);
              setLinkCopied(true);
            } }
          >
            <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
          </button>
          <button
            className="details-button"
            type="button"
            onClick={ () => {
              setIsFavorited(!isFavorited);
              addFavoriteRecipe(recipeData, id, path);
            } }
          >
            {
              isFavoritedButton(isFavorited)
            }
          </button>
        </div>
        {
          path === 'foods' && (
            <iframe
              className="video"
              title={ urlVideo }
              width="420"
              height="315"
              src={ urlVideo }
              data-testid="video"
            />
          )
        }
        <div className="recomendations-container">
          <div className="teste">
            {
              recomendationCards()
            }
          </div>
        </div>
        {
          renderButton === true && (
            <button
              type="button"
              className="fixed-bottom"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/${path}/${id}/in-progress`) }
            >
              {
                inProgressRecipe === true ? 'Continue Recipe' : 'Start Recipe'
              }
            </button>
          )
        }
      </>
    );
  };

  return (
    <div className="details-container">
      {
        recipeDetailsContent()
      }
    </div>
  );
}

export default RecipeDetails;
