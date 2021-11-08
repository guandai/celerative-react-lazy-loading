import { useRef } from "react";
import useOnScreen from "./useOnScreen";

const LazyImage = ({ image }) => {
  const ref = useRef();
  const entry = useOnScreen(ref, {});
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render Section ${image}`, { isVisible });

  return (
    <div
      ref={ref}
      style={{
        minHeight: "200px",
      }}
    >
      <img alt="" src={isVisible && image} height="200px" width="200px"/>
    </div>
  );
};

export default LazyImage;
