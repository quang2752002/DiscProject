"use client"; 
import React, { useEffect, useState } from "react";
import { ProductService } from "@/services/ProductService"; // Adjust path as needed
import { CartService } from "@/services/CartService";
import { TypeService } from "@/services/TypeService";
import { Product } from "@/model/Product";
import { Type } from "@/model/Type";
import Header from '../component/header/page';
import Footer from "../component/footer/page";
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import { Category } from "@/model/Category";
import { CategoryService } from "@/services/CategoryService";


const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [types, setTypes] = useState<Type[]>([]); 
  const [categories, setCategories] = useState<Category[]>([]); 
  const router = useRouter();
  const cartService = new CartService();

  useEffect(() => {
    const fetchTypes = async () => {
      const typeService = new TypeService();
      try {
        const fetchedTypes = await typeService.getList();
        setTypes(fetchedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
        setError("There was an error fetching the types!");
      }
    };

    fetchTypes();
  }, []);

  // Fetch categories when the selectedType changes
  useEffect(() => {
    if (selectedType !== 0) {
      const fetchCategories = async () => {
        const categoryService = new CategoryService();
        try {
          console.log(selectedType);
          const fetchedCategories = await categoryService.getCategoryByType(selectedType);
          
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setError("There was an error fetching the categories!");
        }
      };

      fetchCategories();
    } else {
      setCategories([]); // Clear categories if no type is selected
    }
  }, [selectedType]);

  // Fetch products when the component mounts or when dependencies change
  useEffect(() => {
    const fetchProducts = async () => {
      const productService = new ProductService();
      try {
        const data = await productService.get(
          searchQuery,
          selectedType,
          selectedCategory,
          currentPage,
          itemsPerPage
        );

        const fetchedProducts = Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(fetchedProducts);
        setTotal(data.total || 0);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("There was an error fetching the products!");
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchQuery, selectedType, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      if (currentPage > 1) {
        pages.push(currentPage - 1);
      }

      pages.push(currentPage);

      if (currentPage < totalPages) {
        pages.push(currentPage + 1);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    const uniquePages = Array.from(new Set(pages));

    return uniquePages;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = cartService.AddCart(token, productId, 1);
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

  return (
    <>
      <Header />
     
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
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
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
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="row">

            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
               <div key={product.id} className="item col-md-3 mb-4 ">
                <div   className="border">
                  <div
                    className="block-4 text-center"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <a
                      className="block-4-image"
                      href={`/product-detail/${product.id}`}
                    >
                      <img
                        src={product.path}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: "400px", height: "250px" }}
                      />
                    </a>
                    <a
                      className="block-4-text "
                      href={`/product-detail/${product.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <br />
                      <h6>{product.name}</h6>
                      <p className="mb-0">{product.author}</p>
                      <p className="font-weight-bold">${product.price}</p>
                    </a>
                    <button
                      style={{ color: "white", fontSize: "10px" }}
                      className="btn btn-info mb-3"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <i className="bi bi-cart"></i> Add To Cart
                    </button>
                  </div>



                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          <div className="pagination mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {renderPagination().map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  {page === "..." ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
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
      <ToastContainer />
    </>
  );
};

export default ProductList;
