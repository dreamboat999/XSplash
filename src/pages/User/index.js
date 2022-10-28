import React from "react";
import { useParams } from "react-router-dom";

import UserInfo from "../../components/User/UserInfo";
import UserPhotos from "../../components/User/UserPhotos";
import PageTitle from "../../utils/pageTitle";

const User = () => {
  const { username } = useParams();

  return (
    <PageTitle title={username ? `@${username}` : "Loading"}>
      <UserInfo username={username} />
      <UserPhotos username={username} />
    </PageTitle>
  );
};

export default User;
