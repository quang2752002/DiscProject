"use client"; 
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../component/header/page";
import Banner from "../component/banner/page";
import Footer from "../component/footer/page";
import { Modal, Button, Form } from "react-bootstrap";
import { OrderItemService } from "@/services/OrderItemService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS


import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { OrderItem } from "@/model/OrderItem";

const OrderHistory = () => {
  const [orderItems, setOrderItem] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [itemToFeedback, setItemToFeedBack] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const orderItemService = new OrderItemService();
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await orderItemService.getOrderHistory(token);
        const fetchedProducts = Array.isArray(response) ? response : [];
        setOrderItem(fetchedProducts);

        if (!response) {
          throw new Error("Failed to fetch cart");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    verifyToken();
  }, [router]);

  const openFeedbackModal = (id: number) => {
    setItemToFeedBack(id);
    setShowModal(true);
  };

  const handleFeedBack = async () => {
    if (feedback.trim() === "") {
      toast.error("Feedback cannot be empty.");
      return;
    }

    try {
      // Simulate feedback submission logic for the specific item
      console.log("Feedback submitted for item:", itemToFeedback, feedback);
      toast.success("Thank you for your feedback!");
      setShowModal(false); // Close modal after submission
      setFeedback(""); // Reset feedback input
      setItemToFeedBack(null); // Reset itemToFeedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Order History</h1>
            <br />
          </div>
        </div>
        <div className="row">
          {Array.isArray(orderItems) && orderItems.length > 0 ? (
            orderItems.map((item) => (
              <div key={item.id} className="">
                <div className="card mb-3" style={{ textDecoration: "none" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <a  href={`/product-detail/${item.productId}`}>
                        <img
                          src={item.path}
                          className="img-fluid rounded-start text-center"
                          alt="..."
                          style={{ width: "250px", height: "200px" }}
                        />
                      </a>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.productName}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text text-right">
                          <small className="text-muted">
                            Số lượng : {item.quantity}
                          </small>
                        </p>
                        <p className="card-text text-right">
                          <small className="text-muted">
                            Thành tiền : {item.quantity * item.price}
                          </small>
                        </p>
                       
                        <p className="card-text text-right">
                          <small
                            className="text-muted"
                            style={{ fontSize: "10px" }}
                          >
                            Ngày đặt hàng:{" "}
                            {new Date(item.orderDate).toLocaleDateString(
                              "vi-VN"
                            )}{" "}
                            {new Date(item.orderDate).toLocaleTimeString(
                              "vi-VN"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </div>
      <Footer />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="feedbackForm.ControlTextarea1">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFeedBack}>
            Submit
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer /> {/* Toast container to display feedback messages */}
    </>
  );
};

export default OrderHistory;
