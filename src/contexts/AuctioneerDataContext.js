import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followStig, unfollowStig } from "../utils/utils";

export const AuctioneerDataContext = createContext();
export const SetAuctioneerDataContext = createContext();

export const useAuctioneerData = () => useContext(AuctioneerDataContext);
export const useSetAuctioneerData = () => useContext(SetAuctioneerDataContext);

export const AuctioneerDataProvider = ({ children }) => {
  const [auctioneerData, setAuctioneerData] = useState({
    pageAuctioneer: { results: [] },
    popularAuctioneers: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedAuctioneer) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedAuctioneer.id,
      });

      setAuctioneerData((prevState) => ({
        ...prevState,
        pageAuctioneer: {
          results: prevState.pageAuctioneer.results.map((auctioneer) =>
            followStig(auctioneer, clickedAuctioneer, data.id)
          ),
        },
        popularActioneers: {
          ...prevState.popularAuctioneers,
          results: prevState.popularAuctioneers.results.map((auctioneer) =>
            followStig(auctioneer, clickedAuctioneer, data.id)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnfollow = async (clickedAuctioneer) => {
    try {
      await axiosRes.delete(`/followers/${clickedAuctioneer.following_id}/`);

      setAuctioneerData((prevState) => ({
        ...prevState,
        pageAuctioneer: {
          results: prevState.pageAuctioneer.results.map((auctioneer) =>
            unfollowStig(auctioneer, clickedAuctioneer)
          ),
        },
        popularAuctioneers: {
          ...prevState.popularAuctioneers,
          results: prevState.popularAuctioneers.results.map((auctioneer) =>
            unfollowStig(auctioneer, clickedAuctioneer)
          ),
        },
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/auctioneers/?ordering=-followers_count"
        );
        setAuctioneerData((prevState) => ({
          ...prevState,
          popularAuctioneers: data,
        }));
      } catch (err) {
      //console.log(err);
    }
    };
    handleMount();
  }, [currentUser]);

  return (
    <AuctioneerDataContext.Provider value={auctioneerData}>
      <SetAuctioneerDataContext.Provider
        value={{ setAuctioneerData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetAuctioneerDataContext.Provider>
    </AuctioneerDataContext.Provider>
  );
};