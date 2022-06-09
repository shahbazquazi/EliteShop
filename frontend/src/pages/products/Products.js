import './Products.css';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productActions';
import Loader from '../../component/layout/loader/Loader';
import ProductCard from '../../component/products/ProductCard';
import {useAlert} from 'react-alert';
import {useParams} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MetaData from '../../component/layout/title/MetaData';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#25852d',
      },
    },
  }
);

const Categories = [
  "Fashion",
  "Laptop",
  "Mobiles",
  "Cameras",
  "Appliances",
  "Beauty Products"
];

// for markings in rating field
const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

function Products() {
  //Get the values from state
  const {products, error, loading, productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.products );
  //Dispatch
  const dispatch = useDispatch();
  //Alert
  const alert = useAlert();
  //Get keyword from url
  const {keyword} = useParams();
  //state for current page
  const [currentPage, setCurrentPage] = useState(1);
  //state for price range
  const [price, setPrice] = useState([0,500000]);
  //state for category
  const [category, setCategory] = useState("");
  //state for rating
  const [ratings, setRatings] = useState(0);
  //Set current page
  const setCurrentPageNum = (e) => {
     setCurrentPage(e);
  }
  //slider onchange function
  const priceHandler = (e, newPrice)=>{
     setPrice(newPrice);
  }
  //useEffect
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch,error,alert,keyword,currentPage,price,category,ratings]);
  

  return <>
  <MetaData title="Products - EliteShop"/>
  {loading ? <Loader/> : (
  <> 
    <div className="allProducts">
    <h2 className='productHeading'>Products</h2>
    <div className="products">
      {products && products.map((product) => {
        return <ProductCard key={product._id} product = {product}/>
      })}
    </div>
    </div>
    <div className="filter_section">
        <ThemeProvider theme={theme}>
          <Typography className='filterHeading' color="primary" 
           variant="h6">Filters</Typography>
      <div className="priceSection">
         <Typography color="primary">Price</Typography>
         <Slider
         value={price}
         onChange={priceHandler}
         valueLabelDisplay="auto"
         aria-labelledby="range-slider"
         min={0}
         max={500000}
         color="primary"
         />
         </div>
         <div className="categorySection">
         <Typography color="primary">Categories</Typography>
         <ul>
           {Categories.map((category)=>{
             return <li 
             className="categoryLinks"
             key={category}
             onClick={() => setCategory(category)}
             >
             {category}
             </li>
           })}
         </ul>
         </div>
         <div className="ratingSection">
            <Typography color="primary">Ratings</Typography>
            <Slider
            value={ratings}
            onChange={(e, newRating)=>{
              setRatings(newRating);
            }}
            aria-labelledby="discrete-slider"
            marks={marks}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            color="primary"
            />
            </div>
         </ThemeProvider>
    </div>

    {resultPerPage < filteredProductsCount && (
      <div className="pagination_section">
      <Pagination
      activePage={currentPage}
      itemsCountPerPage={resultPerPage}
      totalItemsCount={productsCount}
      onChange={setCurrentPageNum} 
      prevPageText = "Prev"
      nextPageText = "Next"
      firstPageText = "First"
      lastPageText = "Last"
      itemClass="page-item"
      linkClass="page-link"
      activeClass = "pageItemActive"
      activeLinkClass = "pageLinkActive"
      />
    </div>
    )}
  </>
  )};
  </>;
}

export default Products;
