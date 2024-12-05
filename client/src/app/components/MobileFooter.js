import Link from 'next/link'
import React from 'react'
import { FaHeart, FaSearch, FaStore, FaUser } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import { IoIosHeartEmpty, IoIosMenu } from 'react-icons/io'
import { IoSearchOutline, IoStorefrontOutline } from 'react-icons/io5'
import { useTheme } from '../layout'

const MobileFooter = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t md:hidden" style={{
      backgroundColor: theme === "light" ? "rgba(255, 255, 255, 1)" : "rgba(26, 32, 44, 1)",
      color: theme === "light" ? "#000" : "#fff",
    }}>
    <nav className="flex items-center justify-between px-4 py-2">
      <Link
        href="/shop" 
        className="flex flex-col items-center gap-1"
      >
        <IoStorefrontOutline className="h-5 w-5" />
        <span className="text-xs">Store</span>
      </Link>
      <Link 
        href="/Search" 
        className="flex flex-col items-center gap-1"
      >
        <IoSearchOutline className="h-5 w-5" />
        <span className="text-xs">Search</span>
      </Link>
      <Link 
        href="/wishlist" 
        className="flex flex-col items-center gap-1"
      >
        <IoIosHeartEmpty className="h-5 w-5" />
        <span className="text-xs">Wishlist</span>
      </Link>
      <Link 
        href="/myaccount" 
        className="flex flex-col items-center gap-1"
      >
        <FaRegCircleUser className="h-5 w-5" />
        <span className="text-xs">Account</span>
      </Link>
      <Link 
        href="/categories" 
        className="flex flex-col items-center gap-1"
      >
        <IoIosMenu className="h-5 w-5" />
        <span className="text-xs">Categories</span>
      </Link>
    </nav>
  </div>
  )
}

export default MobileFooter