import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getSearchImages } from "../../api";

const Test = () => {
  const { value, orientation, sort } = useParams();

  console.log(orientation);
  console.log(sort);

  // useEffect(() => {
  //   getSearchImages(1, value, orientation, sort).then((res) => {
  //     console.log(res);
  //   });
  // });

  return (
    <div style={{ padding: 20 }}>
      <div style={{ padding: 10 }}>
        <Link style={{ margin: 10 }} to={`/photoss/${value}`}>
          All
        </Link>
        <Link style={{ margin: 10 }} to={`/photoss/${value}/landscape`}>
          landscape
        </Link>
        <Link style={{ margin: 10 }} to={`/photoss/${value}/portrait`}>
          portrait
        </Link>
        <Link style={{ margin: 10 }} to={`/photoss/${value}/squarish`}>
          square
        </Link>
      </div>
      <div style={{ padding: 10 }}>
        <Link
          style={{ margin: 10 }}
          to={`/photoss/${value}${orientation ? `/${orientation}` : ""}`}
        >
          relevant
        </Link>
        <Link
          style={{ margin: 10 }}
          to={`/photoss/${value}${orientation ? `/${orientation}` : ""}/latest`}
        >
          latest
        </Link>
      </div>
    </div>
  );
};

export default Test;
