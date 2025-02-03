'use client'
import React, { useState } from 'react';

const SubNewsLatter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
    }
  };

  return (
    <div className="border-t border-gray-300 mt-[50px]">
      <div className="flex flex-col md:flex-row items-center justify-between p-2 md:px-6 md:py-8 gap-4 rounded-md mt-4 max-w-7xl mx-auto">
        {subscribed ? (
          <div className="text-center w-full">
            <h2 className="text-2xl font-bold text-green-600">Subscribed Successfully!</h2>
            <p className="text-sm mt-2 text-gray-600">Thank you for subscribing to our newsletter.</p>
          </div>
        ) : (
          <>
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold">Join our newsletter for ₹10 off</h2>
              <p className="text-sm mt-2">
                Register now to get the latest updates on promotions & coupons.<br />
                Don’t worry, we do not spam!
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <form className="flex items-center w-full" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 border rounded-l-md focus:outline-none flex-grow sm:flex-grow-0"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#004798] text-white px-4 py-3 rounded-r-md hover:bg-[#004798]/90"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 sm:mt-0 sm:ml-4">
                By subscribing you agree to our{" "}
                <a href="#" className="text-[#004798]">Terms & Conditions</a> and{" "}
                <a href="#" className="text-[#004798]">Privacy & Cookies Policy</a>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubNewsLatter;
