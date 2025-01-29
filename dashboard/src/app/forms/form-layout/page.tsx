'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import swal from "sweetalert";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "@/store/reducers/productReducer";
import { toast } from "react-toast";


const FormLayout = () => {

  const { products } = useSelector((state: RootState) => state.products)

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const handledelete = (id) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast(res.payload.message);
      }
    });
  }

// Ensure products is an array
const menu = Array.isArray(products) ? products : (products?.menu || []); // Check if products is an array or has a menu property

console.log('Products:', menu);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Products" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Product Id</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Discount</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Store</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {menu.map((product, key) => (
        <div
          className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >  
        <div className="col-span-1 hidden items-center sm:flex">
        <p className="text-sm text-black dark:text-white">
          {key + 1}
        </p>
      </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product?.image[0]}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
            ₹ {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.discount}%</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{product.store}</p>
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <Link href={`/forms/updateproduct?id=${product._id}`} className="bg-purple-500 text-white px-3 py-1 rounded" ><LiaEditSolid /></Link>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handledelete(product._id)} ><RiDeleteBinLine /></button>
          </div>
        </div>
      ))}
    </div>
    </DefaultLayout>
  );
};

export default FormLayout;
