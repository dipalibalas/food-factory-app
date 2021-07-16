import React, { useState } from 'react';
import Axios from 'axios';
import {API_ID,API_KEY} from '../key'
import Recipe from './Recipe';
import DefaultError from './DefaultError';

//const API_KEY = "69dda36967d346305fd46ec967e3072e";
//const API_ID = "2da257cb";

const Home = () => {
   // console.log(API_ID," ",API_KEY)
    const[searchRecipe,setSearchRecipe] = useState("");
   const [recipes,setRecipes] = useState([]);
   const url = `https://api.edamam.com/search?q=${searchRecipe}$&app_id=${API_ID}&app_key=${API_KEY}`;

    const getRecipes = async () => {
        const result = await Axios(url);
        console.log(result.data.hits)
        setRecipes(result.data.hits);
    };

    const onSubmitData = (e) => {
        e.preventDefault();
        getRecipes();
    };

    return(
        <div className="main-header">
            <header>Food Factory</header>
            <form className="form-container" onSubmit={onSubmitData}>
                <input type="text" className="search-bar" 
                placeholder="Enter Recipe"
                autoComplete="off"
                val = {searchRecipe}
                onChange = {e => setSearchRecipe(e.target.value)}
                />
                <button id="btn-search">Search</button>
            </form>
            <div className="recipe-container">
                {
                    recipes.map(val => {
                        return <Recipe recipeList={val} key={val.id}/>;
                    })
                }
            </div>
        </div>
    )
}

export default Home;