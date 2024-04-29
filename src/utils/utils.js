import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followStig = (auctioneer, clickedAuctioneer, following_id) => {
  return auctioneer.id === clickedAuctioneer.id
    ? // This is the auctioneer being clicked on,
      // its followers count will update and set its following id
      {
        ...auctioneer,
        followers_count: auctioneer.followers_count + 1,
        following_id,
      }
    : auctioneer.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...auctioneer, following_count: auctioneer.following_count + 1 }
    : // this is not the profile the user clicked on or the proflie
      // the user owns, so just return it unchanged
      auctioneer;
};

export const unfollowStig = (auctioneer, clickedAuctioneer) => {
  return auctioneer.id === clickedAuctioneer.id
    ? // This is the profile I clicked on,
      // update its followers count and set its following id
      {
        ...auctioneer,
        followers_count: auctioneer.followers_count - 1,
        following_id: null,
      }
    : auctioneer.is_owner
    ? // This is the profile of the logged in user
      // update its following count
      { ...auctioneer, following_count: auctioneer.following_count - 1 }
    : // this is not the profile the user clicked on
      auctioneer;
};

export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
