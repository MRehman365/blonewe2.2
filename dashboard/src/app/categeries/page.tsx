"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addCategory, deleteCategory, fetchCategories } from "@/store/reducers/categoriesReducer";
import { toast } from "react-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const Categories = () => {
  const { categories } = useSelector((state: RootState) => state.category);

  const [name, setName] = useState("");
  const [image, setMainImage] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Upload the image to ImgBB
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=18e63ff899cb908d823daa101c023095`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data && data.data && data.data.url) {
        setMainImage(data.data.url); // Set the image URL from ImgBB
      } else {
        console.error("Invalid ImgBB response:", data);
        toast.error("Failed to upload image to ImgBB.");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      toast.error("Failed to upload image to ImgBB.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) {
      toast.error("Please provide all required fields.");
      return;
    }

    const categoryData = {
      name,
      image, // This is the ImgBB URL
    };

    // Dispatch the addCategory action
    dispatch(addCategory(categoryData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
        setName(""); // Reset the name field
        setMainImage(null); // Reset the image field
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  const handleDelete = async (id) => {
   await dispatch(deleteCategory(id)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast.error(res.payload.message);
      }
    });

    dispatch(fetchCategories());

  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />

      <form className="grid min-h-[80vh] grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Category
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Category Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
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
                {image && (
                  <div className="mt-3">
                    <Image
                      width={300}
                      height={300}
                      src={image}
                      alt="Main Preview"
                      className="h-32 w-32 rounded-md object-cover"
                    />
                  </div>
                )}
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
              {categories.category &&
                categories.category.map((tag, index) => (
                  <div key={index} className="flex w-full justify-between">
                    <div>{index + 1}</div>
                    <div>
                      <Image
                        src={tag.image}
                        alt="image"
                        height={50}
                        width={50}
                        className="object-cover"
                      />
                    </div>
                    <p>{tag.name}</p>
                    <div>
                      <RiDeleteBin6Line
                        className="size-5 cursor-pointer text-red-500"
                        onClick={() => handleDelete(tag._id)}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <input
              type="reset"
              placeholder="Reset form"
              className="rounded-md bg-primary px-4 py-2 text-white"
            />
            <input
              type="submit"
              onClick={handleSubmit}
              placeholder="Upload"
              className="rounded-md bg-primary px-4 py-2 text-white"
            />
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default Categories;