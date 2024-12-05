import Image from "next/image"
import img from '../assets/contact-image-1.jpg'
import Features from "../components/Features"
import SubNewsLatter from "../components/SubNewsLatter"

export default function ContactPage() {
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
            <div className="font-medium text-sm text-gray-500">United States</div>
            <h3 className="text-lg mb-2">United States Office</h3>
            <p className="text-sm text-gray-500 mb-4">205 Middle Road, 2nd Floor, New York</p>
            <p className="text-sm mb-2">+02 1234 567 88</p>
            <a href="mailto:info@example.com" className="text-sm text-[#004798] hover:underline">
              info@example.com
            </a>
          </div>
        </div>

        {/* UK Office */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-gray-400">02</div>
          <div>
            <div className="font-medium text-sm text-gray-500">United Kingdom</div>
            <h3 className="text-lg mb-2">United Kingdom Office</h3>
            <p className="text-sm text-gray-500 mb-4">79 Manor Way, 2nd Floor, Great Fransham</p>
            <p className="text-sm mb-2">+49 1234 567 88</p>
            <a href="mailto:contact@example.com" className="text-sm text-[#004798] hover:underline">
              contact@example.com
            </a>
          </div>
        </div>

        {/* German Office */}
        <div className="space-y-4">
          <div className="text-2xl font-light text-gray-400">03</div>
          <div>
            <div className="font-medium text-sm text-gray-500">Germany</div>
            <h3 className="text-lg mb-2">Germany Office</h3>
            <p className="text-sm text-gray-500 mb-4">Holstenwall 86, Sachsen-Anhalt, Zschornewitz</p>
            <p className="text-sm mb-2">+44 1234 567 88</p>
            <a href="mailto:info@example.com" className="text-sm text-[#004798] hover:underline">
              info@example.com
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
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm block">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#ffffff09] focus:ring-2 focus:ring-[#004798] min-h-[150px]"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-[#004798] text-white rounded-md hover:bg-[#004798] "
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Features />
      <SubNewsLatter />
    </div>
  )
}

