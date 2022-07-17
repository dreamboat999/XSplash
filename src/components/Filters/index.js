import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import s from "./filters.module.scss";
import DesktopFilters from "./DesktopFilters";
import MobileFilters from "./MobileFilters";
import RenderIf from "../../utils/renderIf";
import { setOrientation, setSort } from "../../store/actions";

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

const Filters = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [orientationValue, setOrientationValue] = useState("");
  const [sortValue, setSortValue] = useState("relevant");

  useEffect(() => {
    dispatch(setOrientation(orientationValue));
    dispatch(setSort(sortValue));
  }, [orientationValue, sortValue]);

  useEffect(() => {
    if (openModal) {
      document.querySelector("body").className = "disable_scroll";
    } else {
      document.querySelector("body").className = "";
    }
  }, [openModal]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className={s.filters}>
      <DesktopFilters
        handleOpenModal={handleOpenModal}
        orientationValue={orientationValue}
        setOrientationValue={setOrientationValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <RenderIf isTrue={openModal}>
        <MobileFilters
          orientationValue={orientationValue}
          setOrientationValue={setOrientationValue}
          sortValue={sortValue}
          setSortValue={setSortValue}
          setOpenModal={setOpenModal}
        />
      </RenderIf>
    </div>
  );
};

export default Filters;
