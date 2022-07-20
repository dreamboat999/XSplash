const PageTitle = ({ children, title }) => {
  document.title = `${title ? title : "Loading"}`;
  return <>{children}</>;
};

export default PageTitle;
