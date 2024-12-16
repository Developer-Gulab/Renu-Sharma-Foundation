import React from "react";
import inner_banner_shape2 from "../images/banner/inner-banner-shape2.png";
import inner_banner_shape1 from "../images/banner/inner-banner-shape1.png";
import inner_banner_shape3 from "../images/banner/inner-banner-shape3.png";

const PageBanner = () => {
  return (
    <div>
      {/* <!-- Page banner area start here --> */}
      <section
        class="banner__inner-page bg-image pt-180 pb-180 bg-image"
        data-background="assets/images/banner/banner-inner-page.jpg"
      >
        <div
          class="shape2 wow slideInLeft"
          data-wow-delay="00ms"
          data-wow-duration="1500ms"
        >
          <img src={inner_banner_shape2} alt="shape" />
        </div>
        <div
          class="shape1 wow slideInLeft"
          data-wow-delay="200ms"
          data-wow-duration="1500ms"
        >
          <img src={inner_banner_shape1} alt="shape" />
        </div>
        <div
          class="shape3 wow slideInRight"
          data-wow-delay="200ms"
          data-wow-duration="1500ms"
        >
          <img class="sway__animationX" src={inner_banner_shape3} alt="shape" />
        </div>
        <div class="container">
          <h2
            class="wow fadeInUp"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            Contact Us
          </h2>
          <div
            class="breadcrumb-list wow fadeInUp"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <a href="index.html">Home</a>
            <span>
              <i class="fa-solid fa-angles-right mx-2"></i>Contact Us
            </span>
          </div>
        </div>
      </section>
      {/* <!-- Page banner area end here --> */}
    </div>
  );
};

export default PageBanner;
