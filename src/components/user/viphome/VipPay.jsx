import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import useRazorpay from 'react-razorpay';
import logoImage from '../../../assets/logo.png';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { paymentAPI } from '../../../constants/api';

function VipPay() {
  const token = localStorage.getItem('user');
  const decoded = jwtDecode(token);
  const [Razorpay] = useRazorpay();
  const [amount, setAmount] = useState({});

 useEffect(()=>{
  axios.get(`${paymentAPI}/paymentdetails/`)
  .then((response) => {
    console.log(response.data)
    setAmount(response.data)
  })
 },[])
  const complete_payment = (payment_id,order_id,signature) => {
  
    axios
    .post(`${paymentAPI}/order/complete/${decoded.user_id}/`, {
      "user" : decoded.user_id,
      "payment_id": payment_id,
      "order_id": order_id,
      "signature": signature,
      "amount": amount.price,
      "currency": 'INR',
    }, {
      
    })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: 'Thank you for your payment.',
        }).then(() => {
          // Redirect to the home page after the Swal is closed
          window.location.href = '/'; // Replace with the actual home page URL
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const razorpayPayment = () => {
  
    axios
    .post(`${paymentAPI}/order/create/${decoded.user_id}/`, {
      // "payment_id": payment_id,
      // "order_id": order_id,
      // "signature": signature,
      "amount": amount.price,
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
      <div className="">
        
      <h6 className="text-lg text-center">
  "Unlock a World of English Learning! Become a VIP Member Today and Enjoy 30 Days of Uninterrupted Conversations with Our Highly Skilled Trainers. Say Goodbye to Delays and Hello to Fluency! Get exclusive access to a community of motivated learners. Elevate your speaking skills with tailored sessions. Learn at your pace, achieve fluency effortlessly."
</h6>


        <div className="flex justify-center h-screen mt-10">
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md w-full">
    <h1 className="text-2xl ml-16 font-bold mb-4 mt-5">VIP Membership {amount.name}</h1>
    <h1 className="text-5xl ml-28 font-bold mb-4">{amount.price} <span className="text-sm"> INR</span></h1>
    <p className="text-lg mb-6 mt-8 text-center">
      Enjoy the following features with your VIP Membership:
    </p>
    <ul className="text-left list-disc pl-5  mt-10">
      <li>VIP Trainers at Your Service</li>
      <li>Unlimited Daily Connections for Continuous Learning</li>
      <li>Personalized Feedback and Valuable Suggestions</li>
      <li>Extended Chat Time for Uninterrupted Conversations</li>
      
      <li>Specialized Training Programs Tailored for You</li>
      <li>Customized Learning Plans for Rapid Improvement</li>
      <li>Priority Support for Your Language Journey</li>
      
    </ul>
    <button
      type="button"
      onClick={razorpayPayment}
      className="py-2 px-4 text-white ml-28 rounded-xl border bg-gray-900 hover:bg-gray-600 active:bg-black focus:outline-none focus:ring focus:ring-black hover:drop-shadow-xl mt-14"
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
