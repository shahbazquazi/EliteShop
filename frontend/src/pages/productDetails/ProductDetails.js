import "./ProductDetails.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  addReview,
  clearErrors,
  getProductDetails,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReviewCard from "../../component/products/ReviewCard";
import Loader from "../../component/layout/loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../component/layout/title/MetaData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { addToCart } from "../../actions/cartActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Rating } from "@mui/material";
import { ADD_REVIEW_RESET } from "../../constants/productConstant";

function ProductDetails() {
  //Alert
  const alert = useAlert();
  //Dispatch
  const dispatch = useDispatch();
  //To navigate
  const navigate = useNavigate();
  //Get the id from params
  const { id } = useParams();
  //Get the values from state
  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  //Get the values from user state
  const { user } = useSelector((state) => state.user);
  //Get the values from addReview state
  const { success, error: reviewError } = useSelector(
    (state) => state.addReview
  );
  //State for cart quantity
  const [quantity, setQuantity] = useState(1);
  //state for dialog box
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //submitReviewToggle function
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  //Onsubmit review
  const submitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(addReview(myForm));
    setOpen(false);
  };

  //Add to cart
  const addToCartHandle = () => {
    if (user) {
      dispatch(addToCart(id, quantity, user));
      alert.success("Item added to cart successfully");
    }
    if (!user) {
      navigate("/login");
    }
  };

  //increase the quantity in cart
  const increaseHandle = () => {
    if (quantity >= product.stock) return;
    const addQuantity = quantity + 1;
    setQuantity(addQuantity);
  };
  //decrease the quantity in cart
  const decreaseHandle = () => {
    if (quantity <= 1) return;
    const minusQuantity = quantity - 1;
    setQuantity(minusQuantity);
  };

  //useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: ADD_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  //Options for react star component
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <MetaData title={`${product.name} - EliteShop`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetails">
            <div className="carousel">
              <Carousel>
                {product.images &&
                  product.images.map((image, index) => {
                    return (
                      <img
                        className="carouselImage"
                        src={image.url}
                        key={image.url}
                        alt={`${index} Slide`}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div className="details">
              <div className="details_section_1">
                <h1>{product.name}</h1>
                <p>{product._id}</p>
              </div>
              <div className="details_section_2">
                <Rating {...options} />
                <span className="reviewTitle">
                  {`${product.numberOfReviews} reviews`}
                </span>
              </div>
              <div className="details_section_3">
                <h2>&#8377; {product.price}</h2>
                <div className="details_section_3_1">
                  <div className="details_section_3_1_1">
                    <button onClick={decreaseHandle}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseHandle}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandle}
                  >
                    Add to cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out of stock" : " Instock"}
                  </b>
                </p>
              </div>
              <div className="details_section_4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submit_review" onClick={submitReviewToggle}>
                Submit review
              </button>
            </div>
          </div>
          <div className="review_section">
            <h2 className="reviewHeading">Reviews</h2>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="textAreaDialog"
                  cols={30}
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle}>Cancel</Button>
                <Button onClick={submitHandler}>Submit</Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  onSwiper={(swiper) => console.log(swiper)}
                  navigation={true}
                  modules={[Navigation]}
                >
                  {product.reviews &&
                    product.reviews.map((review) => {
                      return (
                        <SwiperSlide>
                          <ReviewCard key={review._id} review={review} />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            ) : (
              <p className="noReview">This product has no review</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
