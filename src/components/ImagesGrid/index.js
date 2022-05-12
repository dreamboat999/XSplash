import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import s from "./imagesGrid.module.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImagesGrid = ({ firstCol, secondCol, thirdCol, setIsFetching }) => {
  const dispatch = useDispatch();

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

  const handleDisplayModal = (id) => {
    dispatch({
      type: "DISPLAY_MODAL_IMAGE",
      payload: { isOpen: true, id: id },
    });
  };

  return (
    <div className={s.images_outer}>
      <div className="container">
        <div className={s.images_inner}>
          <div className={s.images_column}>
            {firstCol?.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={s.image}
                    onClick={() => handleDisplayModal(el.id)}
                  >
                    <LazyLoadImage
                      src={el.urls.small}
                      alt={el.alt_discription}
                      effect="blur"
                    />
                    <div className={s.user_info_wrapper}>
                      <div className={s.user_info}>
                        <span>
                          <img src={el.user.profile_image.small} alt="#" />
                        </span>
                        <h3>{el.user.name}</h3>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className={s.images_column}>
            {secondCol?.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={s.image}
                    onClick={() => handleDisplayModal(el.id)}
                  >
                    <LazyLoadImage
                      src={el.urls.small}
                      alt={el.alt_discription}
                      effect="blur"
                    />
                    <div className={s.user_info_wrapper}>
                      <div className={s.user_info}>
                        <span>
                          <img src={el.user.profile_image.small} alt="#" />
                        </span>
                        <h3>{el.user.name}</h3>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className={s.images_column}>
            {thirdCol?.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={s.image}
                    onClick={() => handleDisplayModal(el.id)}
                  >
                    <LazyLoadImage
                      src={el.urls.small}
                      alt={el.alt_discription}
                      effect="blur"
                    />
                    <div className={s.user_info_wrapper}>
                      <div className={s.user_info}>
                        <span>
                          <img src={el.user.profile_image.small} alt="#" />
                        </span>
                        <h3>{el.user.name}</h3>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesGrid;
