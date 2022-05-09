import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { RANDOM_IMAGE } from "../../utils/Config";
import styles from "./header.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

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
  useClickAway(input);

  const dispatch = useDispatch();
  const { recentArr } = useSelector((state) => state.appState);

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
      dispatch({ type: "ADD_RECENT", payload: value });
      history.push(`/photos/${value}`);
    }
  };

  const handleClearRecent = () => {
    localStorage.removeItem("search");
    dispatch({ type: "CLEAR_RECENT" });
  };

  function useClickAway(ref) {
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
              {/*<button>Search</button>*/}
            </div>
            <div
              className={modal}
              style={{
                display: focus && recentArr.length ? "block" : "none",
              }}
            >
              <div className={modal_items}>
                <div className={modal_title}>
                  <span>Recent Searches</span>
                  <span>•</span>
                  <button type="button" onClick={handleClearRecent}>
                    Clear
                  </button>
                </div>
                <div className={recent_items}>
                  {recentArr
                    .slice(Math.max(recentArr.length - 5, 0))
                    ?.map((el, i) => {
                      return (
                        <div key={i} className={recent_item}>
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
