import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import s from "./topics.module.scss";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { getTopics } from "../../api";
import clsx from "clsx";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  if (isFirstItemVisible) return null;

  return (
    <button
      onClick={() => scrollPrev()}
      className={clsx(s.arrow_button, s.arrow_left)}
    >
      <MdArrowBackIosNew />
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  if (isLastItemVisible) return null;

  return (
    <button
      onClick={() => scrollNext()}
      className={clsx(s.arrow_button, s.arrow_right)}
    >
      <MdArrowForwardIos />
    </button>
  );
};

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((res) => {
        setTopics(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {topics.map((topic) => {
        return (
          <div key={topic.id} className={s.topic}>
            <Link to="a">{topic.title}</Link>
          </div>
        );
      })}
    </ScrollMenu>
  );
};

export default Topics;
