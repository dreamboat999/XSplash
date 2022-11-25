import React from "react";

import s from "./masonry.module.scss";

const Masonry = ({ children }) => {
  function getColumns() {
    const columns = Array.from({ length: 3 }, () => []);

    React.Children.forEach(children, (child, index) => {
      if (child && React.isValidElement(child)) {
        columns[index % 3].push(child);
      }
    });

    return columns;
  }

  function renderColumns() {
    return getColumns().map((el, i) => (
      <div key={i} className={s.masonry_column}>
        {el.map((item) => item)}
      </div>
    ));
  }

  return <div className={s.masonry_block}>{renderColumns()}</div>;
};

export default Masonry;
