import Link from "next/link"
import Image from "next/image"
import { RiFacebookBoxFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import img1 from '../assets/app-store.webp'
import img2 from '../assets/google-play.webp'

export default function Footer() {
  return (
    <footer className="w-full border-t overflow-hidden">
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Help Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Do You Need Help ?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Autoseligen svr. Nek djarask fröbomba. Når antipol kynoda nynat. Pressa fåmoska.
            </p>
            <div className="mb-4">
              <Link 
                href="tel:0800300353" 
                className="text-2xl font-bold text-blue-500 hover:text-green-500"
              >
                0 800 300-353
              </Link>
              <p className="text-sm text-muted-foreground">Free from fixed and mobile phones in USA.</p>
            </div>
            <div className="mb-4">
              <p className="text-sm">
                Email: <Link href="mailto:info@example.com" className="text-primary hover:underline">info@example.com</Link>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Call Center hours</p>
              <p className="text-sm text-muted-foreground">Mon-Sun 09:00-19:00</p>
            </div>
          </div>

          {/* Let Us Help You */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Let Us Help You</h2>
            <ul className="space-y-2">
              {[
  { label: "Your Orders", path: "/myaccount" },
  { label: "Returns & Replacements", path: "/privacy/return-refund" },
  { label: "Shipping Rates & Policies", path: "/privacy/shiping" },
  { label: "Refund and Returns Policy", path: "/privacy/return-refund" },
  { label: "Privacy Policy", path: "/privacy/privacy-policy" },
  { label: "Terms and Conditions", path: "/privacy/term-condition" },
  { label: "Cookie Settings", path: "/privacy/cookies-setting" },

  { label: "Help Center", path: "/contact" },
].map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Make Money with Us</h2>
            <ul className="space-y-2">
              {[
                { label: "Sell on Blonwe", path: "/privacy/sellonblone" },
  { label: "Sell Your Services on Blonwe", path: "/contact" },
  { label: "Sell on Blonwe Business", path: "/contact" },
  { label: "Sell Your Apps on Blonwe", path: "/shop" },
  { label: "Become an Affiliate", path: "/contact/contact-3" },
  { label: "Advertise Your Products", path: "/privacy/advertise" },
  { label: "Self-Publish with Us", path: "/privacy/selfpublish" },
  { label: "Become a Blonwe Vendor", path: "/privacy/vendor" },

              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get to Know Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Get to Know Us</h2>
            <ul className="space-y-2">
              {[
                 { label:"Careers for Blonwe"  , path: "/privacy/carriers" },  
                 {  label: "About Blonwe", path:"/privacy/about" },
                 {label :"Inverstor Relations", path : "/privacy/investors"},
                 {label : "Blonwe Devices" , path : "/privacy/devices"},
                 {label : "Customer Device"  , path : "/privacy/customer"},
                 {label : "Social Responsibility" , path:"/privacy/social"},
                 {label : "Store Locations"  , path : "/privacy/store"},
                // "About Blonwe",
                // "Inverstor Relations",
                // "Blonwe Devices",
                // "Customer reviews",
                // "Social Responsibility",
                // "Store Locations"
              ].map((item) => (
                <li key={item}>
                  <Link href={item.path} className="text-sm text-muted-foreground hover:text-primary hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social and Download Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border mt-8 pt-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-sm">Follow us:</span>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <RiFacebookBoxFill className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <IoLogoYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <FaInstagramSquare className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Download App:</span>
            <Link href="#">
              <Image
                src={img1}
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10"
              />
            </Link>
            <Link href="#">
              <Image
                src={img2}
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="h-10"
              />
            </Link>
          </div>
        </div>

        {/* Copyright and Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border mt-8 pt-8 text-sm text-muted-foreground">
          <p>
            Copyright 2024 © Blonwe WordPress Theme. All right reserved. Powered by KLBTheme.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>We accept:</span>
            <div className="flex gap-2">
              {["Visa", "Mastercard", "PayPal", "Skrill", "Klarna"].map((method) => (
                <span key={method} className="px-2 py-1 bg-muted rounded">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

