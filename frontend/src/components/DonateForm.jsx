import React, { useRef, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import toast from 'react-hot-toast';
import api from '../api/api';


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


    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.amount || formData.amount <= 0) {
            setLoading(false)
            toast.error("Please provide valid amount!");
            return;
        }

        if (formData.phone != '' && formData.phone.toString().length != 10) {
            setLoading(false)
            toast.error("Please provide exact 10 digit number!");
            return;
        }

        if (!formData.fullName) {
            toast.error("Please provide your name!");
            setLoading(false)
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Please provide valid email address!")
            setLoading(false);
            return;
        }

        try {
            //Load stripe
            const stripe = await loadStripe(process.env.REACT_APP_PUBLISABLEKEY);
            //Call create checkout api
            const { data: session } = await api.post("/payment/create-checkout-session", formData);
            const sessionId = session.sessionId;
            if (sessionId) {
                const result = await stripe.redirectToCheckout({
                    sessionId: sessionId
                })

                if (result) {
                    toast.success('Your Donation successfully completed!');
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        amount: '',
                    });
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something is wrong!');
        } finally {
            setLoading(false);
            setActiveIndex("")
        }
    };

    return (
        <div
            className=" !m-auto lg:max-w-2xl xl:max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden !w-full md:!w-[90vw] lg:!w-fit "
        >
            <div
                className="bg-gradient-to-r bg-[#292350] xl:!p-6 !p-3 text-white text-center"
            >
                <h1 className="text-2xl xl:text-3xl font-bold text-white">Make a Difference</h1>
                <p className="!mt-2 text-purple-200">Your donation helps us change lives!</p>
            </div>

            {/* Form  */}
            <form className="!p-4 xl:!p-6  !space-y-2 lg:!space-y-3 xl:!space-y-4" onSubmit={handleSubmit}>
                {/* Donation Amount  */}
                <div className=''>
                    <label htmlFor="amount" className="block text-[#281d77] font-medium"
                    >Select Donation Amount *</label>
                    <div className="flex gap-1 xl:!gap-2 !mt-2">
                        <button
                            type="button"
                            onClick={() => changeIndex(1)}
                            className={`!px-2 xl:!px-3 !py-2  text-white rounded-lg transition-all duration-300 ${activeIndex === 1 ? "bg-blue-800" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            &#8377;10
                        </button>
                        <button
                            type="button"
                            onClick={() => changeIndex(2)}
                            className={`!px-2 xl:!px-3 !py-2 text-white rounded-lg transition-all duration-300  ${activeIndex === 2 ? "bg-blue-800" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            &#8377;20
                        </button>
                        <button
                            type="button"
                            onClick={() => changeIndex(3)}
                            className={`!px-2 xl:!px-3 !py-2 text-white rounded-lg transition-all duration-300  ${activeIndex === 3 ? "bg-blue-800" : "hover:bg-[#352896] hover:text-[103%] bg-[#120b54]"}`}
                        >
                            &#8377;50
                        </button>
                        <input
                            ref={customInput}
                            onChange={(e) => { setActiveIndex(4); formData.amount = parseInt(e.target.value, 10); }}
                            type="number"
                            name='amount'
                            placeholder="Enter Amont"
                            className="flex-1 !px-2 w-full xl:!px-4 !py-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:!ring-[#281d77]"
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
                        className="w-full !px-2 xl:!px-4 !py-2  border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:!ring-[#281d77]"
                    />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-[#281d77] font-medium"
                    >Your Email *</label>
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full !px-2 xl:!px-4 !py-2  border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:!ring-[#281d77]"
                    />
                </div>

                {/*  Phone Number  */}
                <div>
                    <label htmlFor="phone" className="block text-[#281d77] font-medium"
                    >Your Phone no.</label>
                    <input
                        type="number"
                        name="phone"
                        placeholder='Enter Phone no.'
                        className="w-full !px-2 xl:!px-4 !py-2  border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:!ring-[#281d77]"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#292350] text-white !px-2 xl:!px-4 !py-2 hover:text-[104%] font-semibold rounded-lg hover:bg-[#352896] transition duration-200"
                >
                    {loading ? "Processing" : "Donate Now"}
                </button>
            </form>
        </div>
    )
}

export default DonateForm
