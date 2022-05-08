import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { RANDOM_IMAGE } from "../../utils/Config";
import styles from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const {
  header_outer,
  header_inner,
  search_wrapper,
  search,
  modal,
  modal_items,
  modal_title,
  recent_items,
  recent_item,
} = styles;

const Header = () => {
  const history = useHistory();
  const input = useRef(null);
  const [randomImage, setRandomImage] = useState("");
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  let recent = JSON.parse(localStorage.getItem("search") || "[]");
  useOutsideAlerter(input);

  // useEffect(() => {
  //   axios
  //     .get(`${RANDOM_IMAGE}&orientation=landscape&count=1`)
  //     .then((response) => {
  //       setRandomImage(response.data[0].urls.regular);
  //     });
  // }, []);

  const backgroundImage = {
    background: `#1d1d1f url(${randomImage}) no-repeat center center/cover`,
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value) {
      history.push(`/photos/${value}`);

      if (recent === null) {
        recent = [];
      }
      recent.push(value);
      localStorage.setItem("search", JSON.stringify(recent));
    }
  };

  const handleClearRecent = () => {
    localStorage.removeItem("search");
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setFocus(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className={header_outer} style={backgroundImage}>
      <div className="container">
        <div className={header_inner}>
          <form className={search_wrapper} onSubmit={handleSubmit} ref={input}>
            <div className={search}>
              <span>
                <AiOutlineSearch />
              </span>
              <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                onClick={() => setFocus(true)}
              />
            </div>
            <div
              className={modal}
              style={{
                display: focus && recent.length ? "block" : "none",
              }}
            >
              <div className={modal_items}>
                <div className={modal_title}>
                  <span>Recent Searches</span>
                  <span>•</span>
                  <button onClick={handleClearRecent}>Clear</button>
                </div>
                <div className={recent_items}>
                  {recent.slice(Math.max(recent.length - 5, 0))?.map((el) => {
                    return (
                      <div key={el} className={recent_item}>
                        {el}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
