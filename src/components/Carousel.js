import React from 'react';
import './styles/Carousel.css';

export default function Carousel() {
    return (
        <div className="carousel-container">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-item active">
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="d-block w-100 carousel-image"
                            alt="Delicious meal"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="d-block w-100 carousel-image"
                            alt="Tasty cuisine"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="d-block w-100 carousel-image"
                            alt="Delightful food"
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
