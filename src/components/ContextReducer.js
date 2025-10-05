import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "ADD":
            newState = [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
            break;
        case "REMOVE":
            newState = [...state]
            newState.splice(action.index, 1)
            break;
        case "DROP":
            newState = []
            break;
        case "UPDATE":
            newState = [...state]
            newState.find((food, index) => {
                if (food.id === action.id) {
                    newState[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return newState
            })
            break;
        default:
            newState = state;
    }
    
    localStorage.setItem('cartItems', JSON.stringify(newState));
    return newState;
};

export const CartProvider = ({ children }) => {
    const getInitialCartState = () => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            return [];
        }
    };

    const [state, dispatch] = useReducer(reducer, getInitialCartState());

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);