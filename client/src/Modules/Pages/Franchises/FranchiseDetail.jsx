import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { FiImage, FiMapPin, FiFileText } from "react-icons/fi";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";

const FranchiseDetail = () => {
  const { id } = useParams();
  const [franchise, setFranchise] = useState(null);
  const lightGalleryRef = useRef(null);

  useEffect(() => {
    const fetchFranchise = async () => {
      try {
        const res = await axiosInstance.get(`/franchises/${id}`);
        setFranchise(res.data);
      } catch (err) {
        console.error("Error fetching franchise details:", err.message);
      }
    };
    fetchFranchise();
  }, [id]);

  const handleImageClick = (index) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index);
    }
  };

  if (!franchise) return <p className="text-center py-10">Loading...</p>;

  return (

    <div className="bg-[#fbece8]">

       <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Page Title */}
      <h1 className="text-5xl pt-14 font-extrabold text-gray-900 text-center mb-12 tracking-tight">
        {franchise.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Images Section */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FiImage className="text-orange-500" /> Franchise Gallery
            </h2>

            {franchise.images_url && franchise.images_url.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {franchise.images_url.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl cursor-pointer group shadow-sm hover:shadow-lg transition-all"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={img}
                        alt={`${franchise.title}-${index}`}
                        className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
                      />
                      {index === 2 && franchise.images_url.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">
                            +{franchise.images_url.length - 3} more
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hidden LightGallery */}
                <LightGallery
                  ref={lightGalleryRef}
                  onInit={(detail) => {
                    lightGalleryRef.current = detail.instance;
                  }}
                  elementClassNames="hidden"
                  speed={500}
                  plugins={[lgThumbnail]}
                >
                  {franchise.images_url.map((img, index) => (
                    <a
                      key={index}
                      href={img}
                      data-sub-html={`<h4>${franchise.title}</h4><p>Image ${
                        index + 1
                      }</p>`}
                    >
                      <img src={img} alt={`hidden-${index}`} />
                    </a>
                  ))}
                </LightGallery>
              </>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <p className="text-gray-500">
                  No images available for this franchise
                </p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FiFileText className="text-orange-500" /> Franchise Details
            </h2>
            {franchise.contents?.map((section, i) => (
              <div
                key={i}
                className="p-3  transition"
              >
                <h3 className="text-lg font-semibold text-orange-600">
                  {section.heading.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Map */}
        {franchise.location_map_url && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-800 p-6 flex items-center gap-2 border-b border-gray-100">
                <FiMapPin className="text-orange-500" /> Location
              </h2>
              <div className="w-full h-96">
                <iframe
                  src={franchise.location_map_url}
                  title="Franchise Location"
                  className="w-full h-full rounded-b-2xl"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
   
  );
};

export default FranchiseDetail;
