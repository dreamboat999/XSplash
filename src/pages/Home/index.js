import React from "react";

import Header from "../../components/Header";
import Images from "../../components/Images";
import PageTitle from "../../utils/pageTitle";

const Home = () => {
  return (
    <PageTitle title="Unsplash">
      <Header />
      <Images />
    </PageTitle>
  );
};

export default Home;
