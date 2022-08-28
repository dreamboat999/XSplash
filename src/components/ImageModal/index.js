import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setImageId, setImageModal } from "../../redux/actions";

import s from "./imageModal.module.scss";
import { MdOutlineClose } from "react-icons/md";

import { getImage, getUserImages } from "../../api";
import ImagesGrid from "../ImagesGrid";
import useClickAway from "../../hooks/useClickAway";
import DownloadImage from "../../utils/downloadImage";
import RenderIf from "../../utils/renderIf";
import { Spinner } from "../Loading";

const ImageModal = () => {
  const dispatch = useDispatch();
  const { imageId, isImageModal } = useSelector((state) => state.appState);
  const [image, setImage] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalOuter = useRef(null);
  const modalInner = useRef(null);
  const { views, downloads, user, created_at, urls } = image;

  const handleClose = () => {
    dispatch(setImageModal(false));
    dispatch(setImageId(null));
  };

  useClickAway(modalInner, () => {
    handleClose();
  });

  useEffect(() => {
    setLoading(true);
    getImage(imageId)
      .then((res) => {
        setImage(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      setImage({});
    };
  }, [imageId]);

  useEffect(() => {
    getUserImages(user?.username).then((res) => {
      setRelated(res);
    });
  }, [user?.username]);

  const dateFormat = new Date(created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDownload = (e) => {
    DownloadImage(e, user?.username, imageId);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  useEffect(() => {
    if (isImageModal) {
      if (imageId) {
        modalOuter.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [imageId, isImageModal]);

  return (
    <div className={s.modal_outer} ref={modalOuter}>
      <button className={s.btn_close} onClick={handleClose}>
        <MdOutlineClose />
      </button>
      <div className={s.modal_inner} ref={modalInner}>
        <div className={s.modal_header}>
          <div className={s.user}>
            <div className={s.user_image}>
              <img src={user?.profile_image?.small} alt={user?.name} />
            </div>
            <Link
              to={`/@${user?.username}`}
              className={s.user_name}
              onClick={() => dispatch(setImageModal(false))}
            >
              {user?.name}
            </Link>
          </div>
          <div className={s.download}>
            <a
              href={urls?.raw}
              className={s.btn_download}
              onClick={handleDownload}
            >
              Download
            </a>
          </div>
        </div>
        <div className={s.modal_image}>
          <Spinner loading={loading}>
            <img src={urls?.regular} alt="desc" />
          </Spinner>
        </div>
        <div className={s.modal_info}>
          <div className={s.modal_info_item}>
            <h3>Views</h3>
            <RenderIf isTrue={views} isFalse="--">
              <span>{formatNumber(views)}</span>
            </RenderIf>
          </div>
          <div className={s.modal_info_item}>
            <h3>Downloads</h3>
            <RenderIf isTrue={downloads} isFalse="--">
              <span>{formatNumber(downloads)}</span>
            </RenderIf>
          </div>
          <div className={s.modal_info_item}>
            <RenderIf isTrue={created_at}>
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
