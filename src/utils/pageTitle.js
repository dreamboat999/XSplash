const PageTitle = ({ children, title }) => {
  document.title = `${title ? `${title} | Unsplash` : "Loading"}`;
  return <>{children}</>;
};

export default PageTitle;
