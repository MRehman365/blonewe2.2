'use client'

import { useState } from 'react'
import { FaRegBookmark } from 'react-icons/fa'
import SubNewsLatter from '../components/SubNewsLatter'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States (US)',
    streetAddress: '',
    apartment: '',
    town: '',
    state: 'California',
    zipCode: '',
    phone: '',
    email: '',
    createAccount: false,
    differentAddress: false,
    orderNotes: '',
    termsAccepted: false
  })

  const orderItems = [
    { name: 'HomePod mini - Space Gray', quantity: 1, price: 249.99 },
    { name: 'ELECTROLUX EW6S22G2SJ', quantity: 1, price: 190.00 },
    { name: 'ecobee 4 Lite Smart Thermostat 2.0, No Hub Required', quantity: 2, price: 260.00 }
  ]

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Coupon Banner */}
          <div className=" border border-gray-400 p-4 rounded">
            <p className="text-sm text-gray-500">
              Have a coupon? <button className="text-[#004798] hover:text-blue-800">Click here</button> to enter your code
            </p>
          </div>

          {/* Free Shipping Banner */}
          <div className="bg-[#18ff3b1e] p-4 mb-6 rounded flex items-center gap-2">
        <FaRegBookmark className="text-green-600" />
        <span className="">Your order qualifies for free shipping!</span>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Details Form */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Billing details</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-[#ffffff12] focus:outline-none focus:ring-[#004798] focus:ring-1 focus:border-[#004798]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-[#ffffff12] focus:outline-none focus:ring-[#004798] focus:ring-1 focus:border-[#004798]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  >
                    <option>United States (US)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House number and street name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Town / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  >
                    <option>California</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="create-account"
                      className="h-4 w-4 text-[#004798] focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] border-gray-300 rounded"
                    />
                    <label htmlFor="create-account" className="ml-2 text-sm text-gray-700">
                      Create an account?
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="different-address"
                      className="h-4 w-4 text-[#004798] focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] border-gray-300 rounded"
                    />
                    <label htmlFor="different-address" className="ml-2 text-sm text-gray-700">
                      Ship to a different address?
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">
                    Order notes (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] focus:border-[#004798]"
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#ffffff06] p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">Your order</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Product</span>
                      <span>Subtotal</span>
                    </div>
                  </div>

                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

       {/* Shipping Section 1 */}
       <div className="border-b pb-4 flex justify-between">
        <div className=" flex item-center">
          <span className="font-medium">Shipping: </span>
      
        </div>
        <div className='flex flex-col gap-1 justify-center items-end text-right'>
        <p className='text-sm text-gray-500'>    <span>chakta</span></p>
        <p className="text-[12px] text-gray-500">
          GEORG JENSEN - ALFREDO - SALATBESTIK x1, Apple AirPods Max Gets Firmware Update To 3C39 x1
        </p>
        <div className="mt-2 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-end gap-2">
          <label htmlFor="machic-free-shipping">Free shipping</label>
            <input type="radio" id="machic-free-shipping" name="machic-shipping" defaultChecked />
          </div>
          <div className="flex items-center justify-end gap-2">
          <label htmlFor="machic-local-pickup">Local pickup</label>
            <input type="radio" id="machic-local-pickup" name="machic-shipping" />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
        <p><span>Shipping to CA.</span></p>
           <button className="text-[#004798] underline">Change address</button>
        </div>
      </div>
      </div>

      {/* Shipping Section 2 */}
      <div className="border-b pb-4 flex">
        <div className="mb-2 flex items-center">
          <span className="font-medium">Shipping: </span>
          
        </div>
        <div className='flex justify-end flex-col items-end text-right'>
        <p><span>machic</span></p>
        <p className="text-[12px] text-gray-500 ">
          BY WIRTH - SCALA SKAMMEL - FLERE VARIANTER x1, ELECTROLUX EW6S226SUI x1, GEORG JENSEN -
          ALFREDO - SALATSKÅL - RUSTFRI x1
        </p>
        <div className="mt-2 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-end gap-2">
          <label htmlFor="machic-free-shipping">Free shipping</label>
            <input type="radio" id="machic-free-shipping" name="machic-shipping" defaultChecked />
          </div>
          <div className="flex items-center justify-end gap-2">
          <label htmlFor="machic-local-pickup">Local pickup</label>
            <input type="radio" id="machic-local-pickup" name="machic-shipping" />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
        <p><span>Shipping to CA.</span></p>
        </div>
        </div>
      </div>


                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-xl text-red-600">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className=" p-4 rounded mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                    </p>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="h-4 w-4 text-[#004798] focus:ring-[#004798] focus:ring-1 bg-[#ffffff12] border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                        I have read and agree to the website terms and conditions *
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full  text-white py-3 px-4 rounded-md bg-[#004798] "
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubNewsLatter />
    </div>
  )
}

