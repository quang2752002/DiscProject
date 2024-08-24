"use client";

import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import Header from "@/app/component/header/page";
import Footer from "@/app/component/footer/page";
import { Props } from "@/model/Props";
import { Product } from "@/model/Product";
import { OrderItem } from "@/model/OrderItem";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductService } from "@/services/ProductService";
import { pages } from "next/dist/build/templates/app-page";
import { CartService } from "@/services/CartService";

const ProductDetail: React.FC<Props> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [reviews, setReviews] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [quantity, setQuantity] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const router = useRouter();
  const productService = new ProductService();
  const cartService=new CartService();

  const id = params.slug;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await productService.getProductItem(id);

        // Check if productData is an array and get the first element if it exists
        const fetchedProduct = Array.isArray(productData) && productData.length > 0
          ? productData[0] 
          : null;

        setProduct(fetchedProduct);

        // If the product has attachments, set them
        if (fetchedProduct && fetchedProduct.attachments) {
          setAttachments(fetchedProduct.attachments);
        }
      } catch (err) {
        setError("Failed to fetch product details.");
        toast.error("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      setLoading(true);
      try {
       

        const response=await productService.getReview(id,currentPage,itemsPerPage)
        console.log(response.review);
        
        const reviewsData = response.review || [];
        setReviews(reviewsData);
        setTotal(response.total || 0);
      } catch (err) {
        setError("Failed to fetch product reviews.");
        toast.error("Failed to fetch product reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? attachments.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === attachments.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-muted"></i>);
      }
    }
    return stars;
  };

  const handleAddToCart = async (productId: number, quantity: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // const response = await fetch("https://localhost:7090/api/Cart/AddCart", {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     productId: productId,
      //     quantity: quantity,
      //   }),
      // });

      const response=cartService.AddCart(token,productId,quantity);

      if (response) {
        toast.success("Item added to cart successfully!");
      } else {
        console.error("Error adding to cart:", await response.text());
        toast.error("There was an error adding the item to the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("There was an error adding the item to the cart.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
        />
      </Head>
      <Header />
      <main>
        {product ? (
          <div className="site-section">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  {attachments.length > 0 ? (
                    <div className="image-slider">
                      <img
                        src={attachments[currentIndex]}
                        alt="Product Image"
                        className="img-fluid"
                        style={{ width: "500px", height: "400px" }}
                      />
                      <div className="text-center">
                        <button
                          className="btn btn-outline-primary prev-button"
                          onClick={handlePrevClick}
                        >
                          Previous
                        </button>
                        <button 
                          className="btn btn-outline-primary next-button ml-2"
                          onClick={handleNextClick}
                        >
                           Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src="https://via.placeholder.com/500"
                      alt="Placeholder"
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="col-md-6">
                  <h2 className="text-black">{product.name}</h2>
                  <p>{product.description}</p>
                  <p>
                    <strong className="text-primary h4">${product.price}</strong>
                  </p>
                  <div className="mb-1 d-flex">
                    <p>Category: {product.categoryName}</p>
                  </div>
                  <div className="mb-1 d-flex">
                    <p>Author: {product.author}</p>
                  </div>
                  <div className="mb-5">
                    <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={() => handleQuantityChange(-1)}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control text-center"
                        min="1"
                        value={quantity}
                        readOnly
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={() => handleQuantityChange(1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p>
                    <button className="buy-now btn btn-sm btn-primary" onClick={() => handleAddToCart(product.id, quantity)} >
                      Add To Cart
                    </button>
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <h3 className="text-black">Reviews</h3>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="card mb-3">
                        <div className="card-header">
                          Review by {review.firstname} {review.lastname}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {renderStars(review.voteStar)}
                          </h5>
                          <p className="card-text">{review.feedBack}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="card mb-3">
                      <div className="card-body">
                        <p className="card-text">No reviews yet.</p>
                      </div>
                    </div>
                  )}
                  <div className="pagination-controls">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-secondary"
                    >
                  <i className="bi bi-skip-start-fill"></i>
                  </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary"
                    >
                     <i className="bi bi-skip-end-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </main>
      <br />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
