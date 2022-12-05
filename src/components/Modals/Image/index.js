import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";

import s from "./image.module.scss";

import { useAppContext } from "../../../context";
import { getImage, getUserImages } from "../../../api";
import ImagesGrid from "../../ImagesGrid";
import { Spinner } from "../../../UI/Loading";
import RenderIf from "../../../utils/RenderIf";
import DownloadImage from "../../../utils/DownloadImage";

const Image = () => {
  const { modalProps, modalRef, closeModal } = useAppContext();
  const [image, setImage] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disableLink, setDisableLink] = useState(false);

  const { data } = modalProps;
  const { views, downloads, user, created_at, urls } = image;

  useEffect(() => {
    setLoading(true);
    getImage(data?.id)
      .then((res) => {
        setImage(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => setImage({});
  }, [data?.id]);

  useEffect(() => {
    getUserImages(user?.username)
      .then((res) => {
        setRelated(res);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setRelated([]);
  }, [user?.username]);

  const dateFormat = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDownload = (e) => {
    DownloadImage(e, user?.username, data?.id, setDisableLink);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  useEffect(() => {
    if (modalProps?.isOpen) {
      if (data?.id) {
        modalRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [modalProps?.isOpen, data?.id, modalRef]);

  return (
    <div className={s.image_outer}>
      <div className={s.image_inner}>
        <div className={s.image_header}>
          <div className={s.user_block}>
            <div className={s.user_photo}>
              <LazyLoadImage
                src={user?.profile_image?.small}
                alt={user?.name}
                effect="opacity"
              />
            </div>
            <Link
              to={`/@${user?.username}`}
              className={s.user_name}
              onClick={closeModal}
            >
              {user?.name}
            </Link>
          </div>
          <div className={s.download_wrapper}>
            <a
              href={urls?.raw}
              download
              className={clsx(s.download_button, {
                [s.download_button_disable]: disableLink,
              })}
              onClick={handleDownload}
            >
              {disableLink ? "Downloading" : "Download free"}
            </a>
          </div>
        </div>

        <div className={s.image_block}>
          <Spinner loading={loading}>
            <LazyLoadImage src={urls?.regular} alt="desc" effect="blur" />
          </Spinner>
        </div>

        <div className={s.info_block}>
          <div className={s.info_block_item}>
            <h3>Views</h3>
            <RenderIf isTrue={views} isFalse="--">
              <span>{formatNumber(views)}</span>
            </RenderIf>
          </div>
          <div className={s.info_block_item}>
            <h3>Downloads</h3>
            <RenderIf isTrue={downloads} isFalse="--">
              <span>{formatNumber(downloads)}</span>
            </RenderIf>
          </div>
          <div className={s.info_block_item}>
            <h3>Published on</h3>
            <RenderIf isTrue={created_at}>
              <span>{dateFormat}</span>
            </RenderIf>
          </div>
        </div>
      </div>

      <RenderIf isTrue={related}>
        <div className={s.related_block}>
          <h2>Related photos</h2>
          <ImagesGrid images={related} />
        </div>
      </RenderIf>
    </div>
  );
};

export default Image;
