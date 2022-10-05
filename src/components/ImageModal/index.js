import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import s from "./imageModal.module.scss";
import { MdOutlineClose } from "react-icons/md";

import ImagesGrid from "../ImagesGrid";
import { Spinner } from "../Loading";
import { getImage, getUserImages } from "../../api";

import { useAppContext } from "../../context";
import useClickAway from "../../hooks/useClickAway";
import DownloadImage from "../../utils/downloadImage";
import RenderIf from "../../utils/renderIf";

const ImageModal = () => {
  const { isOpenModal, imageId, handleCloseModal } = useAppContext();
  const [image, setImage] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalOuter = useRef(null);
  const modalInner = useRef(null);
  const [disableLink, setDisableLink] = useState(false);
  const { views, downloads, user, created_at, urls } = image;

  useClickAway(modalInner, () => {
    handleCloseModal();
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDownload = (e) => {
    DownloadImage(e, user?.username, imageId, setDisableLink);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  useEffect(() => {
    if (isOpenModal) {
      if (imageId) {
        modalOuter.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [imageId, isOpenModal]);

  return (
    <div className={s.modal_outer} ref={modalOuter}>
      <button className={s.btn_close} onClick={handleCloseModal}>
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
              onClick={handleCloseModal}
            >
              {user?.name}
            </Link>
          </div>
          <div>
            <a
              href={urls?.raw}
              download
              className={clsx(s.btn_download, {
                [s.disable_btn_download]: disableLink,
              })}
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
          <div className={clsx(s.modal_info_item, s.published)}>
            <h3>Published on</h3>
            <RenderIf isTrue={created_at}>
              <span>{dateFormat}</span>
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
