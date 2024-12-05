import React from 'react'
import SubNewsLatter from '../components/SubNewsLatter'

const page = () => {
  return (
    <div>
       <div className=" mx-auto px-4 py-12 max-w-2xl">
      <div className=" p-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-4">Track your order.</h1>
          <p className="text-gray-500">
            To track your order please enter your Order ID in the box below and press the
            "Track" button. This was given to you on your receipt and in the confirmation
            email you should have received.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-500 text-center mb-1">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              className="w-full px-3 py-2 border border-gray-300 bg-[#ffffff0c] rounded-md shadow-sm text-center focus:outline-none focus:ring-1 focus:ring-[#004798] focus:border-[#004798]"
              placeholder="Found in your order confirmation email."
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-500 text-center mb-1">
              Billing email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#ffffff0c] shadow-sm text-center focus:outline-none focus:ring-1 focus:ring-[#004798] focus:border-[#004798]"
              placeholder="Email you used during checkout."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#004798] text-white py-2 px-4 rounded-md"
          >
            Track
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-16 text-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold mb-2">2500+</h3>
          <p className="text-gray-500">
            Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem.
          </p>
        </div>
        <div>
          <h3 className="text-3xl md:text-4xl font-semibold mb-2">35K</h3>
          <p className="text-gray-500">
            Aenean condimentum cursus aliquet. Aliquam eget pulvinar lorem.
          </p>
        </div>
      </div>
    </div>
    <SubNewsLatter />
    </div>
  )
}

export default page
