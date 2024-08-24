"use client"; // This directive marks the file as a client component
import { useEffect, useState } from "react";
import Header from "./component/header/page";
import Banner from "./component/banner/page";
import Footer from "./component/footer/page";
import { useRouter } from "next/navigation";
import { Product } from "@/model/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartService } from "@/services/CartService";
import { ProductService } from "@/services/ProductService";

export default function Home() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [totalNew, setTotalNew] = useState<number>(0);
  const [totalBestSelling, setTotalBestSelling] = useState<number>(0);
  const [currentPageNew, setCurrentPageNew] = useState<number>(1);
  const [currentPageBestSelling, setCurrentPageBestSelling] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const cartService = new CartService();

  useEffect(() => {
    const fetchNewProducts = async () => {
      const productService = new ProductService();
      try {
        const data = await productService.getProductNew(currentPageNew, itemsPerPage);
        const fetchedProducts = Array.isArray(data.products) ? data.products : [];
        setNewProducts(fetchedProducts);
        setTotalNew(data.total || 0);
        setError(null);
      } catch (error) {
        console.error("Error fetching new products:", error);
        setError("There was an error fetching the new products!");
      }
    };

    fetchNewProducts();
  }, [currentPageNew]);

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      const productService = new ProductService();
      try {
        const data = await productService.getProductBestSelling(currentPageBestSelling, itemsPerPage);
        const fetchedProducts = Array.isArray(data.products) ? data.products : [];
        setBestSellingProducts(fetchedProducts);
        setTotalBestSelling(data.total || 0);
        setError(null);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
        setError("There was an error fetching the best-selling products!");
      }
    };

    fetchBestSellingProducts();
  }, [currentPageBestSelling]);

  const handlePageChangeNew = (page: number) => {
    setCurrentPageNew(page);
  };

  const handlePageChangeBestSelling = (page: number) => {
    setCurrentPageBestSelling(page);
  };

  const totalPagesNew = Math.ceil(totalNew / itemsPerPage);
  const totalPagesBestSelling = Math.ceil(totalBestSelling / itemsPerPage);

  const renderPagination = (currentPage: number, totalPages: number, handlePageChange: (page: number) => void) => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      if (currentPage > 2) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages - 1) pages.push(currentPage + 1);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return Array.from(new Set(pages));
  };

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await cartService.AddCart(token, productId, 1);
      if (response.ok) {
        toast.success("Item added to cart successfully!");
      } else {
        const errorText = await response.text();
        console.error("Error adding to cart:", errorText);
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
      <Banner />
      <br /><br /><br /><br /><br />

      <div className="site-section block-3 site-blocks-2 bg-light">
        <div className="container">
          {/* New Products Section */}
          <div className="row justify-content-center">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>Sản phẩm mới nhất</h2>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="row">
            <div className="item col-md-1 mt-4">
              <button
                style={{ paddingTop: "200px" }}
                className="page-link"
                onClick={() => handlePageChangeNew(currentPageNew - 1)}
                disabled={currentPageNew === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </div>

            {Array.isArray(newProducts) && newProducts.length > 0 ? (
              newProducts.map((product) => (
                <div key={product.id} className="item col-md-3 mt-4 border mr-5 text-center">
                  <div className="block-4 text-center" style={{ textDecoration: "none", color: "black" }}>
                    <a className="block-4-image" href={`/product-detail/${product.id}`}>
                      <img
                        src={product.path}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: "400px", height: "250px" }}
                      />
                    </a>
                    <br />
                    <a className="block-4-text" href={`/product-detail/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                      <h6>{product.name}</h6>
                      <p className="mb-0">Tác giả : {product.author}</p>
                      <p className="font-weight-bold">Giá : {product.price}$</p>
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
              ))
            ) : (
              <p>No products available.</p>
            )}

            <div className="item col-md-1 mt-4">
              <button
                className="page-link"
                style={{ paddingTop: "200px" }}
                onClick={() => handlePageChangeNew(currentPageNew + 1)}
                disabled={currentPageNew === totalPagesNew}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div hidden className="pagination mt-4">
            <ul className="pagination justify-content-center">
              {renderPagination(currentPageNew, totalPagesNew, handlePageChangeNew).map((page, index) => (
                <li key={index} className={`page-item ${page === currentPageNew ? "active" : ""}`}>
                  {page === "..." ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button
                      className="page-link"
                      onClick={() => handlePageChangeNew(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
<br /><br /><br />
          {/* Best Selling Products Section */}
          <div className="row justify-content-center">
            <div className="col-md-7 site-section-heading text-center pt-4">
              <h2>Sản phẩm bán chạy</h2>
            </div>
          </div>

          <div className="row">
            <div className="item col-md-1 mt-4">
              <button
                style={{ paddingTop: "200px" }}
                className="page-link"
                onClick={() => handlePageChangeBestSelling(currentPageBestSelling - 1)}
                disabled={currentPageBestSelling === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </div>

            {Array.isArray(bestSellingProducts) && bestSellingProducts.length > 0 ? (
              bestSellingProducts.map((product) => (
                <div key={product.id} className="item col-md-3 mt-4 border mr-5 text-center">
                  <div className="block-4 text-center" style={{ textDecoration: "none", color: "black" }}>
                    <a className="block-4-image" href={`/product-detail/${product.id}`}>
                      <img
                        src={product.path}
                        alt={product.name}
                        className="img-fluid"
                        style={{ width: "400px", height: "250px" }}
                      />
                    </a>
                    <br />
                    <a className="block-4-text" href={`/product-detail/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                      <h6>{product.name}</h6>
                      <p className="mb-0">Tác giả :{product.author}</p>
                      <p className="font-weight-bold">Giá :  {product.price}$</p>
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
              ))
            ) : (
              <p>No products available.</p>
            )}

            <div className="item col-md-1 mt-4">
              <button
                className="page-link"
                style={{ paddingTop: "200px" }}
                onClick={() => handlePageChangeBestSelling(currentPageBestSelling + 1)}
                disabled={currentPageBestSelling === totalPagesBestSelling}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

          <div hidden className="pagination mt-4">
            <ul className="pagination justify-content-center">
              {renderPagination(currentPageBestSelling, totalPagesBestSelling, handlePageChangeBestSelling).map((page, index) => (
                <li key={index} className={`page-item ${page === currentPageBestSelling ? "active" : ""}`}>
                  {page === "..." ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button
                      className="page-link"
                      onClick={() => handlePageChangeBestSelling(page as number)}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}
