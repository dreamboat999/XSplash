import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./imagesGrid.module.scss";

import { useAppContext } from "../../context";
import Masonry from "../../UI/Masonry";
import useMatch from "../../hooks/useMatch";
import RenderIf from "../../utils/RenderIf";

const ImagesGrid = ({ images, name }) => {
  const { openModal, modalProps } = useAppContext();
  const match = useMatch();

  const handleOpenModal = (id) => {
    openModal({
      type: "imageModal",
      data: { id: id },
    });
  };

  return (
    <div
      className={s.images_grid}
      style={{
        paddingLeft: modalProps.type === "imageModal" ? "20px" : 0,
        paddingRight: modalProps.type === "imageModal" ? "20px" : 0,
      }}
    >
      <div className="container">
        <RenderIf isTrue={name}>
          <h1>{name ? name : "Loading"}</h1>
        </RenderIf>
        <Masonry>
          {images.map((el, i) => {
            const { id, user, urls, description } = el;
            return (
              <div
                key={i}
                className={s.image_container}
                onClick={match ? () => handleOpenModal(id) : () => {}}
              >
                <RenderIf isTrue={modalProps.type !== "imageModal"}>
                  <div className={s.user_wrapper}>
                    <Link
                      to={`/@${user.username}`}
                      className={s.user_link}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className={s.user_image}>
                        <LazyLoadImage
                          src={user.profile_image.small}
                          width={32}
                          height={32}
                          alt={user.name}
                        />
                      </div>
                      <h3>{user.name}</h3>
                    </Link>
                  </div>
                </RenderIf>

                <div
                  onClick={match ? () => {} : () => handleOpenModal(id)}
                  className={s.image_wrapper}
                >
                  <LazyLoadImage
                    src={urls.regular}
                    alt={description}
                    effect="blur"
                    placeholderSrc={urls.regular}
                  />
                </div>
              </div>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default ImagesGrid;
