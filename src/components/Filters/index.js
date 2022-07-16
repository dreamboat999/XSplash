import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import s from "./filters.module.scss";
import Dropdown from "../Dropdown";
import { setOrientation, setSort } from "../../store/actions";

const orientationButtons = [
  { title: "Landscape", value: "landscape" },
  { title: "Portrait", value: "portrait" },
  { title: "Square", value: "squarish" },
];

const sortButtons = [
  { title: "Relevance", value: "relevant" },
  { title: "Newest", value: "latest" },
];

const Filters = () => {
  const dispatch = useDispatch();
  const [orientationValue, setOrientationValue] = useState("");
  const [sortValue, setSortValue] = useState("relevant");

  const orientationTitle = orientationButtons.find(
    (el) => orientationValue === el.value
  );
  const sortTitle = sortButtons.find((el) => sortValue === el.value);

  useEffect(() => {
    dispatch(setOrientation(orientationValue));
    dispatch(setSort(sortValue));
  }, [orientationValue, sortValue]);

  return (
    <div className={s.filters}>
      <Dropdown
        title={orientationValue ? orientationTitle?.title : "Any orientation"}
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
    </div>
  );
};

export default Filters;
