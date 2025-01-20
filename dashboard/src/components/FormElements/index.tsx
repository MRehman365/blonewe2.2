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
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import Buttons from "@/app/ui/buttons/page";
import { useState } from "react";
import Image from "next/image";

const FormElements = () => {
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
    <>
      <Breadcrumb pageName="FormElements" />

      <form className="grid grid-cols-1 gap-9 sm:grid-cols-2">
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
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Store
                </label>
                <input
                  type="text"
                  required
                  placeholder="Add Store name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Categories
                </label>
                <input
                  type="text"
                  required
                  placeholder="Categories"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  required
                  placeholder="Price"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Discount on Products
                </label>
                <input
                  type="number"
                  required
                  placeholder="Add discount on product"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tags
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tags"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  SKU
                </label>
                <input
                  type="text"
                  required
                  placeholder="SKU"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Upload Image</h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Upload Main Image
          </label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleMainImageChange}
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
          {mainImage && (
            <div className="mt-3">
              <Image
                width={300}
                height={300}
                src={mainImage}
                alt="Main Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Upload Detail Images
          </label>
          <input
            type="file"
            required
            accept="image/*"
            multiple
            onChange={handleDetailImagesChange}
            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {detailImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={300}
                height={300}
                alt={`Detail Preview ${index + 1}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Product Discription
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Discription
                </label>
                {textAreas.map((_, index) => (
                  <textarea
                    key={index}
                    required
                    rows={6}
                    placeholder={`Add ${index + 1} Para description`}
                    className="mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                ))}
                <button
                  onClick={handleAddMore}
                  className="mt-2 rounded-md bg-primary px-4 py-2 text-white"
                  type="button"
                >
                  Add More
                </button>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Add Shiping and Product detail in one Line
                </label>
                {points.map((_, index) => (
                <input
                key={index}
                required
                  type="text"
                  placeholder="Add shiping detail or ploicies"
                  className="w-full rounded-lg border-[1.5px] mb-2 border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ))}
                <button onClick={handlepoint} type="button" className="mt-2 rounded-md bg-primary px-4 py-2 text-white">
                  Add More
                </button>
              </div>

              {/* 
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Disabled textarea
                </label>
                <textarea
                  rows={6}
                  disabled
                  placeholder="Disabled textarea"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                ></textarea>
              </div> */}
            </div>
          </div>

          {/* <!-- Checkbox and radio --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Checkbox and radio
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <CheckboxOne />
              <CheckboxTwo />
              <CheckboxThree />
              <CheckboxFour />
              <CheckboxFive />
            </div>
          </div> */}

          {/* <!-- Select input --> */}
          {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Select input
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <SelectGroupTwo />
              <MultiSelect id="multiSelect" />
            </div>
          </div> */}
          
          <div className="flex justify-between mt-4">
          <input type="reset" placeholder="Reset form" className="rounded-md bg-primary px-4 py-2 text-white" />
                <input type="submit" placeholder="Upload" className="rounded-md bg-primary px-4 py-2 text-white" />
              </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
