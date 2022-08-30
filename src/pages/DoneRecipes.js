import React, { useContext, useEffect } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../styles/doneRecipes.css';

function DoneRecipes() {
  const { setTitle, setShowHeader, setSearch, setDoneRecipes } = useContext(MyContext);

  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  const handleFiltersBtn = ({ target }) => {
    const { name } = target;
    setDoneRecipes(doneRecipesList);
    if (name !== 'all') {
      const typeRecipes = doneRecipesList.filter((recipe) => recipe.type === name);
      setDoneRecipes(typeRecipes);
    }
  };

  useEffect(() => {
    setShowHeader(true);
    setTitle('Done Recipes');
    setSearch(false);
    setDoneRecipes(doneRecipesList);
  }, []);

  return (
    <div>
      <Header />
      <div className="button-container">
        <button
          className="filter-buttons"
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ handleFiltersBtn }
        >
          All
        </button>

        <button
          className="filter-buttons"
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ handleFiltersBtn }
        >
          Food
        </button>

        <button
          className="filter-buttons"
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleFiltersBtn }
        >
          Drinks
        </button>
      </div>
      <CardDoneRecipes />
    </div>
  );
}

export default DoneRecipes;
