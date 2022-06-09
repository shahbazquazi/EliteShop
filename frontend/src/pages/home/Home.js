import React, { useEffect } from 'react';
import './Home.css';
import { CgScrollV } from 'react-icons/cg';
import ProductCard from '../../component/products/ProductCard';
import { getProduct, clearErrors } from '../../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../component/layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../../component/layout/title/MetaData';
import Carousel from 'react-material-ui-carousel';


function Home() {
  //Alert
  const alert = useAlert();
  //Dispatch
  const dispatch = useDispatch();
  //Get values form state
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (<Loader />) : (<>
        <MetaData title={"EliteShop"} />
        <div className="banner"> 
          <div className="carousel">
            <div className="carouselText">
          <p>Welcome to EliteShop</p>
          <h2>Get the Exiting Offers now</h2>
          <a href="#productContainer">
            <button>Scroll<CgScrollV /></button>
          </a>
          </div>
          <Carousel autoPlay = {true}>
            <img className='carouselBannar' src="images/bannar1.jpg" alt="Bannar-1" />
            <img className='carouselBannar' src="images/bannar2.jpg" alt="Bannar-1" />
            <img className='carouselBannar' src="images/bannar3.jpg" alt="Bannar-1" />
            <img className='carouselBannar' src="images/bannar4.jpg" alt="Bannar-1" />
            <img className='carouselBannar' src="images/bannar5.jpg" alt="Bannar-1" />
          </Carousel>
          </div>
        </div>
        <h2 className="producttitle">Our Products</h2>
        <div className="productContainer" id='productContainer'>
          {products && products.map(product => (<ProductCard key={product._id} product={product} />))}
        </div>
      </>)};
    </>
  )
};

export default Home;
