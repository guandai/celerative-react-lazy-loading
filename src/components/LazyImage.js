import { useRef } from "react";
import useOnScreen from "./useOnScreen";

const LazyImage = ({ image }) => {
  const ref = useRef();
  const entry = useOnScreen(ref, {});
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render Section ${image}`, { isVisible });

  return (
    <div
      style={{
        minHeight: "200px",
      }}
    >
      <img
        alt=""
        ref={ref}
        src={isVisible && image}
        data-src={!isVisible && image}
        height="200px"
        width="200px"
      />
    </div>
  );
};

export default LazyImage;
