import React, { useRef, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";


const DonateForm = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const customInput = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        amount: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const changeIndex = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
        customInput.current.value = "";
        if (i === 1) formData.amount = 10;
        if (i === 2) formData.amount = 20;
        if (i == 3) formData.amount = 50;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            //Load stripe
            const stripe = await loadStripe(import.meta.env.VITE_PUBLISABLEKEY);

            //Call create checkout api
            const { data: session } = await axios.post("http://localhost:8080/api/payment/create-checkout-session", formData);
            const sessionId = session.sessionId;

            if (sessionId) {
                const result = await stripe.redirectToCheckout({
                    sessionId: sessionId
                })

                if (result) {
                    toast.success('Donation recorded successfully!');
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        amount: '',
                    });
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting donation');
        } finally {
            setLoading(false);
            setActiveIndex("")
        }
    };

    return (
        <div
            className=" m-auto lg:max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden w-[95%] md:w-[90vw] lg:w-fit"
        >
            <div
                className="bg-gradient-to-r bg-[#292350] lg:p-6  p-3 text-white text-center"
            >
                <h1 className="text-2xl lg:text-3xl font-bold">Make a Difference</h1>
                <p className="mt-2 text-purple-200">Your donation helps us change lives!</p>
            </div>

            {/* Form  */}
            <form className="p-2 md:p-4 lg:p-6 space-y-6" onSubmit={handleSubmit}>
                {/* Donation Amount  */}
                <div>
                    <label htmlFor="amount" className="block text-[#281d77] font-medium"
                    >Select Donation Amount *</label>
                    <div className="flex lg:gap-4 gap-3 mt-2">
                        <button
                            type="button"
                            onClick={() => changeIndex(1)}
                            className={`px-2 lg:px-4 py-2  text-white rounded-lg transition-all duration-300 ${activeIndex === 1 ? "bg-[#352896]" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            $10
                        </button>
                        <button
                            type="button"
                            onClick={() => changeIndex(2)}
                            className={`px-2 lg:px-4 py-2 text-white rounded-lg transition-all duration-300  ${activeIndex === 2 ? "bg-[#352896]" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            $20
                        </button>
                        <button
                            type="button"
                            onClick={() => changeIndex(3)}
                            className={`px-2 lg:px-4 py-2 text-white rounded-lg transition-all duration-300  ${activeIndex === 3 ? "bg-[#352896]" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            $50
                        </button>
                        <input
                            ref={customInput}
                            onChange={(e) => { setActiveIndex(4); formData.amount = parseInt(e.target.value, 10); }}
                            type="number"
                            name='amount'
                            placeholder="Enter Amont"
                            className="flex-1 px-2 w-full lg:w-auto lg:px-4 py-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                        />
                    </div>
                </div>

                {/* Personal Details  */}
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-[#281d77] font-medium"
                    >Your Name *
                    </label>
                    <input
                        type="text"
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                    />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-[#281d77] font-medium"
                    >Your Email</label>
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                    />
                </div>

                {/*  Phone Number  */}
                <div>
                    <label htmlFor="phone" className="block text-[#281d77] font-medium"
                    >Your Phone no.</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder='Enter Phone no.'
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#292350] text-white px-2 lg:px-4 py-2 hover:text-[104%] font-semibold rounded-lg hover:bg-[#352896] transition duration-200"
                >
                    {loading ? "Processing" : "Donate Now"}
                </button>
            </form>
        </div>
    )
}

export default DonateForm
