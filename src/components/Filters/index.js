import React from "react";

import s from "./filters.module.scss";
import { MdPhoto } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";

import Dropdown from "../Dropdown";
import { useMatch } from "../../hooks/useMatch";
import RenderIf from "../../utils/renderIf";

export const orientationButtons = [
  { title: "Any Orientation", value: "" },
  { title: "Landscape", value: "landscape" },
  { title: "Portrait", value: "portrait" },
  { title: "Square", value: "squarish" },
];

export const sortButtons = [
  { title: "Relevance", value: "relevant" },
  { title: "Newest", value: "latest" },
];

const Filters = ({
  orientation,
  setOrientation,
  sort,
  setSort,
  handleOpenModal,
}) => {
  const match = useMatch();

  const orientationTitle = orientationButtons.find(
    (el) => orientation === el.value
  );
  const sortTitle = sortButtons.find((el) => sort === el.value);

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
          <Dropdown
            title={orientationTitle?.title}
            data={orientationButtons}
            value={orientation}
            setValue={setOrientation}
          />
          <Dropdown
            title={`Sort by ${sortTitle?.title}`}
            data={sortButtons}
            value={sort}
            setValue={setSort}
          />
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
