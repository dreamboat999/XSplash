import React from "react";
import s from "./loading.module.scss";

export const LinearProgress = ({ loading, children }) => {
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

export const Spinner = ({ loading, children }) => {
  if (loading) {
    return <div className={s.spinner} />;
  } else {
    return children;
  }
};
