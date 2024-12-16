import React, { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import Gallery from "../components/Gallery";
import api from "../api/api";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/frontendImages/", {
          params: {
            pagename: "gallery",
          },
        });
        console.log("response",response);

        // Assuming the API returns an array of image objects
        // with properties like src, alt, caption
        if (response.data.data && Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else {
          setError("Invalid image data received");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []); // Empty dependency array means this runs once on component mount

  if (isLoading) {
    return <div className="text-center py-10">Loading images...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="App bg-colo1 min-h-screen w-full">
      {images.length > 0 && (
        <>
          <Slideshow imageList={images} />
          <Gallery images={images} />
        </>
      )}
      {images.length === 0 && (
        <div className="text-center py-10">No images available</div>
      )}
    </div>
  );
};

export default GalleryPage;