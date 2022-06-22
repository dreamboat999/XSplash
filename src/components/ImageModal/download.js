import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import s from "./imageModal.module.scss";
import { DownloadImage } from "../../utils/downloadImage";
import Dropdown from "../Dropdown";

const Download = ({ image }) => {
  const { imageId } = useSelector((state) => state.appState);
  const [imageSize, setImageSize] = useState({});

  const urls = {
    small: image?.urls?.small,
    medium: image?.urls?.regular,
    large: image?.urls?.full,
    original: image?.urls?.raw,
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
    return () => {
      setImageSize({});
    };
  }, [image]);

  const handleDownload = (e) => {
    DownloadImage(e, image?.user?.username, imageId);
  };

  const small = `${imageSize.small?.width} x ${imageSize.small?.height}`;
  const medium = `${imageSize.medium?.width} x ${imageSize.medium?.height}`;
  const large = `${imageSize.large?.width} x ${imageSize.large?.height}`;
  const original = `${imageSize.original?.width} x ${imageSize.original?.height}`;

  return (
    <div className={s.download}>
      <a
        href={image?.urls?.raw}
        className={s.btn_download}
        onClick={handleDownload}
      >
        Download
      </a>
      <div className={s.download_dropdown}>
        <Dropdown>
          <div className={s.download_items}>
            <a href={image?.urls?.small} onClick={handleDownload} download>
              Small ({small})
            </a>
            <a href={image?.urls?.regular} onClick={handleDownload} download>
              Medium ({medium})
            </a>
            <a href={image?.urls?.full} onClick={handleDownload} download>
              Large ({large})
            </a>
            <hr />
            <a href={image?.urls?.raw} onClick={handleDownload} download>
              Original Size ({original})
            </a>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Download;
