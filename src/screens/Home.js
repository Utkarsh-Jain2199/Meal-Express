// import React, { useEffect, useState } from 'react'
// import Card from '../components/Card'
//  import Carousel from '../components/Carousel'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'
// export default function Home() {
//   const [foodCat, setFoodCat] = useState([])
//   const [foodItems, setFoodItems] = useState([])
//   const [search, setSearch] = useState('')
//   const loadFoodItems = async () => {
//     let response = await fetch("https://meal-express-backend.onrender.com/api/auth/foodData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }

//     });
//     response = await response.json()
//     // console.log(response[1][0].CategoryName)
//     setFoodItems(response[0])
//     setFoodCat(response[1])
//   }

//   useEffect(() => {
//     loadFoodItems()
//   }, [])

//   return (
//     <div >
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

//           <div className="carousel-inner " id='carousel'>
//             <div className=" carousel-caption  " style={{ zIndex: "9" }}>
//               <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
//                 <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
//                 <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
//               </div>
//             </div>
//             <div className="carousel-item active" >
//               <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//           </div>
//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>
//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//           </button>
//         </div>
//       </div>
//       <div className='container'> {/* boootstrap is mobile first */}
//         {
//           foodCat !== []
// //           foodCat != null || foodCat.length < 1 || foodCat !== []
//             ? foodCat.map((data) => {
//               return (
//                 // justify-content-center
//                 <div className='row mb-3'>
//                   <div key={data.id} className='fs-3 m-3'>
//                     {data.CategoryName}
//                   </div>
//                   <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
//                   {foodItems !== [] ? foodItems.filter(
//                     (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
//                     .map(filterItems => {
//                       return (
//                         <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
//                           {console.log(filterItems.url)}
//                           <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
//                         </div>
//                       )
//                     }) : <div> No Such Data </div>}
//                 </div>
//               )
//             })
//             : ""}
//       </div>
//       <Footer />
//     </div>
// )
// }


// import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// export default function Home() {
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [search, setSearch] = useState('');

//   const loadFoodItems = async () => {
//     let response = await fetch("https://meal-express-backend.onrender.com/api/auth/foodData", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     response = await response.json();
//     setFoodItems(response[0]);
//     setFoodCat(response[1]);
//   }

//   useEffect(() => {
//     loadFoodItems();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
//           <div className="carousel-inner" id='carousel'>
//             <div className="carousel-caption" style={{ zIndex: "9" }}>
//               <div className="d-flex justify-content-center">
//                 <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
//                 <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
//               </div>
//             </div>
//             <div className="carousel-item active">
//               <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//           </div>
//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>
//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//           </button>
//         </div>
//       </div>
//       <div className='container'>
//         {foodCat && foodCat.length !== 0 ? foodCat.map((data) => {
//           return (
//             <div className='row mb-3' key={data.id}>
//               <div className='fs-3 m-3'>
//                 {data.CategoryName}
//               </div>
//               <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
//               {foodItems && foodItems.length !== 0 ? foodItems
//                 .filter((items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase()))
//                 .map(filterItems => {
//                   return (
//                     <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
//                       {console.log(filterItems.url)}
//                       <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
//                     </div>
//                   )
//                 }) : <div>No Such Data</div>}
//             </div>
//           )
//         }) : ""}
//       </div>
//       <Footer />
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// export default function Home() {
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [search, setSearch] = useState('');

//   const loadFoodItems = async () => {
//     try {
      
//     const maxRetries = 10; // Maximum number of retry attempts
//      let retries = 0;
//        while (retries < maxRetries) {  
//     let response = await fetch("https://meal-express-backend.onrender.com/api/auth/foodData", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     response = await response.json();
//     if(response.length<=2){
//           retries++;
//     }
//     //console.log(response.length,"food and item");
//     setFoodItems(response[0]);
//     setFoodCat(response[1]);
//   }
//      } catch (error) {
//       console.log(error,"error  ")
//     }
//   }

//   useEffect(() => {
//     loadFoodItems();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
//           <div className="carousel-inner" id='carousel'>
//             <div className="carousel-caption" style={{ zIndex: "9" }}>
//               <div className="d-flex justify-content-center">
//                 <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
//                 <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
//               </div>
//             </div>
//             <div className="carousel-item active">
//               <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//             <div className="carousel-item">
//               <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//             </div>
//           </div>
//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>
//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//           </button>
//         </div>
//       </div>
//       <div className='container'>
//         {foodCat && foodCat.length !== 0 ? foodCat.map((data) => {
//           return (
//             <div className='row mb-3' key={data.id}>
//               <div className='fs-3 m-3'>
//                 {data.CategoryName}
//               </div>
//               <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left, rgb(0, 255, 137), rgb(0, 0, 0))" }} />
//               {foodItems && foodItems.length !== 0 ? foodItems
//                 .filter((items) => items.CategoryName === data.CategoryName && items.name.toLowerCase().includes(search.toLowerCase()))
//                 .map(filterItems => {
//                   console.log(filterItems,"key")
//                   return (
//                     <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                   
//                       <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
//                     </div>
//                   )
//                 }) : <div>No Such Data</div>}
//             </div>
//           )
//         }) : ""}
//       </div>
//       <Footer />
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../components/styles/Home.css'; // External CSS for improved styling

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for the spinner

  const loadFoodItems = async () => {
    let success = false;
    while (!success) {
      try {
        let response = await fetch("https://meal-express-backend.onrender.com/api/auth/foodData", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          response = await response.json();
          setFoodItems(response[0]);
          setFoodCat(response[1]);
          success = true;
          setLoading(false); // Stop loading once data is fetched
        } else {
          console.log("API failure", response);
        }
      } catch (error) {
        console.log(error, "Error while calling API");
      }
    }
    if (!success) {
      console.log('Retrying API call...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ zIndex: "9" }}>
            <div className="search-box w-75">
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search for delicious meals..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-danger text-white search-clear-btn" onClick={() => setSearch('')}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="Delicious meal" />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="Tasty cuisine" />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&h=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-image" alt="Delightful food" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Show loading spinner while fetching food items */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container my-5">
          {/* Filter categories that have matching food items */}
          {foodCat && foodCat.length !== 0 ? foodCat
            .filter(category =>
              foodItems.some(item =>
                item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())
              )
            )
            .map((category) => {
              return (
                <div className="category-section mb-5" key={category.id}>
                  <div className="category-heading fs-3 mb-3">{category.CategoryName}</div>
                  <hr className="category-hr" />
                  <div className="row">
                    {foodItems && foodItems.length !== 0 ? foodItems
                      .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                      .map((filteredItem) => (
                        <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-4">
                          <Card foodName={filteredItem.name} item={filteredItem} options={filteredItem.options[0]} ImgSrc={filteredItem.img} />
                        </div>
                      )) : <div className="text-center">No items found</div>}
                  </div>
                </div>
              );
            }) : ""}
        </div>
      )}

      <Footer />
    </div>
  );
}
