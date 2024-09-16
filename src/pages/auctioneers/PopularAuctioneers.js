import React from 'react';
import appStyles from '../../App.module.css';
import Container from 'react-bootstrap/Container';
import Auctioneer from './Auctioneer';
import { useAuctioneerData } from '../../contexts/AuctioneerDataContext';
import Asset from '../../components/Asset';

// To create sideBar with top sellers
const PopularAuctioneers = ({ mobile }) => {
  const { popularAuctioneers } = useAuctioneerData();

  return (
    <Container
      className={`${appStyles.Description} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularAuctioneers.results.length ? (
        <>
          <p className="font-weight-bold text-center">Highly Popular:</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularAuctioneers.results.slice(0, 4).map((auctioneer) => (
                <Auctioneer key={auctioneer.id} auctioneer={auctioneer} mobile />
              ))}
            </div>
          ) : (
            popularAuctioneers.results.map((auctioneer) => (
              <Auctioneer key={auctioneer.id} auctioneer={auctioneer} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularAuctioneers;