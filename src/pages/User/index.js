import React from "react";
import { useParams } from "react-router-dom";

import UserInfo from "../../components/User/UserInfo";
import Tabs from "../../components/Tabs";
import UserPhotos from "../../components/User/UserPhotos";

const User = () => {
  const { username } = useParams();

  return (
    <>
      <UserInfo username={username} />
      <Tabs style={{ marginBottom: 24 }} />
      <UserPhotos username={username} />
    </>
  );
};

export default User;
