import React, { Fragment, useEffect } from 'react'
import { CgScrollV } from "react-icons/cg";
import ProductCard from "./ProductCard.js"
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import {useSelector,useDispatch} from "react-redux";
import "./Home.css"
import Loader from '../layout/loader/Loader.js';
import { useAlert } from 'react-alert';

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading,error,products} = useSelector((state)=>state.products);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch,error,alert])

  return <Fragment>
    {loading ? (
        <Loader/>
    ):(<Fragment>
        <MetaData title = "ECOMMERCE"/>             
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find Great Products with great deals!</h1>
            <a href = '#container'>
                <button>
                    Scroll <CgScrollV/>
                </button>
            </a>
        </div>
        <h2 className = "homeHeading">Featured Products</h2>
        <div className = "container" id = "container">
            {products && products.map((product)=> <ProductCard product={product}/>)}
        </div>
      </Fragment>)
    }
  </Fragment>
}

export default Home
