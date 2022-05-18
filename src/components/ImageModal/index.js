import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./imageModal.module.scss";
import { MdOutlineClose } from "react-icons/md";

import API, { SECRET_KEY } from "../api";
import ImagesGrid from "../ImagesGrid";
import { useClickAway } from "../../utils/useClickAway";
import RenderIf from "../../utils/renderIf";
import Download from "./download";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageModal = () => {
  const dispatch = useDispatch();
  const modal = useRef(null);
  const { imageModal } = useSelector((state) => state.appState);
  const [related, setRelated] = useState([]);
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
    )
      .then((response) => {
        setRelated([...related, ...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [image.user?.username]);

  const dateFormat = new Date(image?.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={s.modal_outer}>
      <button
        className={s.btn_close}
        onClick={() =>
          dispatch({ type: "DISPLAY_MODAL_IMAGE", payload: { isOpen: false } })
        }
      >
        <MdOutlineClose />
      </button>
      <div className={s.modal_inner}>
        <div className={s.modal_header}>
          <div className={s.user}>
            <div className={s.user_image}>
              <img src={image.user?.profile_image?.small} alt="profile_image" />
            </div>
            <div className={s.user_name}>{image.user?.name}</div>
          </div>
          <Download image={image} />
        </div>
        <div className={s.modal_image}>
          <LazyLoadImage src={image.urls?.regular} alt="description" />
        </div>
        <div className={s.modal_info}>
          <div className={s.modal_info_item}>
            <h3>Views</h3>
            <span>
              <RenderIf isTrue={image?.views} isFalse="--">
                {new Intl.NumberFormat("en-US").format(image?.views)}
              </RenderIf>
            </span>
          </div>
          <div className={s.modal_info_item}>
            <h3>Downloads</h3>
            <span>
              <RenderIf isTrue={image?.downloads} isFalse="--">
                {new Intl.NumberFormat("en-US").format(image?.downloads)}
              </RenderIf>
            </span>
          </div>
          <div className={s.modal_info_item}>
            <h3>Published on</h3>
            <span>
              <RenderIf isTrue={dateFormat}>{dateFormat}</RenderIf>
            </span>
          </div>
        </div>
        <RenderIf isTrue={related}>
          <div className={s.related}>
            <h2>Related photos</h2>
            <ImagesGrid images={related} />
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default ImageModal;
