import React from "react";
import s from "./linear.module.scss";

const LinearProgress = ({ loading, children }) => {
  if (loading) {
    return (
      <div className={s.linear_outer}>
        <div className={s.linear_inner} />
      </div>
    );
  } else {
    return children;
  }
};

export default LinearProgress;
