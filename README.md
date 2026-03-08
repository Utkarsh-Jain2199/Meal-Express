# 🍽️ Meal Express - Food Delivery Application

A modern, full-stack food delivery web application built with React and Node.js. Meal Express allows users to browse food items, add them to cart, place orders, and track their order history.

## 🌐 Live Demo

**Deployed Application:** [https://meal-express-phda.vercel.app/](https://meal-express-phda.vercel.app/)

## ✨ Features

### 🔐 User Authentication
- **User Registration** with email validation and password encryption
- **Secure Login** with JWT token authentication
- **Automatic Location Detection** for delivery address
- **Session Management** with localStorage

### 🍕 Food Ordering System
- **Dynamic Food Menu** with categorized items
- **Real-time Search** functionality across all food items
- **Interactive Food Cards** with size and quantity selection
- **Shopping Cart** with add/remove/update capabilities
- **Order Placement** with order confirmation

### 📱 User Experience
- **Responsive Design** that works on all devices
- **Modern UI/UX** with Bootstrap and custom CSS
- **Loading States** and error handling
- **Order History** tracking for logged-in users
- **Modal Cart View** for seamless shopping experience

### 🛠️ Technical Features
- **MERN Stack** (MongoDB, Express.js, React, Node.js)
- **Context API** for state management
- **RESTful API** design
- **MongoDB Atlas** for cloud database
- **JWT Authentication** for secure sessions
- **Geolocation API** integration for address detection

## 🏗️ Project Structure

```
Meal-Express/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB models
│   │   ├── User.js         # User schema
│   │   └── Orders.js       # Order schema
│   ├── Routes/             # API routes
│   │   └── Auth.js         # Authentication endpoints
│   ├── middleware/         # Custom middleware
│   ├── db.js              # Database connection
│   └── index.js           # Server entry point
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   │   ├── Card.js         # Food item card
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Footer.js       # Footer component
│   │   ├── ContextReducer.js # State management
│   │   └── styles/         # Component-specific CSS
│   ├── screens/            # Main application screens
│   │   ├── Home.js         # Home page with food menu
│   │   ├── Login.js        # User login
│   │   ├── Signup.js       # User registration
│   │   ├── MyOrder.js      # Order history
│   │   └── Cart.js         # Shopping cart
│   └── App.js              # Main application component
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Utkarsh-Jain2199/Meal-Express.git
   cd Meal-Express
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   **Frontend Environment Variables:**
   Create a `.env` file in the root directory with:
   ```env
   REACT_APP_BACKEND_URL=https://meal-express-backend.onrender.com
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```
   
   **Backend Environment Variables:**
   - Create a MongoDB Atlas cluster
   - Update the database connection string in `backend/db.js`
   - Configure your JWT secret in `backend/Routes/Auth.js`

5. **Start the Application**

   **Start Backend Server:**
   ```bash
   cd backend
   node index.js
   ```
   Backend will run on `http://localhost:5000`

   **Start Frontend Development Server:**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend
- **React 17** - UI library
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Material-UI** - Additional UI components
- **Context API** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

### External APIs
- **OpenCage Geocoding API** - Location services
- **Unsplash** - Food images

## 📡 API Endpoints

### Authentication
- `POST /api/auth/createuser` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/getuser` - Get user details (protected)

### Food & Orders
- `POST /api/auth/foodData` - Get food items and categories
- `POST /api/auth/orderData` - Place new order
- `POST /api/auth/myOrderData` - Get user's order history
- `POST /api/auth/getlocation` - Get address from coordinates

## 🎨 Key Components

### Home Screen
- Dynamic food menu with categories
- Real-time search functionality
- Responsive food cards with add-to-cart
- Image carousel with food photos

### Authentication
- Secure user registration with validation
- Login with JWT token management
- Automatic location detection for delivery

### Shopping Cart
- Add/remove items functionality
- Quantity and size selection
- Real-time price calculation
- Modal-based cart interface

### Order Management
- Order placement with confirmation
- Order history tracking
- Detailed order information display

## 🔒 Security Features

- **Password Encryption** using bcryptjs
- **JWT Token Authentication** for secure sessions
- **Input Validation** using express-validator
- **CORS Configuration** for cross-origin requests
- **Protected Routes** for authenticated users

## 🚀 Deployment

The application is deployed on:
- **Frontend:** Vercel - [https://meal-express-phda.vercel.app/](https://meal-express-phda.vercel.app/)
- **Backend:** Render - [https://meal-express-backend.onrender.com/](https://meal-express-backend.onrender.com/)
- **Database:** MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Utkarsh Jain**
- GitHub: [@Utkarsh-Jain2199](https://github.com/Utkarsh-Jain2199)

## 🙏 Acknowledgments

- Unsplash for providing beautiful food images
- OpenCage for geocoding services
- Bootstrap and Material-UI for UI components
- MongoDB Atlas for cloud database hosting

---

**Note:** This is a demonstration project showcasing full-stack web development skills with modern technologies. The application includes user authentication, real-time data fetching, state management, and responsive design principles.
