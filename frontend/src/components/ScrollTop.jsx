import React from "react";

const ScrollTop = () => {
  return (
    <div>
      {/* <!-- Back to top area start here --> */}
      <div class="scroll-up">
        <svg
          class="scroll-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      {/* <!-- Back to top area end here --> */}
    </div>
  );
};

export default ScrollTop;
