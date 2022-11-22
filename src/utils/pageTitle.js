import { useEffect } from "react";

const PageTitle = ({ children, title }) => {
  useEffect(() => {
    document.title = title ? `${title} | Unsplash` : "Unsplash";
  }, [title]);
  return <>{children}</>;
};

export default PageTitle;
