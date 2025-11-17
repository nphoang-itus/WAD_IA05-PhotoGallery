import axios from "axios";

/**
 * Axios client configured for the Picsum API.
 * Keeping the configuration in a single place makes it
 * easier to swap base URLs or headers later on.
 */
const picsumClient = axios.create({
  baseURL: "https://picsum.photos",
  timeout: 10000,
});

/**
 * Fetch a paginated list of photos.
 * @param {Object} params
 * @param {number} params.page - Current page index (1-based).
 * @param {number} params.limit - Number of items per page.
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPhotoList = ({ page, limit }) =>
  picsumClient.get("/v2/list", {
    params: { page, limit },
  });

/**
 * Fetch detailed information for a single photo.
 * @param {string|number} id
 * @returns {Promise<import("axios").AxiosResponse>}
 */
export const fetchPhotoDetails = (id) =>
  picsumClient.get(`/id/${id}/info`);

export default picsumClient;

