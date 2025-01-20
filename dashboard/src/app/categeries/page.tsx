"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import Buttons from "@/app/ui/buttons/page";
import { useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FcDeleteColumn } from "react-icons/fc";
import { BiCross } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";

const categeries = [
  {
    name: "Fashion"
  }
]

const categories = () => {
  const [textAreas, setTextAreas] = useState([0]);
  const [points, setPoints] = useState([0]);
  const [mainImage, setMainImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]); 

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setMainImage(URL.createObjectURL(file)); 
    }
  };

  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files); 
    const imageUrls = files.map((file) => URL.createObjectURL(file)); 
    setDetailImages(imageUrls);
  };

  const handleAddMore = () => {
    setTextAreas([...textAreas, textAreas.length]);
  }
  
  const handlepoint = () => {
    setPoints([...points, points.length]);
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />

      <form className="grid grid-cols-1 gap-9 sm:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Product
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
             
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                All Categories
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {categeries.map((tag, index) => (
                <div key={index } className="flex justify-between w-full">
                  <div>{index+ 1}</div>
                  <p>{tag.name}</p>
                  <div>
                    <CgRemove />
                  </div>
                </div>
              ))}

            </div>
          </div>

         
          
          <div className="flex justify-between mt-4">
          <input type="reset" placeholder="Reset form" className="rounded-md bg-primary px-4 py-2 text-white" />
                <input type="submit" placeholder="Upload" className="rounded-md bg-primary px-4 py-2 text-white" />
              </div>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default categories;
