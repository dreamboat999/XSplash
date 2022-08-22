import React, { useEffect, useRef, useState } from "react";

import s from "./lazyImage.module.scss";
import useOnScreen from "../../hooks/useOnScreen";
import clsx from "clsx";

const LazyImage = ({ src = "", alt = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
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
      className={clsx(s.container, { [s.containerLoaded]: isLoaded })}
      style={{
        height: isLoaded ? "100%" : 300,
      }}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={clsx(s.image, { [s.imageLoaded]: isLoaded })}
        />
      )}
    </div>
  );
};

export default LazyImage;
