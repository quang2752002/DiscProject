"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../component/header/page";
import Footer from "../component/footer/page";
import { Cart } from "@/model/Cart";
import { Modal, Button } from "react-bootstrap";
import { CartService } from "@/services/CartService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.css";

const CartPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Cart[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();
  const cartService = new CartService();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await cartService.getCart(token);

        if (!response) {
          throw new Error("Failed to fetch cart");
        }
       
        
        const result = Array.isArray(response) ? response : [];
        setData(result);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("An error occurred while fetching cart data.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  const updateQuantity = async (id: number, quantity: number) => {
    console.log(`Updating quantity for item ID: ${id} to ${quantity}`);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
  
      const response = await cartService.updateQuantity(token, id, quantity);
  
      if (!response) {
        throw new Error("Failed to update quantity");
      }
  
      console.log("Update successful:", response);
  
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("An error occurred while updating quantity.");
    }
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id: number) => {
    setItemToRemove(id);
    setShowModal(true);
  };

  const handleConfirmRemove = async () => {
    if (itemToRemove !== null) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await cartService.removeItem(token, itemToRemove);
       
        if (!response) {
          throw new Error("Failed to remove item");
        }

        setData((prevData) =>
          prevData.filter((item) => item.id !== itemToRemove)
        );
        setShowModal(false);
        toast.success("Item removed from cart successfully!"); // Show toast on success
      } catch (error) {
        console.error("Error removing item:", error);
        setError("An error occurred while removing item.");
        toast.error("Failed to remove item from cart."); // Show toast on error
      }
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleCheckout = () => {
    localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
    router.push("/checkout");
  };

  return (
    <div>
      <Header />
    
      <section className="cart_area section_padding">
        <div className="row">
          <h3 className="text-center">Your Cart</h3>
        </div>
        <br />
        <div className="container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="cart_inner">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => {
                      const total = item.price * item.quantity;
                      return (
                        <tr key={item.id}>
                          <td>
                            <input
                              style={{ width: "100%", height: "15px" }}
                              className="form"
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div className="product_count">
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                max={10}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    parseInt(e.target.value, 10)
                                  )
                                }
                                style={{
                                  width: "50px",
                                  textAlign: "center",
                                  margin: "0 10px",
                                }}
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td>${total.toFixed(2)}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleRemove(item.id)}
                            >
                              X
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="checkout_btn_inner float-right">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <br />
      <br />
      <Footer />
      <ToastContainer />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
