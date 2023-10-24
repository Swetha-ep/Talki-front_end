import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import useRazorpay from 'react-razorpay';
import logoImage from '../../../assets/logo.png';
import jwtDecode from 'jwt-decode';

function VipPay() {
  const token = localStorage.getItem('user');
  const decoded = jwtDecode(token);
  const [Razorpay] = useRazorpay();
  const [amount, setAmount] = useState(500);

 
  const complete_payment = (payment_id,order_id,signature) => {
  
    axios
    .post(`http://127.0.0.1:8000/payment/order/complete/${decoded.user_id}/`, {
      "payment_id": payment_id,
      "order_id": order_id,
      "signature": signature,
      "amount": amount,
      "currency": 'INR',
    }, {
      
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const razorpayPayment = () => {
  
    axios
    .post(`http://127.0.0.1:8000/payment/order/create/${decoded.user_id}/`, {
      // "payment_id": payment_id,
      // "order_id": order_id,
      // "signature": signature,
      "amount": amount,
      "currency": 'INR',
    }, {
      
    })
      .then(function (response) {
        console.log(response.data.data);
        const order_id = response.data.data.id;

        const options = {
          key: 'rzp_test_BYEW8iXywrLllV',
          name: 'Talki',
          description: 'VIP membership upgrade',
          image: logoImage,
          order_id: order_id,
          handler: function (response) {
            complete_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: 'Talki',
            email: 'violet.store.she@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Talki Team',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="lg:m-16 m-10">
      <div className="shadow-lg lg:p-14 p-7 rounded-md">
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-x-circle-fill"
            viewBox="0 0 25 25"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </div>
        <h6 className="text-lg">
          "Unlock a World of English Learning! Become a VIP Member Today and Enjoy 30 Days of Uninterrupted Conversations with Our Highly Skilled Trainers. Say Goodbye to Delays and Hello to Fluency!"
        </h6>

        <div className="flex justify-center h-screen">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl ml-24 font-bold mb-4">VIP Membership</h1>
            <h1 className="text-5xl ml-40 font-bold mb-4">₹500</h1>
            <p className="text-lg">
              Enjoy 30 days of fluent speaking with our best trainers. Live chat and video calls included.
            </p>
            <button
              type="button"
              onClick={razorpayPayment}
              className="py-2 px-4 text-white mt-20 ml-40 rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl"
            >
              UPGRADE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VipPay;
