"use client"; // This directive marks the file as a client component

import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Header from "./component/header/page";
import Banner from "./component/banner/page";
import Footer from "./component/footer/page";

// Importing CSS files
import "../assets/fonts/icomoon/style.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/magnific.css";
import "../assets/css/owl.theme.default.min.css";
import "../assets/css/aos.css";
import "../assets/css/style.css";
import { Product } from "@/model/Product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9); 
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const response = await axiosClient.get(`/`, {
          params: {
            index: page,
            size: itemsPerPage,
            name: searchQuery,
            idType: selectedType,
            idCategory: selectedCategory,
          },
        });

       

        
        const fetchedProducts = Array.isArray(response.data.products.$values)
          ? response.data.products.$values
          : [];

        console.log("Fetched Products:", fetchedProducts);

        setProducts(fetchedProducts);
        setTotal(response.data.total || 0);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("There was an error fetching the products!");
      }
    };

    fetchProducts(currentPage);
  }, [currentPage, itemsPerPage, searchQuery, selectedType, selectedCategory]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(Number(event.target.value));
    setCurrentPage(1); 
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
    setCurrentPage(1); 
  };

  return (
    <>
      <Header />
      <Banner />

      <div className="site-section block-3 site-blocks-2 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>Products</h2>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <form action="" className="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-control"
                aria-label="Default select example"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value={0}>Select Type</option>
                <option value={1}>Type 1</option>
                <option value={2}>Type 2</option>
                <option value={3}>Type 3</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-control"
                aria-label="Default select example"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value={0}>Select Category</option>
                <option value={1}>Category 1</option>
                <option value={2}>Category 2</option>
                <option value={3}>Category 3</option>
              </select>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="row">
            {Array.isArray(products) && products.length > 0 ? (
              products.map(product => (
                <div key={product.id} className="item col-md-4 mt-4">
                  <div className="block-4 text-center">
                    <figure className="block-4-image">
                      <img
                        src={ 'https://icdn.dantri.com.vn/thumb_w/960/2019/03/04/dia-than-1551664709441.jpg'} // Đảm bảo product.imageUrl tồn tại
                        alt={product.name}
                        className="img-fluid"
                      />
                    </figure>
                    <div className="block-4-text p-4">
                      <h3>
                      <a href={`/product-detail/${product.id}`}>{product.name}</a>
                      </h3>
                      <p className="mb-0">{product.author}</p>
                      <p className="text-primary font-weight-bold">${product.price}</p>
                      <a href="#" className="btn btn-primary"><i className="fa-solid fa-cart-shopping"></i>Add To Cart</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>





      <Footer />
    </>
  );
}
