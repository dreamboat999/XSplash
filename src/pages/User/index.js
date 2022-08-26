import React from "react";
import { useParams } from "react-router-dom";

import UserInfo from "../../components/User/UserInfo";
import UserPhotos from "../../components/User/UserPhotos";

const User = () => {
  const { username } = useParams();

  return (
    <>
      <UserInfo username={username} />
      <UserPhotos username={username} />
    </>
  );
};

export default User;
