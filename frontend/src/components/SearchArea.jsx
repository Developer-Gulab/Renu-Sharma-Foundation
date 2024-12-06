import React from "react";

const SearchArea = () => {
  return (
    <div>
      {/* <!-- Fullscreen search area start here --> */}
      <div class="search-wrap">
        <div class="search-inner">
          <i class="fas fa-times search-close" id="search-close"></i>
          <div class="search-cell">
            <form method="get">
              <div class="search-field-holder">
                <input
                  type="search"
                  class="main-search-input"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- Fullscreen search area end here --> */}
    </div>
  );
};

export default SearchArea;
