import React, { useEffect } from "react";

import styles from "./imagesGrid.module.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const { images_outer, images_inner, images_column, image } = styles;

const ImagesGrid = ({ firstCol, secondCol, thirdCol, setIsFetching }) => {
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 1000) {
      setIsFetching(true);
    }
  };

  return (
    <div className={images_outer}>
      <div className="container">
        <div className={images_inner}>
          <div className={images_column}>
            {firstCol?.map((el, index) => {
              return (
                <div key={index} className={image}>
                  <LazyLoadImage
                    src={el.urls.small}
                    alt={el.alt_discription}
                    effect="blur"
                  />
                </div>
              );
            })}
          </div>
          <div className={images_column}>
            {secondCol?.map((el, index) => {
              return (
                <div key={index} className={image}>
                  <LazyLoadImage
                    src={el.urls.small}
                    alt={el.alt_discription}
                    effect="blur"
                  />
                </div>
              );
            })}
          </div>
          <div className={images_column}>
            {thirdCol?.map((el, index) => {
              return (
                <div key={index} className={image}>
                  <LazyLoadImage
                    src={el.urls.small}
                    alt={el.alt_discription}
                    effect="blur"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesGrid;
