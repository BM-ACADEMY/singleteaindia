import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
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
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{franchise.title}</h1>

      {/* Images with LightGallery */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Franchise Images</h2>

        {franchise.images_url && franchise.images_url.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {franchise.images_url.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className="relative block overflow-hidden rounded-lg cursor-pointer group hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <img
                      src={img}
                      alt={`${franchise.title}-${index}`}
                      className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-80"
                    />
                    {index === 2 && franchise.images_url.length > 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          +{franchise.images_url.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
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
                  data-sub-html={`<h4>${franchise.title}</h4><p>Image ${index + 1}</p>`}
                >
                  <img src={img} alt={`hidden-${index}`} />
                </a>
              ))}
            </LightGallery>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-lg">
            <p className="text-gray-500">No images available for this franchise</p>
          </div>
        )}
      </div>

      {/* Contents */}
      <div className="space-y-6">
        {franchise.contents?.map((section, i) => (
          <div key={i}>
            <h2 className="text-xl font-semibold text-orange-600">{section.heading}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      {franchise.location_map_url && (
        <div className="mt-10">
          <iframe
            src={franchise.location_map_url}
            title="Franchise Location"
            className="w-full h-96 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      )}
      
    </div>
  );
};

export default FranchiseDetail;
