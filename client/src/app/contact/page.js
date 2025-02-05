'use client'
import Image from "next/image"
import img from '../assets/contact-image-1.jpg'
import Features from "../components/Features"
import SubNewsLatter from "../components/SubNewsLatter"
import { useDispatch } from "react-redux"
import { sendContactForm } from "@/store/reducer/authReducer"
import { useState } from "react"
import { toast } from "react-toast"

export default function ContactPage() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await dispatch(sendContactForm(formData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-16 pb-8 text-left border-b border-gray-400">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">You can ask us questions !</h1>
        <p className="text-gray-600">
          Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.
        </p>
      </div>

      {/* Office Locations Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* US Office */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-gray-400">01</div>
          <div>
            <div className="font-medium text-sm text-gray-500">India</div>
            <h3 className="text-lg mb-2">Noida Office</h3>
            <p className="text-sm text-gray-500 mb-4">F02, D34 Red Fm Road Sector 2 Block D Noida, Uttar Pradesh 201301</p>
            <p className="text-sm mb-2">+91 7428 309 119</p>
            <a href="mailto:info@example.com" className="text-sm text-[#004798] hover:underline">
             support@maxifysolution.com
            </a>
          </div>
        </div>

        {/* UK Office */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-gray-400">02</div>
          <div>
            <div className="font-medium text-sm text-gray-500">India</div>
            <h3 className="text-lg mb-2">Noida Office</h3>
            <p className="text-sm text-gray-500 mb-4">F02, D34 Red Fm Road Sector 2 Block D Noida, Uttar Pradesh 201301</p>
            <p className="text-sm mb-2">+91 7428 309 119</p>
            <a href="mailto:contact@example.com" className="text-sm text-[#004798] hover:underline">
            support@maxifysolution.com
            </a>
          </div>
        </div>

        {/* German Office */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-gray-400">02</div>
          <div>
            <div className="font-medium text-sm text-gray-500">India</div>
            <h3 className="text-lg mb-2">Noida Office</h3>
            <p className="text-sm text-gray-500 mb-4">F02, D34 Red Fm Road Sector 2 Block D Noida, Uttar Pradesh 201301</p>
            <p className="text-sm mb-2">+91 7428 309 119</p>
            <a href="mailto:contact@example.com" className="text-sm text-[#004798] hover:underline">
            support@maxifysolution.com
            </a>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
        <div className="space-y-4">
          <p className="text-gray-600">
            Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras non elit vel magna molestie pellentesque in eu dui. Donec laoreet quis erat vitae finibus. Vestibulum enim eros, porta eget quam et, euismod dictum elit.
          </p>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img}
              alt="iPhone displaying various app icons"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600">
              Quisque mattis tortor eu tristique sodales. Aenean sit amet justo nec sem vestibulum.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm block">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#ffffff09] focus:ring-2 focus:ring-[#004798]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm block">
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#ffffff09] focus:ring-2 focus:ring-[#004798]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm block">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#ffffff09] focus:ring-2 focus:ring-[#004798]"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm block">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#ffffff09] focus:ring-2 focus:ring-[#004798] min-h-[150px]"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-[#004798] text-white rounded-md hover:bg-[#004798]"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
      <Features />
      <SubNewsLatter />
    </div>
  )
}

