import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"
import MetaData from '../layout/MetaData';
const Search = () => {
    let navigate = useNavigate();
    const [keyword,setKeyword] = useState("");
    const searchSubmitHandler = (e)=>{
        e.preventDefault();             // no reloading after submitting the form
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate(`/products`);
        }
    }
  return (
    <Fragment>
        <MetaData title = "Search a Product"/>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input
                type = "text"
                placeholder='Search a product.....'
                onChange={(e)=>setKeyword(e.target.value)}
            />
            <input type = "submit" value = "Search"/>
        </form>
    </Fragment>
  )
}

export default Search
