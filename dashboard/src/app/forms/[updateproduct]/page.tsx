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
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useSearchParams } from "next/navigation";
import { getProducts, updateProduct } from "@/store/reducers/productReducer";
import { fetchCategories } from "@/store/reducers/categoriesReducer";
import { toast } from "react-toast";

const FormElements = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  console.log('ID:', id);
const { products } = useSelector((state: RootState) => state.products)
const { categories } = useSelector((state: RootState) => state.category);
  const [formData, setFormData] = useState({
    name: "",
    store: "",
    category: "",
    price: "",
    discount: "",
    tags: "",
    sku: "",
    description: "",
    points: [""],
    image: [],
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const data = Array.isArray(categories)
    ? categories
    : categories?.category || [];

  // Ensure products is an array
const menu = Array.isArray(products) ? products : (products?.menu || []); 
useEffect(() => {
    const product = menu.find((item) => item._id === id);
    if (product) {
      setFormData({
        name: product.name || "",
        store: product.store || "",
        category: product.category || "",
        price: product.price || "",
        discount: product.discount || "",
        tags: product.tags || "",
        sku: product.sku || "",
        description: product.description || "",
        points: product.points || [""],
        image: product.image || [],
      });
    }
  
}, [products, id]);

// console.log(formData, 'product');

const handleDetailImagesChange = (e) => {
  const files = Array.from(e.target.files);

  // Convert files to URLs
  const newImageUrls = files.map((file) => URL.createObjectURL(file));

  setFormData((prevData) => {
    const updatedImages = [...prevData.image, ...newImageUrls];

    // Remove duplicates (if any)
    const uniqueImages = Array.from(new Set(updatedImages));

    return {
      ...prevData,
      image: uniqueImages, // Update with unique images
    };
  });
};




  const handleAddMore = () => {
    setFormData((prevData) => ({
      ...prevData,
      points: [...prevData.points, ""], // Add new empty string to points array
    }));
  };
  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value; 
    setFormData({ ...formData, points: newPoints });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !formData) {
      console.error('ID or formData is missing');
      return;
    }

    dispatch(updateProduct({ id, formData })).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast(res.payload.message);
      }
    });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Product" />

      <form className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Product
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  value={formData.store}
                  onChange={(e) =>
                    setFormData({ ...formData, store: e.target.value })
                  }
                  required
                  placeholder="Add Store name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

         
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Categories
                </label>
                <select
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={formData.category} // Bind the value to formData.category
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  } // Handle changes here
                >
                  <option value="">Select Category</option>
                  {data.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
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
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
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
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
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
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  required
                  placeholder="SKU"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Upload Image
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Upload Detail Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  multiple
                  onChange={handleDetailImagesChange}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
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
                Product Discription
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Discription
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder={`Add Para description`}
                  className="mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Add Shiping and Product detail in one Line
                </label>
                {formData.points.map((point, index) => (
                  <div key={index} className="mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      placeholder="Add shipping detail or policies"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddMore}
                  type="button"
                  className="mt-2 rounded-md bg-primary px-4 py-2 text-white"
                >
                  Add More
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
          <button type="reset" className="rounded-md bg-primary px-4 py-2 text-white">Reset form</button>
                <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white" onClick={handleSubmit}>Upload</button>
              </div>
        </div>
      </form>
      </DefaultLayout>
  );
};

export default FormElements;
