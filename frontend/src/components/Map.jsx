import React from "react";

const Map = () => {
  return (
    <div className="w-full">
      {/* Contact map area start here */}
      <h2 className="text-center pb-20">Our Location</h2>

      <div
        style={{
          width: "100%", // Default for mobile devices
        }}
      >
        <iframe
          src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3552.7537363293204!2d77.28349189152487!3d28.68843603232504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb881a3fd3e1%3A0x227fbcc4ae11c2e2!2sAnita%20Devi%20Educational%20Welfare%20Society!5e1!3m2!1sen!2sin!4v1732955837719!5m2!1sen!2sin "
          width="100%"
          height="500"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact map area end here */}
      <style>
        {`
          /* Media query for small screens */
          @media (max-width: 768px) {
            div[style*="width: 90%"] {
              width: 95%; /* Increase width slightly for better mobile experience */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Map;
