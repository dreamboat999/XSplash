import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import s from "./imageModal.module.scss";
import { MdOutlineClose, MdKeyboardArrowDown } from "react-icons/md";

import API, { SECRET_KEY } from "../api";
import ImagesGrid from "../ImagesGrid";
import { useClickAway } from "../../utils/useClickAway";
import RenderIf from "../../utils/renderIf";

const ImageModal = () => {
  const dispatch = useDispatch();
  const modal = useRef(null);
  const dropdown = useRef(null);
  const { imageModal } = useSelector((state) => state.appState);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [imageSize, setImageSize] = useState({});
  const [isDropdown, setIsDropdown] = useState(false);

  useClickAway(modal, () => {
    dispatch({ type: "DISPLAY_MODAL_IMAGE", payload: { isOpen: false } });
  });

  useClickAway(dropdown, () => {
    setIsDropdown(false);
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

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const download = (e) => {
    e.preventDefault();

    fetch(e.target.href)
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${image.user?.username}-${imageModal.id}.jpg`
          );
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const urls = {
    small: image.urls?.small,
    medium: image.urls?.regular,
    full: image.urls?.full,
    original: image.urls?.raw,
  };

  useEffect(() => {
    for (const url in urls) {
      const img = new Image();
      img.src = urls[url];
      img.onload = () => {
        setImageSize((prev) => {
          return {
            ...prev,
            [url]: {
              width: img.width,
              height: img.height,
            },
          };
        });
      };
    }
  }, [image]);

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
          <div className={s.download} ref={dropdown}>
            <a
              href={image.urls?.raw}
              className={s.btn_download}
              onClick={(e) => download(e)}
            >
              Download
            </a>
            <div className={s.dropdown_wrapper}>
              <button className={s.btn_dropdown} onClick={handleDropdown}>
                <MdKeyboardArrowDown />
              </button>
              <div className={isDropdown ? s.active : ""}>
                {isDropdown ? (
                  <div className={s.dropdown}>
                    <a
                      href={image.urls?.small}
                      onClick={(e) => download(e)}
                      download
                      target="_blank"
                    >
                      Small ({imageSize.small?.width} x{" "}
                      {imageSize.small?.height})
                    </a>
                    <a
                      href={image.urls?.regular}
                      onClick={(e) => download(e)}
                      download
                      target="_blank"
                    >
                      Medium ({imageSize.medium?.width} x{" "}
                      {imageSize.medium?.height})
                    </a>
                    <a
                      href={image.urls?.full}
                      onClick={(e) => download(e)}
                      download
                      target="_blank"
                    >
                      Large ({imageSize.full?.width} x {imageSize.full?.height})
                    </a>
                    <hr />
                    <a
                      href={image.urls?.raw}
                      onClick={(e) => download(e)}
                      download
                      target="_blank"
                    >
                      Original Size ({imageSize.original?.width} x{" "}
                      {imageSize.original?.height})
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={s.modal_image}>
          <img src={image.urls?.regular} alt="description" />
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
        {images ? (
          <div className={s.related}>
            <h2>Related photos</h2>
            <ImagesGrid images={images} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageModal;
