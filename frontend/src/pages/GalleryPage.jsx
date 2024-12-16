import React from "react";
import Slideshow from "../components/Slideshow";
import Gallery from "../components/Gallery";

const images = [
  { src: 'Images/Img1.jpg', alt: "Image 1", caption: "Image1" },
  { src: 'Images/Img2.jpg', alt: "Image 2", caption: "Image2" },
  { src: 'Images/Img3.avif', alt: "Image 3", caption: "Image3" },
  { src: 'Images/Img4.jpg', alt: "Image 4", caption: "Image4" },
  { src: 'Images/Img5.jpg', alt: "Image 5", caption: "Image5" },
  { src: 'Images/Img6.jpg', alt: "Image 6", caption: "Image6" },
  { src: 'Images/Img7.jpg', alt: "Image 7" , caption: "Image7"},
  { src: 'Images/Img8.jpg', alt: "Image 8", caption: "Image8" },
  { src: 'Images/Img9.jpg', alt: "Image 9", caption: "Image9" },
  { src: 'Images/Img10.jpg', alt: "Image 10", caption: "Image10"  },
  { src: 'Images/Img11.webp', alt: "Image 11" , caption: "Image11" },
  { src: 'Images/Img12.jpg', alt: "Image 12", caption: "Image12"  },
  { src: 'Images/Img13.webp', alt: "Image 13" , caption: "Image13" },
  { src: 'Images/Img14.webp', alt: "Image 14" , caption: "Image14" },
  { src: 'Images/Img15.jpg', alt: "Image 15" , caption: "Image15" },
  { src: 'Images/Img16.jpg', alt: "Image 16" , caption: "Image16" },
  { src: 'Images/Img17.png', alt: "Image 17" , caption: "Image17" },
  { src: 'Images/Img18.jpg', alt: "Image 18" , caption: "Image18" },
  { src: 'Images/Img19.jpg', alt: "Image 19" , caption: "Image19" },
  { src: 'Images/Img20.jpg', alt: "Image 20" , caption: "Image20" },
  { src: 'Images/Img21.png', alt: "Image 21" , caption: "Image21" },
  { src: 'Images/Img22.jpeg', alt: "Image 22" , caption: "Image22" },
  { src: 'Images/Img23.jpg', alt: "Image 23" , caption: "Image23" },
  { src: 'Images/Img24.jpg', alt: "Image 24" , caption: "Image24" }
  
];

const GalleryPage = () => {
  return (
    <div className="App bg-colo1 min-h-screen w-full">
      <Slideshow imageList={images} />
      <Gallery images={images} />
    </div>
  );
};

export default GalleryPage;