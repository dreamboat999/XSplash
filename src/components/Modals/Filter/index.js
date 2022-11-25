import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import s from "./filter.module.scss";
import { MdCheck, MdOutlineClose } from "react-icons/md";

import { orientationData, sortData } from "../../../utils/FiltersData";
import RenderIf from "../../../utils/RenderIf";
import { useAppContext } from "../../../context";

const Item = ({ title, children }) => {
  return (
    <div className={s.filter}>
      <h3 className={s.filter_title}>{title}</h3>
      <ul className={s.filter_list}>{children}</ul>
    </div>
  );
};

const Filter = () => {
  const history = useNavigate();
  const { modalProps, closeModal } = useAppContext();
  const { data } = modalProps;

  const handleClear = () => {
    history(`/photos/${data?.name}/relevant`);
    closeModal();
  };

  const handleClick = (url) => {
    history(url);
  };

  return (
    <div className={s.modal_inner}>
      <div className={s.modal_head}>
        <h2>Filters</h2>
        <button onClick={closeModal}>
          <MdOutlineClose />
        </button>
      </div>
      <div className={s.items}>
        <Item title="Orientation">
          {orientationData.map((el, i) => {
            const selected = data?.orientation === el.value;
            const url = `/photos/${data?.name}/${data?.sort}${
              el.value ? `/${el.value}` : ""
            }`;
            const orientationIcon = `orientation orientation__${el.value}`;

            return (
              <li key={i} className={s.filter_item}>
                <button
                  className={clsx(s.filter_button, { selected: selected })}
                  onClick={() => handleClick(url)}
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
        </Item>
        <Item title="Sort">
          {sortData.map((el, i) => {
            const selected = data?.sort === el.value;
            const url = `/photos/${data?.name}/${el.value}${
              data?.orientation ? `/${data?.orientation}` : ""
            }`;

            return (
              <li key={i} className={s.filter_item}>
                <button
                  className={clsx(s.filter_button, { selected: selected })}
                  onClick={() => handleClick(url)}
                >
                  <RenderIf isTrue={selected}>
                    <MdCheck />
                  </RenderIf>
                  {el.title}
                </button>
              </li>
            );
          })}
        </Item>
      </div>
      <div className={s.modal_footer}>
        <button className={s.clear_btn} onClick={handleClear}>
          Clear
        </button>
        <button className={s.close_btn} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Filter;
