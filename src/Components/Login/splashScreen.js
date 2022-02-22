import React from "react";

const SplashScreen = () => {
  return (
    <div className="diamond_erp_logo_container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1235.18"
        height="1235.18"
        viewBox="0 0 1235.18 1235.18"
        className="splashScreen_Logo"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#5574f7"></stop>
            <stop offset="1" stopColor="#60c3ff"></stop>
          </linearGradient>
          <filter
            id="diamond"
            width="734.433"
            height="555.1"
            x="249.289"
            y="427.016"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3"></feOffset>
            <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
            <feFlood floodOpacity="0.251"></feFlood>
            <feComposite in2="blur" operator="in"></feComposite>
            <feComposite in="SourceGraphic"></feComposite>
          </filter>
          <filter
            id="cross"
            width="102.198"
            height="103.303"
            x="875.054"
            y="366.215"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3"></feOffset>
            <feGaussianBlur result="blur-2" stdDeviation="3"></feGaussianBlur>
            <feFlood floodColor="#484848" floodOpacity="0.349"></feFlood>
            <feComposite in2="blur-2" operator="in"></feComposite>
            <feComposite in="SourceGraphic"></feComposite>
          </filter>
        </defs>
        <g data-name="Group 10715" transform="translate(0 -.001)">
          <ellipse
            cx="470.998"
            cy="470.998"
            fill="url(#linear-gradient)"
            data-name="Ellipse 3"
            rx="470.998"
            ry="470.998"
            transform="scale(-1) rotate(-23 -2746.753 2600.118)"
          ></ellipse>
          <g filter="url(#diamond)">
            <path
              fill="#fff"
              d="M703.311 130.885L589.578 17.13A44.83 44.83 0 00557.92 4.01H158.533a44.791 44.791 0 00-31.657 13.12L13.142 130.885a44.716 44.716 0 00-1.813 61.415l313.416 333.764a44.729 44.729 0 0066.919 0L705.1 192.3a44.741 44.741 0 00-1.791-61.412zM407.9 160.729h-99.387l49.7-41.4zm-32.172-55.971l61.165-51 45.18 45.18-56.687 47.217zm-84.673 41.4l-56.692-47.221 45.18-45.18 61.188 51zm122.912 36.963l-55.747 278.8-55.747-278.8h111.49zm22.836 0h109.834L381.88 457.8l54.92-274.682zm6.022-22.388l55.143-45.919 45.919 45.919zM463.6 48.787h78.628l-42.9 35.754zM358.216 90.206l-49.7-41.419h99.36zm-141.137-5.665l-42.9-35.754h78.651zm1.388 30.269l55.12 45.919H172.548zm61.165 68.307L334.551 457.8 169.772 183.118zm4.791 234.583L64.121 183.118h79.569zm288.319-234.582h79.591L431.986 417.749zm2.8-22.388l-60.292-60.292 51.426-42.874 103.142 103.165zM149.69 57.518l51.516 42.919-60.315 60.292H44.912z"
              data-name="diamond"
              transform="translate(258.29 429.01)"
            ></path>
          </g>
          <g filter="url(#cross)">
            <path
              fill="#fff"
              d="M54.421 65.3c-.96 3.136-13.277-14.728-26.879-14.728S.456 64.5.012 65.3s12.074-13.169 12.074-29.493S-.242.255.012 0s13.928 18.9 27.53 18.9S54.421 0 54.421 0 44.014 19.48 44.014 35.8s11.367 26.363 10.407 29.5z"
              data-name="cross"
              transform="rotate(41 -34.19 1425.98)"
            ></path>
          </g>
        </g>
      </svg>
      <h2 className="diamond_erp_text">Diamond ERP</h2>
    </div>
  );
};

export default SplashScreen;
