import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import s from "./imagesGrid.module.scss";

import ImagesMasonry from "../ImagesMasonry";

import { useAppContext } from "../../context";
import RenderIf from "../../utils/renderIf";
import useMatch from "../../hooks/useMatch";
import useOnScreen from "../../hooks/useOnScreen";

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
      className={s.lazy_image_wrapper}
      style={{
        height: isLoaded ? "100%" : 300,
      }}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={clsx(s.lazy_image, { [s.lazy_image_loaded]: isLoaded })}
        />
      )}
    </div>
  );
};

const ImagesGrid = ({ setIsFetching, images, name }) => {
  const { handleOpenModal } = useAppContext();
  const match = useMatch();

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 400) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={s.images_grid}>
      <div className="container">
        <RenderIf isTrue={name}>
          <h1 className={s.name}>{name ? name : "Loading"}</h1>
        </RenderIf>
        <ImagesMasonry>
          {images.map((el, i) => {
            const { id, user, urls, description } = el;
            return (
              <div
                key={i}
                className={s.image_container}
                onClick={match ? () => handleOpenModal(id) : () => {}}
              >
                <div className={s.user_wrapper}>
                  <Link
                    to={`/@${user.username}`}
                    className={s.user_link}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className={s.user_image}>
                      <img src={user.profile_image.small} alt={user.name} />
                    </div>
                    <h3>{user.name}</h3>
                  </Link>
                </div>

                <div
                  onClick={match ? () => {} : () => handleOpenModal(id)}
                  className={s.image_wrapper}
                >
                  <LazyImage src={urls.regular} alt={description} />
                </div>
              </div>
            );
          })}
        </ImagesMasonry>
      </div>
    </div>
  );
};

export default ImagesGrid;
