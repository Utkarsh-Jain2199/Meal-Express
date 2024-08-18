
// import React, { useState, useRef, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatchCart, useCart } from './ContextReducer'
// // import { Dropdown, DropdownButton } from 'react-bootstrap';
// export default function Card(props) {
//   let data = useCart();

//   let navigate = useNavigate()
//   const [qty, setQty] = useState(1)
//   const [size, setSize] = useState("")
//   const priceRef = useRef();
//   // const [btnEnable, setBtnEnable] = useState(false);
//   // let totval = 0
//   // let price = Object.values(options).map((value) => {
//   //   return parseInt(value, 10);
//   // });
//   let options = props.options;
//   let priceOptions = Object.keys(options);
//   let foodItem = props.item;
//   const dispatch = useDispatchCart();
//   const handleClick = () => {
//     if (!localStorage.getItem("token")) {
//       navigate("/login")
//     }
//   }
//   const handleQty = (e) => {
//     setQty(e.target.value);
//   }
//   const handleOptions = (e) => {
//     setSize(e.target.value);
//   }
//   const handleAddToCart = async () => {
//     let food = []
//     for (const item of data) {
//       if (item.id === foodItem._id) {
//         food = item;

//         break;
//       }
//     }
//     console.log(food)
//     console.log(new Date())
//     if (food !== []) {
//       if (food.size === size) {
//         await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
//         return
//       }
//       else if (food.size !== size) {
//         await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
//         console.log("Size different so simply ADD one more to the list")
//         return
//       }
//       return
//     }

//     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


//     // setBtnEnable(true)

//   }

//   useEffect(() => {
//     setSize(priceRef.current.value)
//   }, [])

//   // useEffect(()=>{
//   // checkBtn();
//   //   },[data])

//   let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
//   // totval += finalPrice;
//   // console.log(totval)
//   return (
//     <div>

//       <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//         <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//         <div className="card-body">
//           <h5 className="card-title">{props.foodName}</h5>
//           {/* <p className="card-text">This is some random text. This is description.</p> */}
//           <div className='container w-100 p-0' style={{ height: "38px" }}>
//             <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
//               {Array.from(Array(6), (e, i) => {
//                 return (
//                   <option key={i + 1} value={i + 1}>{i + 1}</option>)
//               })}
//             </select>
//             <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
//               {priceOptions.map((i) => {
//                 return <option key={i} value={i}>{i}</option>
//               })}
//             </select>
//             <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//               ₹{finalPrice}/-
//             </div>
//           </div>
//           <hr></hr>
//           <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
//           {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
//         </div>
//       </div>
//     </div>
//   )
// }
// //

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';
import './styles/Card.css'; // New CSS file for styling

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;
  const dispatch = useDispatchCart();

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    let food = data.find(item => item.id === foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
      }
    } else {
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div className="food-card-container">
      <div className="card mt-3 shadow-sm food-card">
        <img
          src={props.ImgSrc}
          className="card-img-top food-card-img"
          alt={props.foodName}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className="container p-0">
            <div className="d-flex align-items-center justify-content-between">
              <select
                className="form-select m-2 qty-select"
                onChange={handleQty}
                disabled={!isLoggedIn}
                aria-label="Select quantity"
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="form-select m-2 size-select"
                ref={priceRef}
                onChange={handleOptions}
                disabled={!isLoggedIn}
                aria-label="Select size"
              >
                {priceOptions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <div className="price-tag">₹{finalPrice}/-</div>
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success w-100 add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
