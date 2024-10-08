import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../components/styles/MyOrder.css';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return; // Handle case where email is missing

        try {
            const res = await fetch("https://meal-express-backend.onrender.com/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            const response = await res.json();
            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (!orderData || !orderData.orderData) {
        return (
            <div className="loading-container">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container my-order-container">
                <h2 className="text-center my-4">My Orders</h2>
                <div className="row">
                    {orderData.orderData.order_data.slice(0).reverse().map((order, index) => (
                        <div key={index} className="col-12 mb-4">
                            <h5 className="order-date text-center">Order Date: {order[0].Order_date}</h5>
                            <hr />
                            <div className="row">
                                {order.map((item, idx) => (
                                    item.Order_date ? null : (
                                        <div key={idx} className="col-12 col-md-6 col-lg-4 mb-3 d-flex">
                                            <div className="card shadow-sm flex-fill">
                                             {/* <img src={item.img} className="card-img-top" alt={item.name} /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className="container p-0">
                                                        <span className="badge bg-primary me-2">Qty: {item.qty}</span>
                                                        <span className="badge bg-secondary me-2">Size: {item.size}</span>
                                                        <div className="price-section mt-2 d-flex justify-content-between align-items-center">
                                                            <span className="text-muted">{item.Order_date}</span>
                                                            <div className="price-tag fs-5">
                                                                ₹{item.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
