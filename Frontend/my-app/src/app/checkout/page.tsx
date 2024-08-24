"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Cart } from "@/model/Cart";
import Header from "../component/header/page";
import Footer from "../component/footer/page";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartService } from "@/services/CartService";
import { OrderService } from "@/services/OrderService";
import { UserService } from "@/services/UserService";

const Checkout = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [cart, setCart] = useState<Cart[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNotes: "",
  });

  const router = useRouter();
  const cartService = new CartService();
  const orderService = new OrderService();
  const userService = new UserService();
  const isMounted = useRef(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
  
      try {
        const [userResponse, cartResponse] = await Promise.all([
          userService.getUser(token),
          cartService.getCheckOut(token, JSON.parse(localStorage.getItem("selectedCartItems") || "[]")),
        ]);
  
        if (userResponse) {
          setFormData({
            name: userResponse.firstName+" "+userResponse.lastName || "",
            email: userResponse.email || "",
            phone: userResponse.phoneNumber || "",
            orderNotes: "",
          });
        }
  
        if (Array.isArray(cartResponse)) {
          setCart(cartResponse);
          setSelectedItems(cartResponse.map(item => item.id));
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        toast.error("An error occurred while fetching data.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

   
  
    isMounted.current = true;
    verifyToken();
  
    return () => {
      isMounted.current = false;
      localStorage.removeItem("selectedCartItems");
    };
  }, [router]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("No items selected for checkout.");
      return;
    }

    try {
      const response = await orderService.CheckOut(
        token,
        selectedItems,
        formData.name,
        formData.email,
        formData.phone,
        formData.orderNotes
      );

      if (response) {
        toast.success("Order placed successfully!");

        localStorage.removeItem("selectedCartItems");

        // Redirect to a confirmation page or clear the cart
        router.push("/order-history");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

  const calculateOrderTotal = () => {
    if (!cart) return 0;
    return cart.reduce((total, item) => total + item.total, 0);
  };

  return (
    <div>
      <Header />
      <h1 className="text-center">Checkout</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Billing Details</h2>
            <div className="p-3 p-lg-5 border">
              <div className="form-group row">
                <div className="col-md-12">
                  <label htmlFor="name" className="text-black">Name <span className="text-danger">*</span></label>
                  <input type="text" required className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <label htmlFor="email" className="text-black">Email <span className="text-danger">*</span></label>
                  <input type="text" required className="form-control" id="email" name="email" placeholder="Email " value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <label htmlFor="phone" className="text-black">Phone <span className="text-danger">*</span></label>
                  <input type="text" required className="form-control" id="phone" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="orderNotes" className="text-black">Order Notes</label>
                <textarea name="orderNotes" id="orderNotes" cols={30} rows={5} className="form-control" placeholder="Write your notes here..." value={formData.orderNotes} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="p-3 p-lg-5 border">
                  <table className="table site-block-order-table mb-5">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart && cart.length > 0 ? (
                        cart.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.name} <strong>× {item.quantity}</strong>
                            </td>
                            <td>${item.total}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2}>No items in the cart.</td>
                        </tr>
                      )}
                      <tr>
                        <td className="text-black font-weight-bold">
                          <strong>Order Total</strong>
                        </td>
                        <td className="text-black font-weight-bold">
                          <strong>${calculateOrderTotal().toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="border mb-3">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-toggle="collapse"
                        href="#collapsebank"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapsebank"
                      >
                        Direct Bank Transfer
                      </a>
                    </h3>
                  </div>
                  <div className="border mb-3">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-toggle="collapse"
                        href="#collapsecheque"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapsecheque"
                      >
                        Check Payments
                      </a>
                    </h3>
                  </div>
                  <div className="border mb-5">
                    <h3 className="h6 mb-0">
                      <a
                        className="d-block"
                        data-toggle="collapse"
                        href="#collapsepaypal"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapsepaypal"
                      >
                        PayPal
                      </a>
                    </h3>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-lg py-3 btn-block" onClick={handleSubmit}>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Checkout;
