import React, { useEffect, useRef, useState } from "react";

import s from "./lazyimage.module.scss";
import useOnScreen from "../../hooks/useOnScreen";

const LazyImage = ({ src = "", alt = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef();
  const containerRef = useRef();
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
      };
    }
  }, [isVisible, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={`${s.container} ${isLoaded ? s.containerLoaded : ""}`}
      style={{
        height: isLoaded ? "100%" : 300,
      }}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`${s.image} ${isLoaded ? s.imageLoaded : ""}`}
        />
      )}
    </div>
  );
};

export default LazyImage;
