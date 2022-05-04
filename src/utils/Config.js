const API_URL = "https://api.unsplash.com/";
const SECRET_KEY = "IUgXugRv2_py-RXNsbEV_V53Mqv_7HHKmZU622XZM3Y";

const IMAGES_LIST = `${API_URL}photos?client_id=${SECRET_KEY}`;
const RANDOM_IMAGE = `${API_URL}photos/random?client_id=${SECRET_KEY}`;
const SEARCH_IMAGE = `${API_URL}search/photos?client_id=${SECRET_KEY}`;

export { IMAGES_LIST, RANDOM_IMAGE, SEARCH_IMAGE };
