import React from "react";

import Header from "../components/Header";
import MainImageList from "../components/Images";
import PageTitle from "../utils/pageTitle";

const Home = () => {
  return (
    <PageTitle title="Unsplash">
      <Header />
      <MainImageList />
    </PageTitle>
  );
};

export default Home;
