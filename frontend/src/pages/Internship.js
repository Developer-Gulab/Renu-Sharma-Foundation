import React from 'react';
import images from '../images/internship.jpeg';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Internship() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-between py-12 px-6 md:px-12">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl text-center font-bold mb-4 text-gray-800">Join Our Internship Program</h1>
                    <p className="text-lg text-gray-600 flex flex-col text-center">
                        Unlock your potential by working on exciting projects. Gain real-world experience, build your skills, and kickstart your career with our internship program.
                        <div className="flex justify-center mt-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Apply now</button>
                        </div>
                    </p>
                </div>
                <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
                    <img
                        src={images}
                        alt="Internship"
                        className="w-4/5 md:max-w-xl h-auto rounded-lg"
                    />
                </div>
            </div>
            <section className="mx-auto py-12 px-6 md:px-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Why Choose Our Internship Program?</h2>
                <p className="text-lg text-gray-700 mb-6 text-justify">
                    Our internship program is your gateway to professional growth and development. Designed with your career in mind, this program offers a perfect balance of hands-on learning and mentorship. Whether you are a student looking to gain practical experience or a recent graduate ready to start your career, our internship program equips you with the skills and knowledge needed to succeed in the industry.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features of Our Internship Program:</h3>
                <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
                    <li>Opportunity to work on real-world projects and challenges.</li>
                    <li>Comprehensive training and mentorship from experienced professionals.</li>
                    <li>Access to industry-standard tools and technologies.</li>
                    <li>Flexible schedules tailored to accommodate your academic or personal commitments.</li>
                    <li>Networking opportunities with experts and fellow interns.</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Who Can Apply?</h3>
                <p className="text-lg text-gray-700 mb-6 text-justify">
                    We welcome applicants from diverse educational and professional backgrounds. If you are enthusiastic, eager to learn, and passionate about building a career, this program is for you. Whether you are pursuing a degree, a fresh graduate, or someone looking to explore a new field, our doors are open to you.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">What Will You Gain?</h3>
                <p className="text-lg text-gray-700 mb-6 text-justify">
                    As an intern, you will gain firsthand experience in your chosen field, develop problem-solving skills, and learn to work collaboratively in a professional environment. Additionally, you will receive valuable guidance and feedback that will help you grow both personally and professionally.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Apply?</h3>
                <p className="text-lg text-gray-700 mb-6 text-justify">
                    Applying for our internship program is simple. Submit your resume along with a cover letter detailing your interests, skills, and goals. Shortlisted candidates will be invited for an interview where we assess your potential and enthusiasm for the role.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Testimonials from Our Past Interns:</h3>
                <p className="text-lg text-gray-700 mb-6 italic">
                    "This internship program was a turning point in my career. The projects were challenging, and the mentorship was outstanding!" – Jane Doe
                </p>
                <p className="text-lg text-gray-700 mb-6 italic">
                    "I gained practical experience and built a professional network that helped me land my dream job." – John Smith
                </p>
                <p className="text-lg text-gray-700 text-justify">
                    Don’t miss out on this opportunity to kickstart your career. Apply today and take the first step towards a brighter future!
                </p>
            </section>

            <section className="bg-gray-50 py-12 px-6 md:px-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">What Our Interns Are Saying</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg text-gray-700 italic mb-4">
                            "The internship program gave me a hands-on experience that helped me gain insights into the industry. The team was incredibly supportive, and I learned more in a few months than I ever expected!"
                        </p>
                        <p className="font-semibold text-gray-800">Sarah Lee</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg text-gray-700 italic mb-4">
                            "This internship provided me with invaluable experience. The projects I worked on were challenging and rewarding, and I left with a deeper understanding of the field."
                        </p>
                        <p className="font-semibold text-gray-800">Michael Jordan</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg text-gray-700 italic mb-4">
                            "I had the opportunity to learn and grow in an environment that fostered creativity and innovation. I now feel prepared to take on the professional world!"
                        </p>
                        <p className="font-semibold text-gray-800">Emily Davis</p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

