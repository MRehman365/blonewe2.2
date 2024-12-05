import React from 'react'

const SubNewsLatter = () => {
  return (
    <div className=' border-t border-gray-300 mt-[50px]'>
    <div className="flex flex-col md:flex-row items-center justify-between p-2 md:px-6 md:py-8 gap-4 rounded-md mt-4 max-w-7xl mx-auto">
    <div className="text-center sm:text-left mb-4 sm:mb-0">
      <h2 className="text-2xl font-bold">Join our newsletter for £10 offs</h2>
      <p className="text-sm mt-2">
        Register now to get the latest updates on promotions & coupons.<br />
        Don’t worry, we do not spam!
      </p>
    </div>
    <div className='flex flex-col items-start gap-3'>
    <form className="flex items-center w-full">
      <input
        type="email"
        placeholder="Enter your email address"
        className="px-4 py-3 border rounded-l-md focus:outline-none flex-grow sm:flex-grow-0"
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
      <a href="#" className="text-[#004798]">
        Terms & Conditions
      </a>{" "}
      and{" "}
      <a href="#" className="text-[#004798]">
        Privacy & Cookies Policy
      </a>.
    </p>
    </div>
  </div>
  </div>
  )
}

export default SubNewsLatter
