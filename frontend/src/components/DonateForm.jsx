import React, { act, useRef, useState } from 'react'

const DonateForm = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const customInput = useRef(null);
    const changeIndex = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
        customInput.current.value = "";
    }

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
            <form className="p-2 md:p-4 lg:p-6 space-y-6">
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
                            onChange={(e) => setActiveIndex(4)}
                            type="number"
                            id="amount"
                            placeholder="Enter Amont"
                            className="flex-1 px-2 w-full lg:w-auto lg:px-4 py-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                        />
                    </div>
                </div>

                {/* Personal Details  */}
                <div>
                    <label htmlFor="name" className="block text-[#281d77] font-medium"
                    >Your Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-[#281d77] font-medium"
                    >Your Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                    />
                </div>

                {/* Recurring Donation  */}
                <div>
                    <label htmlFor="recurring" className="block text-[#281d77] font-medium"
                    >Make it Recurring?</label>
                    <select
                        id="recurring"
                        className="w-full px-2 lg:px-4 py-2 mt-2 border border-[#281d77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#281d77]"
                    >
                        <option value="one-time">One-Time</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#292350] text-white px-2 lg:px-4 py-2 hover:text-[104%] font-semibold rounded-lg hover:bg-[#352896] transition duration-200"
                >
                    Donate Now
                </button>
            </form>
        </div>
    )
}

export default DonateForm
