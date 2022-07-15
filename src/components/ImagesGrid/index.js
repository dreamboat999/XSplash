import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImageId, setImageModal } from "../../store/actions";

import { LazyLoadImage } from "react-lazy-load-image-component";
import ImagesMasonry from "../ImagesMasonry";

import s from "./imagesGrid.module.scss";

const ImagesGrid = ({ setIsFetching, images }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setIsFetching(true);
    }
  };

  const handleOpenModal = (id) => {
    dispatch(setImageModal(true));
    dispatch(setImageId(id));
  };

  return (
    <div className={s.images_grid}>
      <div className="container">
        <ImagesMasonry>
          {images.map((el, i) => {
            return (
              <div
                key={i}
                className={s.image}
                onClick={() => handleOpenModal(el.id)}
              >
                <LazyLoadImage
                  src={el.urls.regular}
                  alt={el.description}
                  effect="blur"
                />
                <div className={s.user_info_wrapper}>
                  <div className={s.user_info}>
                    <div className={s.user_image_wrapper}>
                      <LazyLoadImage
                        effect="opacity"
                        src={el.user.profile_image.small}
                        alt="description"
                      />
                    </div>
                    <h3>{el.user.name}</h3>
                  </div>
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
