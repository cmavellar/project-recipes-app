import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { requestDrinkById, requestFoodById } from '../helpers/requestAPI';
import addFavoriteRecipe from '../helpers/saveFavorites';
import saveRecipe from '../helpers/saveDoneRecipe';
import shareIcon from '../images/shareIcon.svg';
import isFavoritedButton from '../helpers/isFavoriteButton';
import { verifyingFavoriteRecipes } from '../helpers/verifyLocalStorage';
import '../styles/details.css';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const pathWithBars = pathname.split('/');
  const path = pathWithBars[1];
  const id = pathname.replace(/\D/g, ''); // Substitui o que não é número por uma string vazia;
  const [requestedFood, setRequestedFood] = useState([]);
  const [ingredientsFiltreds, setIngredients] = useState([]);
  const [measureFiltreds, setMeasures] = useState([]);
  const [checkedCheckboxes, setCheckedBoxs] = useState([]);
  const [habilitaFinish, setFinish] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const habilitaButton = () => {
    const array = localStorage.getItem('CheckboxIds');
    const arrayJsonLength = JSON.parse(array);
    if (arrayJsonLength.length === ingredientsFiltreds.length - 1) {
      setFinish(false);
    } else {
      setFinish(true);
    }
  };
  useEffect(() => {
    const fetchAPI = async () => {
      if (path === 'foods') {
        const dataFood = await requestFoodById(id);
        setRequestedFood([dataFood]);
      } if (path === 'drinks') {
        const dataDrink = await requestDrinkById(id);
        setRequestedFood([dataDrink]);
      }
    };
    fetchAPI();
    setIsFavorited(verifyingFavoriteRecipes(id));
    const array = localStorage.getItem('CheckboxIds');
    const arrayParsed = JSON.parse(array);
    if (arrayParsed !== null && (arrayParsed.length > ingredientsFiltreds.length)) {
      localStorage.setItem('CheckboxIds', JSON.stringify([]));
    } if (array === null) {
      setCheckedBoxs([]);
    } else if (array !== null) {
      setCheckedBoxs(arrayParsed);
    }
  }, []);
  const getIngredients = async () => {
    if (requestedFood[0] !== undefined) {
      const entradas = Object.entries(requestedFood[0]);
      const ingredients = entradas.filter(
        (e) => e[0].includes('strIngredient') && (e[1] !== null && e[1].length > 1),
      );
      const measureIngredie = entradas.filter(
        (e) => e[0].includes('strMeasure') && (e[1] !== null && e[1].length > 0),
      );
      const filterIng = ingredients.map((e) => e[1]);
      const filterMeasure = measureIngredie.map((e) => e[1]);
      setIngredients(filterIng);
      setMeasures(filterMeasure);
    }
  };
  const saveOnClipBoard = () => {
    clipboardCopy(`http://localhost:3000/${path}/${id}`);
    setLinkCopied(true);
  };
  const finalizaRecipe = () => {
    saveRecipe(requestedFood[0], id, path);
    history.push('/done-recipes');
  };
  useEffect(() => { getIngredients(); }, [requestedFood]);
  const checkboxClick = ({ target }) => {
    const itens = document.getElementsByName(target.id);
    if (target.checked === true) {
      itens[0].className = 'cutted';
      if (checkedCheckboxes.includes(target.id)) {
        const removeBox = checkedCheckboxes.filter((e) => e !== target.id);
        setCheckedBoxs(removeBox);
      } else {
        setCheckedBoxs([...checkedCheckboxes, target.id]);
      }
    } else if (target.checked === false) {
      itens[0].className = '';
      const removeBox = checkedCheckboxes.filter((e) => e !== target.id);
      setCheckedBoxs(removeBox);
    }
  };
  const createPage = () => {
    if (requestedFood[0] !== undefined) {
      if (path === 'foods') {
        return (
          <div className="details-container">
            <img
              className="details-image"
              data-testid="recipe-photo"
              src={ requestedFood[0].strMealThumb }
              alt="foto da comida"
              width="300px"
            />
            <h1
              className="details-title"
              data-testid="recipe-title"
            >
              { requestedFood[0].strMeal }

            </h1>
            <h4
              className="details-category"
              data-testid="recipe-category"
            >
              {requestedFood[0].strCategory}
            </h4>
            <ul>
              { ingredientsFiltreds.map(
                (e, index) => (
                  <li
                    className="recipe-steps"
                    key={ e }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      className="input-step"
                      data-testid={ `${index}-checkbox` }
                      type="checkbox"
                      onChange={ () => habilitaButton() }
                      id={ index }
                      onClick={ (event) => checkboxClick(event) }
                    />
                    <p name={ index } className="">
                      { `${measureFiltreds[index]}, ${e}`}
                    </p>
                  </li>),
              ) }
            </ul>
            <p data-testid="instructions">{ requestedFood[0].strInstructions }</p>
            { linkCopied === true && <p>Link copied!</p> }
            <button
              className="details-button"
              type="button"
              onClick={ () => saveOnClipBoard() }
            >
              <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
            </button>
            <button
              className="details-button"
              type="button"
              onClick={ () => {
                addFavoriteRecipe(requestedFood[0], id, path);
                setIsFavorited(!isFavorited);
              } }
            >
              { isFavoritedButton(isFavorited) }
            </button>
            <button
              className="fixed-bottom"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ habilitaFinish }
              onClick={ finalizaRecipe }
            >
              Finish Recipe
            </button>
          </div>
        );
      } if (path === 'drinks') {
        const verificaAlchool = () => {
          if (requestedFood[0].strAlcoholic === 'Alcoholic') {
            return `${requestedFood[0].strCategory}/Alcoholic`;
          }
          return path;
        };
        return (
          <div>
            <h2 data-testid="recipe-title">{ requestedFood[0].strDrink }</h2>
            <img
              data-testid="recipe-photo"
              src={ requestedFood[0].strDrinkThumb }
              alt="foto da bebida"
              width="300px"
            />
            <p data-testid="recipe-category">{`categoria: ${verificaAlchool()}`}</p>
            <ul>
              { ingredientsFiltreds.map(
                (e, index) => (
                  <li key={ index } data-testid={ `${index}-ingredient-step` }>
                    <input
                      data-testid={ `${index}-checkbox` }
                      type="checkbox"
                      onChange={ () => habilitaButton() }
                      id={ index }
                      onClick={ (event) => checkboxClick(event) }
                    />
                    <p name={ index }>
                      {`${measureFiltreds[index]}, ${e}`}
                    </p>
                  </li>
                ),
              ) }
            </ul>
            <p data-testid="instructions">{requestedFood[0].strInstructions}</p>
            { linkCopied === true && <p>Link copied!</p> }
            <div className="buttons-container">
              <button
                className="details-button"
                type="button"
                onClick={ () => saveOnClipBoard() }
              >
                <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
              </button>
              <button
                type="button"
                onClick={ () => {
                  addFavoriteRecipe(requestedFood[0], id, path);
                  setIsFavorited(!isFavorited);
                } }
              >
                { isFavoritedButton(isFavorited) }
              </button>
            </div>
            <button
              className="finish-button"
              data-testid="finish-recipe-btn"
              type="button"
              disabled={ habilitaFinish }
              onClick={ () => finalizaRecipe() }
            >
              Finish Recipe
            </button>
          </div>
        );
      }
    }
  };
  useEffect(() => {
    localStorage.setItem('CheckboxIds', JSON.stringify(checkedCheckboxes));
  }, [checkedCheckboxes]);
  useEffect(() => {
    const checks = localStorage.getItem('CheckboxIds');
    const arrayJson = JSON.parse(checks);
    const newArray = arrayJson.length > ingredientsFiltreds.length ? [] : arrayJson;
    localStorage.setItem('CheckboxIds', JSON.stringify([]));
    if (arrayJson[0] !== undefined || arrayJson[0] !== null) {
      newArray.forEach((e) => {
        const item = document.getElementById(e);
        item.setAttribute('checked', true);
        item.value = 'checked';
        const itens = document.getElementsByName(e);
        itens[0].className = 'cutted';
      });
    }
  }, [ingredientsFiltreds]);
  return (
    <div>
      { createPage() }
    </div>
  );
}
export default RecipeInProgress;
