import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import s from "./styles.module.scss";
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
  const location = useLocation();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = location.pathname;
  const slug = pathname.slice(7, pathname.length);

  useEffect(() => {
    setLoading(true);
    getTopics()
      .then((res) => {
        setTopics(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div className={s.topics_wrapper}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {topics.map((topic) => {
          return (
            <div key={topic.id} className={s.topic}>
              <Link
                to={`/topic/${topic.slug}`}
                className={topic.slug === slug ? s.active_topic : ""}
              >
                {topic.title}
              </Link>
            </div>
          );
        })}
      </ScrollMenu>
    </div>
  );
};

export default Topics;
