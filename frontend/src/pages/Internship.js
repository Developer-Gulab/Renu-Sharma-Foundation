import React, { useState, useEffect } from 'react';
import images from '../images/internship.jpeg';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../styles/custom.css'

export default function Internship() {
    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true, 
        });
    }, []);

    const testimonials = [
        {
            text: "The internship program gave me a hands-on experience that helped me gain insights into the industry. The team was incredibly supportive, and I learned more in a few months than I ever expected!",
            author: "Sarah Lee"
        },
        {
            text: "This internship provided me with invaluable experience. The projects I worked on were challenging and rewarding, and I left with a deeper understanding of the field.",
            author: "Michael Jordan"
        },
        {
            text: "I had the opportunity to learn and grow in an environment that fostered creativity and innovation. I now feel prepared to take on the professional world!",
            author: "Emily Davis"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-12">
                <div
                    className="md:w-1/2 text-center md:text-left animate-slideInLeft"
                >
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Join Our Internship Program</h1>
                    <p className="text-lg text-gray-600">
                        Unlock your potential by working on exciting projects. Gain real-world experience, build your skills, and kickstart your career with our internship program.
                    </p>
                    <div className="flex justify-center mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
                            Apply now
                        </button>
                    </div>

                </div>

                <div
                    className="mt-6 md:mt-0 md:w-1/2 flex justify-center animate-slideInRight"
                >
                    <img
                        src={images}
                        alt="Internship"
                        className="w-4/5 md:max-w-xl h-auto rounded-lg"
                    />
                </div>
            </div>


            <section className="mx-auto py-12 px-6 md:px-16">
                <h2
                    className="text-4xl font-semibold text-gray-800 mb-6 text-center"
                    data-aos="fade-up"
                >
                    Why Choose Our Internship Program?
                </h2>
                <p
                    className="text-lg text-gray-700 mb-6 text-justify"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Our internship program is your gateway to professional growth and development. Designed with your career in mind, this program offers a perfect balance of hands-on learning and mentorship. Whether you are a student looking to gain practical experience or a recent graduate ready to start your career, our internship program equips you with the skills and knowledge needed to succeed in the industry.
                </p>
                <h3
                    className="text-xl font-semibold text-gray-800 mb-4"
                    data-aos="fade-left"
                >
                    Key Features of Our Internship Program:
                </h3>
                <ul
                    className="list-disc list-inside text-gray-700 mb-8 space-y-2"
                    data-aos="fade-right"
                >
                    <li>Opportunity to work on real-world projects and challenges.</li>
                    <li>Comprehensive training and mentorship from experienced professionals.</li>
                    <li>Access to industry-standard tools and technologies.</li>
                    <li>Flexible schedules tailored to accommodate your academic or personal commitments.</li>
                    <li>Networking opportunities with experts and fellow interns.</li>
                </ul>
                <h3
                    className="text-xl font-semibold text-gray-800 mb-4"
                    data-aos="fade-left"
                >
                    Who Can Apply?
                </h3>
                <p
                    className="text-lg text-gray-700 mb-6 text-justify"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    We welcome applicants from diverse educational and professional backgrounds. If you are enthusiastic, eager to learn, and passionate about building a career, this program is for you. Whether you are pursuing a degree, a fresh graduate, or someone looking to explore a new field, our doors are open to you.
                </p>
                <h3
                    className="text-xl font-semibold text-gray-800 mb-4"
                    data-aos="fade-right"
                >
                    What Will You Gain?
                </h3>
                <p
                    className="text-lg text-gray-700 mb-6 text-justify"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    As an intern, you will gain firsthand experience in your chosen field, develop problem-solving skills, and learn to work collaboratively in a professional environment. Additionally, you will receive valuable guidance and feedback that will help you grow both personally and professionally.
                </p>
                <h3
                    className="text-xl font-semibold text-gray-800 mb-4"
                    data-aos="fade-left"
                >
                    How to Apply?
                </h3>
                <p
                    className="text-lg text-gray-700 mb-6 text-justify"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    Applying for our internship program is simple. Submit your resume along with a cover letter detailing your interests, skills, and goals. Shortlisted candidates will be invited for an interview where we assess your potential and enthusiasm for the role.
                </p>
            </section>

            <section className="bg-gray-50 py-12 px-6 md:px-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">What Our Interns Are Saying</h2>
                <div className="relative overflow-hidden w-full h-48">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="w-full flex-shrink-0 p-6 bg-white rounded-lg shadow-lg text-center"
                            >
                                <p className="text-lg text-gray-700 italic mb-4">{`"${testimonial.text}"`}</p>
                                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
