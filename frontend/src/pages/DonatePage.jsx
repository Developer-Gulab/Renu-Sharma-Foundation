import React, { useEffect, useRef } from 'react'
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DonateForm from '../components/DonateForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
gsap.registerPlugin(ScrollTrigger)

const DonatePage = () => {
    const donateImg = useRef(null);

    useEffect(() => {
        const isSmallWidth = window.innerWidth <= 768;
        const startValue = isSmallWidth ? "top 90%" : "top 85%";
        const endValue = isSmallWidth ? "top 60%" : "top 50%";
        gsap.fromTo(".left-animated", {
            x: "-200px",
            opacity: 0
        },
            {
                x: "0px",
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".left-animated",
                    scroller: "body",
                    start: startValue,
                    end: endValue,
                    scrub: 3,
                }
            }
        )

        gsap.fromTo(".right-animated", {
            x: "200px",
            opacity: 0
        },
            {
                x: "0px",
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".right-animated",
                    scroller: "body",
                    start: startValue,
                    end: endValue,
                    scrub: 3,
                }
            }
        )

        gsap.utils.toArray(".text-container").forEach((container) => {
            gsap.fromTo(container, {
                opacity: 0,
                y: "30px"
            },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    y: "0px",
                    scrollTrigger: {
                        trigger: container,
                        scroller: "body",
                        start: "top 90%",
                        end: "top 50%"
                    }
                }
            )
        })

    }, [])


    useEffect(() => {
        const imgArray = ["/assets/images/DonateImg/donate1.jpg", "/assets/images/DonateImg/donate2.jpeg", "/assets/images/DonateImg/donate3.jpg", "/assets/images/DonateImg/donate4.jpg"];
        let i = 0;

        //Dynamically change image using setInterval();
        const interval = setInterval(() => {
            if (donateImg.current) {
                donateImg.current.src = imgArray[i];
                i = (i + 1) % imgArray.length;
            }
        }, 5000);

        //Cleanup on component unmount
        return () => clearInterval(interval);
    }, [])



    return (
        <>
            <Navbar />
            <div className='bg-purple-50 min-h-screen pb-28 w-screen overflow-hidden'>
                <div className='pb-4 relative'>
                    <img src="/assets/images/DonateImg/heroDonate.jpg" className=' max-h-[450px] max-w-screen w-screen opacity-85 z-10' alt="Donate Hero Image" />
                    <div className=' text-center text-4xl font-semibold py-3 absolute inset-0 flex justify-center items-center '>
                        <p className=' text-3xl md:text-5xl lg:text-6xl text-white heading-shadow text-container p-1 bg-blue-700 rounded-sm ' >Donate Some Happiness</p>
                    </div>
                </div>
                <p className='  text-center lg:px-20 px-2 text-container'>
                    Join us in making a lasting impact! Your generous donations to RenuHealthcare enable us to deliver essential healthcare services, social initiatives, and
                    educational programs to underserved communities. Together, we can create a healthier, more compassionate world.
                </p>
                <h2 className=' text-3xl lg:text-4xl font-semibold text-center pt-8 pb-2 text-container'>Show Your Support</h2>
                <p className=' text-center pb-2 text-container px-2'>Fill the following details to provide your support for the cause</p>
                <div>
                    <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-3 lg:gap-8 ml-6 lg:ml-0 py-5 pb-14 text-container">

                        <a
                            href="https://www.google.com/maps/place/Haryana+122503/@28.3386399,76.7234886,12z/data=!3m1!4b1!4m6!3m5!1s0x390d40ee40f61ae9:0x7f08a0051c808b89!8m2!3d28.3308988!4d76.8028933!16s%2Fg%2F11_txzrjy?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            className=" "
                        >
                            <div className="flex justify-start lg:justify-center items-center gap-4">
                                <MdOutlineLocationOn className="text-[#281d77] text-3xl" />
                                <div>
                                    <p>Address</p>
                                    <p className="text-[16px] font-bold">
                                        Gurugram, Haryana - 122503, India
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="tel:+9101234567890"
                            target="_blank"
                        >
                            <div className="flex justify-start lg:justify-center items-center gap-4">
                                <IoCallOutline className="text-[#281d77] text-3xl" />
                                <div>
                                    <p>Call Us</p>
                                    <p className="text-[16px] font-bold">+91-01234567890</p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="mailto:info@admedusociety.org"
                            target="_blank"
                        >
                            <div className="flex justify-start lg:justify-center items-center gap-4">
                                <FiMail className="text-[#281d77] text-3xl" />
                                <div>
                                    <p>Email Us</p>
                                    <p className="text-[16px] font-bold">info@renuhealthcare.com</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className=' flex flex-col lg:flex-row items-center justify-center lg:px-16 px-3 w-screen gap-5'>
                    <div className=' left-animated order-2 lg:order-1 '>
                        <DonateForm />
                    </div>
                    <div className='w-full md:w-[90%] lg:w-[60%]  right-animated order-1 lg:order-2 overflow-hidden max-h-[80%]'>
                        <img ref={donateImg} src="/assets/images/DonateImg/donate1.jpg" alt="Donate Image" className=' lg:mx-7 rounded-lg ' />
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default DonatePage
