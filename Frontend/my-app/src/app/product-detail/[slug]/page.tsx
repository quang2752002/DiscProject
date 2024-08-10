"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import Header from "@/app/component/header/page";
import Footer from "@/app/component/footer/page";
import { Props } from "@/model/Props";
import { ToastContainer, toast } from "react-toastify";
import { Product } from "@/model/Product";
import Head from "next/head";

import "@/assets/fonts/icomoon/style.css";
import "@/assets/css/bootstrap.min.css";
import "@/assets/css/magnific.css";
import "@/assets/css/owl.theme.default.min.css";
import "@/assets/css/aos.css";
import "@/assets/css/style.css";

const ProductDetail: React.FC<Props> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1); // Add state for quantity

  const id = params.slug;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get(`/get/${id}`);
        const productData = response.data.$values[0];
        setProduct(productData);
        
        if (productData.attachments && productData.attachments.$values) {
          setAttachments(productData.attachments.$values);
        }
      } catch (err) {
        setError("Failed to fetch product details.");
        toast.error("Failed to fetch product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? attachments.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === attachments.length - 1 ? 0 : prevIndex + 1));
  };

  // Handlers for the quantity buttons
  const handleMinusClick = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handlePlusClick = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
       <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
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
                        <button className="btn btn-outline-primary prev-button" onClick={handlePrevClick}>
                          <i className="fa-solid fa-angle-left"></i>
                        </button>
                        <button className="btn btn-outline-primary next-button" onClick={handleNextClick}>
                          <i className="fa-solid fa-angle-right"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img src="https://via.placeholder.com/500" alt="Placeholder" className="img-fluid" />
                  )}
                </div>
                <div className="col-md-6">
                  <h2 className="text-black">{product.name}</h2>
                  <p>{product.description}</p>
                  <p><strong className="text-primary h4">${product.price}</strong></p>
                  <div className="mb-1 d-flex">
                    <p>Category: {product.categoryId}</p>
                  </div>
                  <div className="mb-5">
                    <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-primary js-btn-minus"
                          type="button"
                          onClick={handleMinusClick}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control text-center"
                        min="1"
                        value={quantity}
                        
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary js-btn-plus"
                          type="button"
                          onClick={handlePlusClick}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p><a href="cart.html" className="buy-now btn btn-sm btn-primary">Add To Cart</a></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
