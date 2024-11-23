import React, { useEffect } from 'react'
import DonateForm from '../Components/DonateForm';
import "../../public/css/donate.css"
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const DonatePage = () => {

    useEffect(() => {
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
                    start: "top 70%",
                    end: "top 50%",
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
                    start: "top 70%",
                    end: "top 50%",
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


    return (
        <div className='bg-purple-50 min-h-screen'>
            <div className='pb-4 relative'>
                <img src="../../public/images/DonateImg/heroDonate.jpg" className=' max-h-[450px] w-screen opacity-85' alt="Donate Hero Image" />
                <div className=' text-center text-4xl font-semibold py-3 absolute inset-0 flex justify-center items-center '>
                    <p className=' text-6xl text-[#281d77]  heading text-container' >Donate Some Happiness</p>
                </div>
            </div>
            <p className='  text-center px-20 text-container'>
                Join us in making a lasting impact! Your generous donations to RenuHealthcare enable us to deliver essential healthcare services, social initiatives, and
                educational programs to underserved communities. Together, we can create a healthier, more compassionate world.
            </p>
            <h2 className=' text-4xl font-semibold text-center pt-8 pb-2 text-container'>Show Your Support</h2>
            <p className=' text-center pb-2 text-container'>Fill the following details to provide your support for the cause</p>
            <div>
                <div className="flex flex-col lg:flex-row justify-center lg:items-center gap-3 lg:gap-8 ml-6 lg:ml-0 py-5 pb-14 text-container">
                    <div className="flex justify-start lg:justify-center items-center gap-4">
                        <MdOutlineLocationOn className="text-[#281d77] text-3xl" />
                        <div>
                            <p>Address</p>
                            <p className="text-[16px] font-bold">
                                Gurugram, Haryana - 122503, India
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-start lg:justify-center items-center gap-4">
                        <IoCallOutline className="text-[#281d77] text-3xl" />
                        <div>
                            <p>Call Us</p>
                            <p className="text-[16px] font-bold">+91-01234567890</p>
                        </div>
                    </div>
                    <div className="flex justify-start lg:justify-center items-center gap-4">
                        <FiMail className="text-[#281d77] text-3xl" />
                        <div>
                            <p>Email Us</p>
                            <p className="text-[16px] font-bold">info@renuhealthcare.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' flex items-center justify-center px-16 w-screen '>
                <div className=' left-animated'>
                    <DonateForm />
                </div>
                <div className=' w-[60%]  right-animated '>
                    <img src="../../public/images/DonateImg/donate1.jpg" alt="Donate Image" className=' mx-7 rounded-lg' />
                </div>
            </div>

        </div>
    )
}

export default DonatePage
