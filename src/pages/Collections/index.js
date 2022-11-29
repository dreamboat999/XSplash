import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSearchCollections } from "../../api";
import CollectionsGrid from "../../components/CollectionsGrid";

const Collections = () => {
  const { name } = useParams();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getSearchCollections(name)
      .then((response) => {
        setCollections(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return <CollectionsGrid name={name} collections={collections} />;
};

export default Collections;
