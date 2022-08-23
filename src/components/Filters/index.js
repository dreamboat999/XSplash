import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import s from "./filters.module.scss";
import { MdCheck, MdPhoto } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

import Dropdown from "../Dropdown";
import { useMatch } from "../../hooks/useMatch";
import RenderIf from "../../utils/renderIf";

const Filters = ({ name, orientation, handleOpenModal }) => {
  const match = useMatch();

  const orientationData = [
    {
      title: "Any Orientation",
      url: `/photos/${name}`,
    },
    {
      title: "Landscape",
      value: "landscape",
      url: `/photos/${name}/landscape`,
    },
    {
      title: "Portrait",
      value: "portrait",
      url: `/photos/${name}/portrait`,
    },
    {
      title: "Square",
      value: "squarish",
      url: `/photos/${name}/squarish`,
    },
  ];

  // const sortData = [
  //   {
  //     title: "Relevance",
  //     value: "relevant",
  //     url: `/photos/${name}/${orientation}`,
  //   },
  //   {
  //     title: "Newest",
  //     value: "latest",
  //     url: `/photos/${name}/${orientation}/latest`,
  //   },
  // ];

  const orientationTitle = orientationData.find(
    (el) => orientation === el.value
  );

  return (
    <div className={s.filters}>
      <div className={s.filters_item}>
        <div className={s.filters_photo}>
          <div className={s.photo_icon}>
            <MdPhoto />
          </div>
          <div className={s.photo_title}>Photos</div>
        </div>
      </div>
      <div className={s.filters_item}>
        <RenderIf isTrue={match}>
          <Dropdown title={orientationTitle?.title}>
            {orientationData.map((el, i) => {
              const selected = orientation === el.value;

              return (
                <Link
                  key={i}
                  to={el.url}
                  className={selected ? "selected" : ""}
                >
                  <RenderIf isTrue={selected}>
                    <MdCheck />
                  </RenderIf>
                  {el.title}
                </Link>
              );
            })}
          </Dropdown>
        </RenderIf>
        <RenderIf isTrue={!match}>
          <button className={s.filters_button} onClick={handleOpenModal}>
            <IoMdOptions />
          </button>
        </RenderIf>
      </div>
    </div>
  );
};

export default Filters;
