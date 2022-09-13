import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="312" y="269" rx="0" ry="0" width="158" height="184" />
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="275" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="6" y="428" rx="0" ry="0" width="90" height="27" />
    <rect x="124" y="417" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
