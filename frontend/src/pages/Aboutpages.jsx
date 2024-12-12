import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import '../App.css'; 
import myImage from '../images/Aboutimages/b5f53251-f7ee-4a28-be34-414387c85966.jpeg';


const AboutPages = () => { 
  return (
    
<div >
{/* Main section */}
<div className="overflow-hidden">
  <div className="banner__inner-page">
    {/* Hero Section with Background Gradient */}
    <div className="relative w-full h-[455px] bg-gradient-to-r from-gray-900 to-blue-800 opacity-85">
      
    {/* Heading with Fade-in Effect */}
<div className="absolute top-1/2 left-[15rem] transform -translate-y-1/2 z-10">
  <h2 className="text-white text-4xl sm:text-[calc(1.325rem+0.9vw)] font-bold mb-2 animate-fadeInUp">
    About Us
  </h2>
</div>

{/* Breadcrumbs below the heading */}
<div className="absolute top-[calc(50%+2rem)] left-[15rem] z-10">
  <p className="text-xl text-gray-300">
    <span>Home</span> &gt;&gt; <span>About Us</span>
  </p>
</div>


      {/* Image with subtle scaling effect on the left side */}
      <div className="absolute left-0 top-2/3 transform -translate-y-1/2 z-10">
        <img className="sway_scale" src={require('../images/Aboutimages/inner-banner-shape2.png')}alt=""  />
   
      </div>
      <div className="absolute left-0 top-1/2">
      <img className="sway_scale h-[224px]"  src={require('../images/Aboutimages/inner-banner-shape1.png')} alt=" " />
      </div>
     

      {/* Image with sway animation on the right side */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <img className="sway_animationX" src={require('../images/Aboutimages/inner-banner-shape3.png')} alt="" />
      </div>

    </div>
  </div>


{/* Style Section */}
<style jsx>{`
  /* Subtle Scale Animation */
  .sway_scale {
    animation: scaleBreath 6s ease-in-out infinite;
  }

  @keyframes scaleBreath {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05); /* Slightly scale up */
    }
  }

  /* Sway Animation */
  .sway_animationX {
    animation: swayX 3s ease-in-out infinite;
  }

  @keyframes swayX {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-10px); /* Slight left shift */
    }
    100% {
      transform: translateX(0);
    }
  }
`}</style>



        <div
  className="mb-4 flex rounded-sm items-center h-52 sm:h-96 md:h-[40rem] justify-center w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${myImage})` }}
></div>

        {/* Content Section */}
        <div id="2" className="lg:px-20 lg:flex my-24 sm:mx-4 overflow-hidden">
        <div className="w-full lg:w-1/2 px-4 mt-6 lg:mt-0">
  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
    Welcome To Welfare Organization
    <span> Established Since 2015</span>
  </h3>
  <p className="mt-4 text-sm sm:text-md md:text-lg text-black leading-relaxed font-medium">
    The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.
    On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
  </p>
</div>

          <div className="lg:w-1/2 px-4 relative group overflow-hidden rounded-lg">
  {/* <!-- Image --> */}
  <img
    className="w-full rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110 h-[393px] w-[610px]"
    
    src={require('../images/Aboutimages/two-people-shaking-hands-with-one-another-that-has-word-it_1115474-124534.jpg')}
    alt="About us"
  />

  {/* <!-- Blue Overlay Animation --> */}
  <div
    className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-80 group-hover:translate-y-0 translate-y-full transition-all duration-500 ease-in-out"
  ></div>

  {/* <!-- Text Overlay --> */}
  <div className="absolute inset-0 flex items-end p-6 opacity-100 text-white">
    <div className="text-left">
      <h2 className="text-2xl font-bold"></h2>
      <p className="text-lg font-bold"></p>
    </div>
  </div>
</div>


        </div>

        {/* Content Section part 2*/}
        <div id="2" className="lg:px-20 lg:flex my-24 sm:mx-4 overflow-hidden">
        <div className="lg:w-1/2 px-4 relative group overflow-hidden rounded-lg">
  {/* Image */}
  <img
    className="w-full rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110"
    src={require('../images/Aboutimages/img2 - Copy.jpg')}
    alt="About us"
  />

  {/* Blue Gradient Overlay */}
  <div
    className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-80 group-hover:translate-y-0 translate-y-full transition-all duration-500 ease-in-out"
  ></div>

  {/* Text Overlay */}
  <div className="absolute inset-0 flex items-end p-6 text-white">
    <div className="text-left">
      
      <p className="text-lg"></p>
    </div>
  </div>
</div>

<div className="w-full lg:w-1/2 px-4 mt-6 lg:mt-0">
  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
    Our Vision
  </h3>
  <p className="mt-4 text-sm sm:text-md md:text-lg text-black leading-relaxed font-medium">
    To create a world where all individuals have equal access to basic human rights, education, healthcare, and opportunities for sustainable livelihoods. We envision empowered communities working together to overcome poverty, injustice, and environmental degradation, fostering a global society built on dignity, equality, and compassion.
  </p>
</div>

        </div>

        {/* added image with text overlay */}
        <div className="relative mx-3">
          <img
            className="mx-auto rounded-md w-full h-[300px] object-cover"
            src={require('../images/Aboutimages/20fe6b303aaaba2c345f3bc1ef88921f - Copy.jpeg')}
            alt=""
          />

        
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center text-white px-4 max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] z-10 overflow-hidden">
            <h1 className="text-base sm:text-lg md:text-2xl font-bold mb-2 leading-snug">
              Join Us
            </h1>
            <p className="text-xs sm:text-sm md:text-base mb-4 leading-relaxed ">
              EVERY donation, no matter how modest, has the remarkable power to
              create a ripple effect of change. So, the hesitation to donate,
              even if a small donation, to causes we care about often with the
              feeling that it may not be able to make a meaningful impact is
              incorrect.
            </p>
            <button className="relative overflow-hidden bg-blue-500 text-white px-3 py-2 rounded-md text-xs sm:text-sm md:text-base transition-all duration-500 ease-in-out group">
  <span className="relative z-10">Donate Now</span>

  {/* Top-to-Bottom Animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-500 ease-in-out before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-black before:transform before:translate-y-full before:transition-all before:duration-500 before:ease-in-out group-hover:before:translate-y-0"></div>

  {/* Bottom-to-Top Animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 group-hover:-translate-y-full transition-all duration-500 ease-in-out after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-black after:transform after:-translate-y-full after:transition-all after:duration-500 after:ease-in-out group-hover:after:translate-y-0"></div>
</button>

            
          </div>
        </div>

        {/* added image and form section */}

        <div className="flex flex-col md:flex-row m-3 " >
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center relative group overflow-hidden rounded-lg">
    {/* Image */}
    <img
      className="w-full h-full md:h-auto rounded-md m-3 object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
      src={require('../images/Aboutimages/Pixabay-2808899 - Copy.jpg')}
      alt=""
    />

    {/* Blue Overlay Animation */}
    <div
      className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 group-hover:opacity-80 group-hover:translate-y-0 translate-y-full transition-all duration-500 ease-in-out"
    ></div>

    {/* Text Overlay */}
    <div className="absolute inset-0 flex items-end p-6 opacity-100 text-white">
      <div className="text-left">
        <h2 className="text-2xl font-bold"></h2>
        <p className="text-lg font-bold"></p>
      </div>
    </div>
  </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 sm:ml-2 flex flex-col justify-center mr-[10px]" >
            <div className="text-center pb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-black mb-[10px]" >
                Any Suggestion for us
              </h1>
            </div>
            <div className="border shadow-md rounded-xl">
              <form className="flex flex-col p-3">
                <label className="mb-2 font-semibold text-black">Name</label>
                <input
                  className="mb-4 p-2 border border-gray-300 rounded-lg"
                  type="text"
                  placeholder="Name..."
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  }} 
                  style={{borderColor:"black"}}
                />
                <label className="mb-2 font-semibold text-black">Email</label>
                <input
                  className="mb-4 p-2 border border-gray-300 rounded-lg"
                  required
                  type="email"
                  placeholder="Email..."
                  style={{borderColor:"black"}}
                />
                <label className="mb-2 font-semibold text-black">Suggestion</label>
                <input
                  className="mb-4 p-2 border rounded-lg
                   border-gray-300"
                  required
                  placeholder="Your suggestion..."
                  style={{borderColor:"black"}}
                />
               <button className="relative overflow-hidden bg-blue-500 text-white px-3 py-2 rounded-md text-xs sm:text-sm md:text-base transition-all duration-500 ease-in-out group">
  <span className="relative z-10">Submit</span>

  {/* Top-to-Bottom Animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 group-hover:translate-y-full transition-all duration-500 ease-in-out before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-black before:transform before:translate-y-full before:transition-all before:duration-500 before:ease-in-out group-hover:before:translate-y-0"></div>

  {/* Bottom-to-Top Animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 group-hover:-translate-y-full transition-all duration-500 ease-in-out after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-black after:transform after:-translate-y-full after:transition-all after:duration-500 after:ease-in-out group-hover:after:translate-y-0"></div>
</button>

              </form>
            </div>
          </div>
        </div>

        {/* added reviews Section */}
        <div className="px-3 border border-blue-900 rounded-xl pt-3 my-2 mx-3">
          <div
            id="4"
            className="lg:px-20 text-center flex flex-col items-center mx-4 overflow-hidden"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 capitalize">
              LATEST DONATIONS
            </h3>
          </div>
          <div
            id="5"
            className="lg:px-20 flex flex-col md:flex-row justify-evenly gap-6 my-10 mx-4 overflow-hidden "
          >
                 <div className="relative group flex flex-col items-center bg-blue-100 mb-8 shadow-md rounded-lg p-6 overflow-hidden">
  {/* Image */}
  <img
    className="w-16 h-16 rounded-full mr-2 mb-4"
    src={require('../images/Aboutimages/ebf77b2941895740c6837470593cc2d4 - Copy.png')}
    alt="Himanshu"
  />

  {/* Text content */}
  <div className="flex flex-col items-center text-center justify-center relative z-10">
    <p className="text-xl font-bold">Jonaki</p>
    <p className="font-semibold">
      Donated <span className="text-blue-400">₹500</span> for food of Childrens
    </p>
    <Link className="text-blue-400 pt-2 flex items-center">
      Donate Now <span className="text-sm"><IoIosArrowForward /></span>
    </Link>
  </div>

  {/* Black horizontal line animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 group-hover:translate-x-0 transform -translate-x-full transition-all duration-500 ease-in-out"></div>
</div>

            <div className="relative group flex flex-col items-center bg-blue-100 mb-8 shadow-md rounded-lg p-6 overflow-hidden">
  {/* Image */}
  <img
    className="w-16 h-16 rounded-full mr-2 mb-4"
    src={require('../images/Aboutimages/1674fcaa833e1b51f0c1d1da781564ff - Copy.png')}
    alt="Himanshu"
  />

  {/* Text content */}
  <div className="flex flex-col items-center text-center justify-center relative z-10">
    <p className="text-xl font-bold">Chinnu</p>
    <p className="font-semibold">
      Donated <span className="text-blue-400">₹500</span> for food of Childrens
    </p>
    <Link className="text-blue-400 pt-2 flex items-center">
      Donate Now <span className="text-sm"><IoIosArrowForward /></span>
    </Link>
  </div>

  {/* Black horizontal line animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 group-hover:translate-x-0 transform -translate-x-full transition-all duration-500 ease-in-out"></div>
</div>


<div className="relative group flex flex-col items-center bg-blue-100 mb-8 shadow-md rounded-lg p-6 overflow-hidden">
  {/* Image */}
  <img
    className="w-16 h-16 rounded-full mr-2 mb-4"
    src={require('../images/Aboutimages/7daf15f4edf74a94bb33984f8d0fd58c - Copy.png')}
    alt="Himanshu"
  />

  {/* Text content */}
  <div className="flex flex-col items-center text-center justify-center relative z-10">
    <p className="text-xl font-bold">Vishnu</p>
    <p className="font-semibold">
      Donated <span className="text-blue-400">₹500</span> for food of Childrens
    </p>
    <Link className="text-blue-400 pt-2 flex items-center">
      Donate Now <span className="text-sm"><IoIosArrowForward /></span>
    </Link>
  </div>

  {/* Black horizontal line animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 group-hover:translate-x-0 transform -translate-x-full transition-all duration-500 ease-in-out"></div>
</div>

<div className="relative group flex flex-col items-center bg-blue-100 mb-8 shadow-md rounded-lg p-6 overflow-hidden">
  {/* Image */}
  <img
    className="w-16 h-16 rounded-full mr-2 mb-4"
    src={require('../images/Aboutimages/915faaa925d39a5e726e94e0fc15a069 - Copy.png')}
    alt="Himanshu"
  />

  {/* Text content */}
  <div className="flex flex-col items-center text-center justify-center relative z-10">
    <p className="text-xl font-bold">Shruthi</p>
    <p className="font-semibold">
      Donated <span className="text-blue-400">₹500</span> for food of Childrens
    </p>
    <Link className="text-blue-400 pt-2 flex items-center">
      Donate Now <span className="text-sm"><IoIosArrowForward /></span>
    </Link>
  </div>

  {/* Black horizontal line animation */}
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 group-hover:translate-x-0 transform -translate-x-full transition-all duration-500 ease-in-out"></div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPages;