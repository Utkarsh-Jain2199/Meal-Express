import { useNavigate } from 'react-router-dom';

export const usePayment = (data, dispatch, checkoutAddress, userAddress, orderName, orderMobile, setToastType, setToastMessage, setShowSuccessToast, setOrderPlaced) => {
  const navigate = useNavigate();

  const handleCheckOut = async () => {
    const addressToUse = checkoutAddress || userAddress;
    
    if (!addressToUse || addressToUse.trim() === "") {
      alert("Please enter a delivery address");
      return;
    }

    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem("userEmail");

    try {
      const keyResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/razorpay-key`);
      const { key } = await keyResponse.json();

      const requestData = { 
        cartItems: data,
        deliveryAddress: checkoutAddress || userAddress,
        orderName: orderName,
        orderMobile: orderMobile
      };

      const orderResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify(requestData)
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        setToastType("error");
        setToastMessage(orderData.error || 'Failed to create payment order');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        return;
      }
      
      const { order } = orderData;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: 'Meal Express',
        description: 'Food Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': token
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: data,
                deliveryAddress: checkoutAddress || userAddress,
                orderName: orderName,
                orderMobile: orderMobile
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              const orderDataResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/orderData`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  order_data: data,
                  email: userEmail,
                  order_date: new Date().toDateString()
                })
              });

              if (orderDataResponse.status === 200) {
                dispatch({ type: "DROP" });
                setOrderPlaced(true);
                setTimeout(() => {
                  navigate('/myorder');
                }, 1600);
              }
            } else {
              setToastType("error");
              setToastMessage("Payment verification failed! Please try again.");
              setShowSuccessToast(true);
              setTimeout(() => setShowSuccessToast(false), 3000);
            }
          } catch (error) {
            setToastType("error");
            setToastMessage("Payment verification failed! Please try again.");
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
          }
        },
        modal: {
          ondismiss: function() {
            setToastType("warning");
            setToastMessage("Payment cancelled. Your cart items are saved.");
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
          }
        },
        prefill: {
          email: userEmail,
          contact: '9999999999'
        },
        theme: {
          color: '#ff6f00'
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        setToastType("error");
        setToastMessage(`Payment failed: ${response.error.description || 'Please try again'}`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      });

      rzp.open();
    } catch (error) {
      setToastType("error");
      setToastMessage('Failed to initiate payment. Please try again.');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return { handleCheckOut };
};
