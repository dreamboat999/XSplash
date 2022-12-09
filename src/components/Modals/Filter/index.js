import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./styles.module.scss";
import { MdCheck } from "react-icons/md";

import { useAppContext } from "../../../context";
import RenderIf from "../../../utils/RenderIf";
import { orientationData, sortData } from "../../../utils/FiltersData";

const Item = ({ title, children }) => {
  return (
    <div className={s.item_wrapper}>
      <h3 className={s.item_title}>{title}</h3>
      <ul className={s.item_list}>{children}</ul>
    </div>
  );
};

const Filter = () => {
  const history = useNavigate();
  const { modalProps, closeModal } = useAppContext();
  const { data } = modalProps;
  const [orientation, setOrientation] = useState(data?.orientation);
  const [sort, setSort] = useState(data?.sort);

  const handleClear = () => {
    history(`/photos/${data?.name}/relevant`);
    closeModal();
  };

  const handleOrientation = (value) => {
    setOrientation(value);
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleRoute = () => {
    history(
      `/photos/${data?.name}/${sort}${orientation ? `/${orientation}` : ""}`
    );
    closeModal();
  };

  return (
    <div className={s.filter_outer}>
      <div className={s.filter_inner}>
        <div className={s.filter}>
          <h3>Orientation</h3>
          <ul className={s.filter_list}>
            {orientationData.map((el, i) => {
              const selected = orientation === el.value;
              const orientationIcon = `orientation orientation__${el.value}`;

              return (
                <li key={i} className={s.filter_item}>
                  <button
                    className={clsx(s.filter_button, { selected: selected })}
                    onClick={() => handleOrientation(el.value)}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    <RenderIf isTrue={el.value}>
                      <div className={orientationIcon} />
                    </RenderIf>
                    {el.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={s.filter}>
          <h3>Sort</h3>
          <ul className={s.filter_list}>
            {sortData.map((el, i) => {
              const selected = sort === el.value;

              return (
                <li key={i} className={s.filter_item}>
                  <button
                    className={clsx(s.filter_button, { selected: selected })}
                    onClick={() => handleSort(el.value)}
                  >
                    <RenderIf isTrue={selected}>
                      <MdCheck />
                    </RenderIf>
                    {el.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={s.filter_footer}>
        <button
          className={s.clear_button}
          onClick={handleClear}
          disabled={!orientation && sort !== "latest"}
        >
          Clear
        </button>
        <button className={s.close_button} onClick={handleRoute}>
          {orientation || sort !== "relevant" ? "Apply" : "Close"}
        </button>
      </div>
    </div>
  );
};

export default Filter;
