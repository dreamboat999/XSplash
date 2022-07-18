import React from "react";

import s from "../filters.module.scss";
import { IoMdOptions } from "react-icons/io";
import Dropdown from "../../Dropdown";
import { useMatch } from "../../../hooks/useMatch";
import { orientationButtons, sortButtons } from "../index";

const DesktopFilters = ({
  handleOpenModal,
  orientationValue,
  setOrientationValue,
  sortValue,
  setSortValue,
}) => {
  const match = useMatch();

  const orientationTitle = orientationButtons.find(
    (el) => orientationValue === el.value
  );
  const sortTitle = sortButtons.find((el) => sortValue === el.value);

  if (match) {
    return (
      <>
        <Dropdown
          title={orientationTitle?.title}
          data={orientationButtons}
          value={orientationValue}
          setValue={setOrientationValue}
        />
        <Dropdown
          title={sortTitle?.title}
          data={sortButtons}
          value={sortValue}
          setValue={setSortValue}
        />
      </>
    );
  } else {
    return (
      <button className={s.filters_button} onClick={handleOpenModal}>
        <IoMdOptions />
      </button>
    );
  }
};

export default DesktopFilters;
