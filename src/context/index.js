import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const recentFromLocalStorage = JSON.parse(
  localStorage.getItem("recent") || "[]"
);

const AppContextProvider = ({ children }) => {
  const [recent, setRecent] = useState(recentFromLocalStorage);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  const handleOpenModal = (id) => {
    setIsOpenModal(true);
    setImageId(id);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setImageId(null);
  };

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [recent]);

  useEffect(() => {
    if (isOpenModal) {
      document.querySelector("body").className = "disable_scroll";
    } else {
      document.querySelector("body").className = "";
    }
  }, [isOpenModal]);

  return (
    <AppContext.Provider
      value={{
        recent,
        setRecent,
        isOpenModal,
        imageId,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
