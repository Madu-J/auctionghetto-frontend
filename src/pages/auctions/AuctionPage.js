import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { 
    useParams 
} from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import PopularAuctioneers from '../auctioneers/PopularAuctioneers';
import Auction from './Auction';

// This component creates auctionpage
// Imports the Auction and Popularauctioneer component
function AuctionPage() {
    const { id } = useParams();
    const [auction, setAuction] = useState({ results: [] });
  
    useEffect(() => {
      const handleMount = async () => {
        try {
          const [{ data: auction}] = await Promise.all([
              axiosReq.get(`/auctions/${id}`),
            ]);
            setAuction({ results: [auction]});
          } catch (err) {
          console.log(err);
        }
        };
       
        handleMount();
      }, [id]);
   
      return (
        <Row className="h-100">
          <Col className="py-2 p-0 p-lg-2" lg={8}>
            <PopularAuctioneers mobile />
            <Auction {...auction.results[0]} setAuctions={setAuction} auctionPage />
          </Col>
          <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
            <PopularAuctioneers />
          </Col>
        </Row>
      );
    }
   
    export default AuctionPage;