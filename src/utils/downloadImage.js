const DownloadImage = (e, username, id) => {
  e.preventDefault();

  fetch(e.target.href)
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${username}-${id}.jpg`);
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default DownloadImage;
