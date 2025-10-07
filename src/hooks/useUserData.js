import { useState, useEffect } from 'react';

export const useUserData = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [orderName, setOrderName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [orderMobile, setOrderMobile] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedMobile = localStorage.getItem('userMobile');
    if (storedName) {
      setUserName(storedName);
      setOrderName(storedName);
    }
    if (storedMobile) {
      setUserMobile(storedMobile);
      setOrderMobile(storedMobile);
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://meal-express-backend-production.up.railway.app/api/auth/getuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });

      const user = await response.json();
      setUserAddress(user.location || "");
      setCheckoutAddress(user.location || "");
      setUserName(user.name || "");
      setOrderName(user.name || "");
      setUserMobile(user.mobile || "");
      setOrderMobile(user.mobile || "");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    userName,
    setUserName,
    orderName,
    setOrderName,
    userMobile,
    setUserMobile,
    orderMobile,
    setOrderMobile,
    userAddress,
    setUserAddress,
    checkoutAddress,
    setCheckoutAddress
  };
};

