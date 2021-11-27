import React, { useRef, useEffect, useState } from "react";

function ImageGallery({ images }) {
  // Use browser console and console.log() for debugging
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 200px 200px" }}>
      {images.map((image, index) => {
        return <LazyImage key={index} index={index} image={image} />;
      })}
    </div>
  );
}

export default ImageGallery;

const LazyImage = ({ image }) => {
  const ref = useRef();
  const entry = useOnScreen(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      style={{
        minHeight: "200px",
      }}
    >
      <img
        ref={ref}
        alt=""
        src={isVisible ? image : null}
        data-src={image}
        height="200px"
        width="200px"
      />
    </div>
  );
};

function useOnScreen(
  elementRef,
  { threshold = 0.5, root = null, rootMargin = "0px", freezeOnceVisible = true }
) {
  const [entry, setEntry] = useState();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return entry;
}
