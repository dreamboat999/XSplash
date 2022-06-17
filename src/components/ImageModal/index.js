import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImageModal } from "../../store/actions";

import s from "./imageModal.module.scss";
import { MdOutlineClose } from "react-icons/md";

import ImagesGrid from "../ImagesGrid";
import RenderIf from "../../utils/renderIf";
import { useClickAway } from "../../hooks/useClickAway";
// import Download from "./download";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImage, getRelated } from "./api";

const ImageModal = () => {
  const dispatch = useDispatch();
  const { imageId } = useSelector((state) => state.appState);
  const modal = useRef(null);
  const [related, setRelated] = useState([]);
  const [image, setImage] = useState({});

  useClickAway(modal, () => {
    dispatch(setImageModal(false));
  });

  useEffect(() => {
    getImage(imageId).then((res) => {
      setImage(res);
    });
  }, [imageId]);

  useEffect(() => {
    getRelated(image.user?.username).then((res) => {
      setRelated(res);
    });
  }, [image.user?.username]);

  const dateFormat = new Date(image?.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={s.modal_outer}>
      <button className={s.btn_close}>
        <MdOutlineClose />
      </button>
      <div className={s.modal_inner} ref={modal}>
        <div className={s.modal_header}>
          <div className={s.user}>
            <div className={s.user_image}>
              <img src={image.user?.profile_image?.small} alt="profile_image" />
            </div>
            <div className={s.user_name}>{image.user?.name}</div>
          </div>
          {/*<Download image={image} />*/}
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
            <RenderIf isTrue={dateFormat}>
              <h3>Published on {dateFormat}</h3>
            </RenderIf>
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
