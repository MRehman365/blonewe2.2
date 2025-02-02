"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "react-toast";
import { addOrUpdateBanner, fetchBanners } from "@/store/reducers/bannerReducer";

const Categories = () => {
    const { banner } = useSelector((state: RootState) => state.banner)
  const dispatch = useDispatch<AppDispatch>();

  // State for single images
  const [mainbanner, setMainBanner] = useState<string[]>([]);
  const [thirdbanner, setThirdBanner] = useState<string | null>(null);

  // State for multiple images
  const [secondbanner, setSecondBanner] = useState<string[]>([]);
  const [fourthbanner, setFourthBanner] = useState<string[]>([]);
  const [fifthbanner, setFifthBanner] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBanners())
  }, [dispatch])

  const data = Array.isArray(banner) ? banner : banner?.banners || [];
console.log(data, 'banner');

  const uploadImage = async (file: File, multiple: boolean = false, setState: Function) => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=18e63ff899cb908d823daa101c023095`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.data?.url) {
        if (multiple) {
          setState((prev: string[]) => [...prev, data.data.url]); // Add new image to array
        } else {
          setState(data.data.url); // Set single image
        }
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bannerData = {
      mainbanner,
      secondbanner,
      thirdbanner,
      fourthbanner,
      fifthbanner,
    };

    dispatch(addOrUpdateBanner(bannerData)).then((res) => {
      if (res?.payload?.success) {
        toast.success(res.payload.message);
        resetForm();
      } else {
        toast.error(res.payload.message);
      }
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      const bannerData = data[0]; // Assuming only one banner object exists
      setMainBanner(bannerData.mainbanner || []);
      setSecondBanner(bannerData.secondbanner || []);
      setThirdBanner(bannerData.thirdbanner || null);
      setFourthBanner(bannerData.fourthbanner || []);
      setFifthBanner(bannerData.fifthbanner || null);
    }
  }, [data]);
  

  const resetForm = () => {
    setMainBanner([]);
    setSecondBanner([]);
    setThirdBanner(null);
    setFourthBanner([]);
    setFifthBanner(null);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Banners" />
      <form onSubmit={handleSubmit} className="grid min-h-[80vh] grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">

          {/* Third Banner */}
          <div className="border border-stroke p-6 bg-white dark:bg-boxdark shadow-md">
            <h3 className="font-medium text-black dark:text-white mb-4">Third Banner</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files![0], false, setThirdBanner)}
            />
            {thirdbanner && <Image src={thirdbanner} alt="Third Banner" width={150} height={150} />}
          </div>
          {/* Third Banner */}
          <div className="border border-stroke p-6 bg-white dark:bg-boxdark shadow-md">
            <h3 className="font-medium text-black dark:text-white mb-4">Fifth Banner</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files![0], false, setFifthBanner)}
            />
            {fifthbanner && <Image src={fifthbanner} alt="Third Banner" width={150} height={150} />}
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* Multiple Image Upload Components */}
          {[
            { title: "Slider Banner", state: mainbanner, setState: setMainBanner },
            { title: "Second Banner", state: secondbanner, setState: setSecondBanner },
            { title: "Fourth Banner", state: fourthbanner, setState: setFourthBanner },
          ].map(({ title, state, setState }) => (
            <div key={title} className="border border-stroke p-6 bg-white dark:bg-boxdark shadow-md">
              <h3 className="font-medium text-black dark:text-white mb-4">{title}</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => Array.from(e.target.files!).forEach((file) => uploadImage(file, true, setState))}
              />
              <div className="flex gap-2 mt-3">
                {state.map((img, index) => (
                  <div key={index} className="relative">
                    <Image src={img} alt={title} width={100} height={100} />
                    <button
                      type="button"
                      onClick={() => setState((prev: string[]) => prev.filter((_, i) => i !== index))}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <button type="reset" onClick={resetForm} className="rounded-md bg-gray-400 px-4 py-2 text-white">
              Reset
            </button>
            <button type="submit" className="rounded-md bg-primary px-4 py-2 text-white">
              Upload
            </button>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default Categories;
