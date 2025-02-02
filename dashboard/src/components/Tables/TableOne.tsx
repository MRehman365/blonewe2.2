"use client";
import { getBlogs, deleteBlog } from "@/store/reducers/blogReducer";
import { AppDispatch, RootState } from "@/store/store";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toast";


const TableOne = () => {
  const { blogs } = useSelector((state: RootState) => state.blogs);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const blog = Array.isArray(blogs) ? blogs : blogs?.blog || [];

  const deleteBlogs = (id) => {
    dispatch(deleteBlog(id)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
      } else {
        toast(res.payload.message);
      }
    });
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Blogs
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Blog
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Store
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Categories
            </h5>
          </div>
          {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div> */}
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {blog.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === blog.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* <Image
                  src={`${brand?.images[0]}`}
                  alt="Brand"
                  width={48}
                  height={48}
                /> */}
              </div>

              <p className="hidden text-black dark:text-white sm:block">
                {brand.title}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.store}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.category}</p>
            </div>

            {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales}</p>
            </div> */}

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button className="rounded bg-red-500 px-3 py-1 text-white" onClick={() => deleteBlogs(brand._id)}>
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
