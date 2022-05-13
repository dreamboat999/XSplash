import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./imageModal.module.scss";
import API, { SECRET_KEY } from "../api";
import Images from "../Images";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useClickAway } from "../../utils/useClickAway";

const ImageModal = () => {
  const dispatch = useDispatch();
  const modal = useRef(null);
  const { imageModal } = useSelector((state) => state.appState);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  useClickAway(modal, () => {
    dispatch({ type: "DISPLAY_MODAL_IMAGE", payload: { isOpen: false } });
  });

  useEffect(() => {
    API.get(`photos/${imageModal.id}?client_id=${SECRET_KEY}`).then((resp) => {
      setImage(resp.data);
    });
  }, [imageModal.id]);

  useEffect(() => {
    API.get(
      `users/${image.user?.username}/photos?client_id=${SECRET_KEY}&per_page=9`
    ).then((response) => {
      setImages([...images, ...response.data]);
    });
  }, [image.user?.username]);

  const dateFormat = new Date(image?.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={s.modal_outer}>
      <div className={s.modal_inner} ref={modal}>
        <div className={s.modal_header}>
          <div className={s.user_image}>
            <img src={image.user?.profile_image?.small} alt="profile_image" />
          </div>
          <div className={s.user_name}>{image.user?.name}</div>
        </div>
        <div className={s.modal_image}>
          <LazyLoadImage
            src={image.urls?.regular}
            alt="description"
            effect="blur"
          />
        </div>
        <div className={s.modal_info}>
          <div className={s.modal_info_item}>
            <h3>Views</h3>
            <span>{new Intl.NumberFormat("en-US").format(image?.views)}</span>
          </div>
          <div className={s.modal_info_item}>
            <h3>Downloads</h3>
            <span>
              {new Intl.NumberFormat("en-US").format(image?.downloads)}
            </span>
          </div>
          <div className={s.modal_info_item}>
            <h3>Published on {dateFormat}</h3>
          </div>
        </div>
        {images ? (
          <div className={s.related}>
            <h2>Related photos</h2>
            <Images images={images} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageModal;
