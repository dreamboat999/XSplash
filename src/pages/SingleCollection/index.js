import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCollection } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";

const SingleCollection = () => {
  const { id, name } = useParams();
  const [collectionImages, setCollectionImages] = useState([]);

  useEffect(() => {
    getCollection(id)
      .then((res) => {
        setCollectionImages(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return <ImagesGrid name={name} images={collectionImages} />;
};

export default SingleCollection;
