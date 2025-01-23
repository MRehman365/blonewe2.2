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
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { addBlog } from "@/store/reducers/blogReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "react-toast";

const FormElements = () => {
const [formData, setFormData] = useState({
  title: "",
  store: "",
  category: "",
  content: [" "],
})

const dispatch = useDispatch<AppDispatch>();


const handleDetailImagesChange = (e) => {
  const files = Array.from(e.target.files);
  const imageUrls = files.map((file) => URL.createObjectURL(file));
  setFormData((prevData) => ({
    ...prevData,
    images: imageUrls,
  }));
};

const handleContentChange = (index, value) => {
  const newContent = [...formData.content];
  newContent[index] = value; // Update specific point
  setFormData({ ...formData, content: newContent });
};

  const handleUpdateMore = () => {
    setFormData((prevData) => ({
      ...prevData,
      content: [...prevData.content, ""], 
    }));
  }

  const hanldesubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog(formData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast(res.payload.message);
      }
    });
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs" />

      <form className="grid grid-cols-1 gap-9 sm:grid-cols-2"  onSubmit={hanldesubmit}>
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Blog
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  placeholder="Blog Title"
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
                  placeholder="Update Store name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Categories
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  placeholder="Categories"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>
            </div>
          </div>

        

          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Upload Image</h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">

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
        </div>
      </div>
    </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Blog Discription
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Discription
                </label>
                {formData.content.map((_, index) => (
                  <textarea
                    key={index}
                    required
                    rows={6}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                    placeholder={`Update ${index + 1} Para description`}
                    className="mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                ))}
                <button
                  onClick={handleUpdateMore}
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
                <input type="submit" className="rounded-md bg-primary px-4 py-2 text-white"  placeholder="Upload" />
              </div>
        </div>
      </form>
      </DefaultLayout>
  );
};

export default FormElements;
