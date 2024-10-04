import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Image, Col } from 'react-bootstrap';
import styles from "../../styles/AuctioneerPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from '../../App.module.css';
import Asset from '../../components/Asset';
import { useParams } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useAuctioneerData,
  useSetAuctioneerData,
} from '../../contexts/AuctioneerDataContext';
import PopularAuctioneers from "./PopularAuctioneers";
import InfiniteScroll from "react-infinite-scroll-component";
import Auction from "../auctions/Auction";
import { fetchMoreData } from '../../utils/utils';
import NoResults from '../../assets/no-results.png';
import { AuctioneerEditDropdown } from '../../components/MoreDropdown';


/* Displays information comprehensively about auctioneer, owner of a profile.
This component includes functionality to view all the auction listed by the auctioneer,
as well as follower/following statistics.*/
const AuctioneerPage = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setAuctioneerData, handleFollow, handleUnfollow } = useSetAuctioneerData();
    const { pageAuctioneer } = useAuctioneerData();
    const [auctioneer] = pageAuctioneer.results;
    const is_owner = currentUser?.username === auctioneer?.owner;
    const [auctioneerAuctions, setAuctioneerAuctions] = useState({ results: [] });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [{ data: pageAuctioneer }, { data: auctioneerAuctions }] =
            await Promise.all([
              axiosReq.get(`/auctioneers/${id}/`),
              axiosReq.get(`/auctions/?owner__auctioneer=${id}`),
            ]);
          setAuctioneerData((prevState) => ({
            ...prevState,
            pageAuctioneer: { results: [pageAuctioneer] },
          }));
          setAuctioneerAuctions(auctioneerAuctions);
          setHasLoaded(true);
        } catch (err) {
        //console.log(err);
      }
      };
      fetchData();
    }, [id, setAuctioneerData]);
  
    const mainAuctioneer = (
      <>
        {auctioneer?.is_owner && <AuctioneerEditDropdown id={auctioneer?.id} />}
        <Row noGutters className="px-3 text-center">
          <Col lg={3} className="text-lg-left">
            <Image
              className={styles.AuctioneerImage}
              roundedCircle
              src={auctioneer?.image}
            />
          </Col>
          <Col lg={6}>
            <h3 className="m-2">{auctioneer?.owner}</h3>
            <Row className="justify-content-center no-gutters">
              <Col xs={3} className="my-2">
                <div>{auctioneer?.auctions_count}</div>
                <div>auctions</div>
              </Col>
              <Col xs={3} className="my-2">
                <div>{auctioneer?.followers_count}</div>
                <div>followers</div>
              </Col>
              <Col xs={3} className="my-2">
                <div>{auctioneer?.following_count}</div>
                <div>following</div>
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="text-lg-right">
            {currentUser &&
              !is_owner &&
              (auctioneer?.following_id ? (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                  onClick={() => handleUnfollow(auctioneer)}
                >
                  unfollow
                </Button>
              ) : (
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Black}`}
                  onClick={() => handleFollow(auctioneer)}
                >
                  follow
                </Button>
              ))}
          </Col>
          <Row className="justify-content-center">
            <Col>
              {auctioneer?.description && (
                <Row className="text-left p-3">{auctioneer.description}</Row>
              )}
              <Col>
                <p className="font-weight-bold">Auctioneer Contact</p>
                {auctioneer?.name && <p>Auctioneer: {auctioneer.name}</p>}
                {auctioneer?.city && <p>City: {auctioneer.city}</p>}
                {auctioneer?.postcode && <p>Postcode: {auctioneer.postcode}</p>}
                {auctioneer?.street_address && (
                  <p>Street: {auctioneer.street_address}</p>
                )}
                {auctioneer?.email && <p>Email: {auctioneer.email}</p>}
                {auctioneer?.phone && <p>Phone: {auctioneer.phone}</p>}
              </Col>
            </Col>
          </Row>
        </Row>
      </>
    );
  
    const mainAuctioneerPosts = (
      <>
        <hr />
        <p className="text-center">
          Auctions currently for sale by {auctioneer?.owner}:
        </p>
        <hr />
        {auctioneerAuctions.results.length ? (
          <InfiniteScroll
            children={auctioneerAuctions.results.map((auction) => (
              <Auction key={auction.id} {...auction} setAuctions={setAuctioneerAuctions} />
            ))}
            dataLength={auctioneerAuctions.results.length}
            loader={<Asset spinner />}
            hasMore={!!auctioneerAuctions.next}
            next={() => fetchMoreData(auctioneerAuctions, setAuctioneerAuctions)}
          />
        ) : (
          <Asset
            src={NoResults}
            message={`No results found, ${auctioneer?.owner} hasn't posted yet.`}
          />
        )}
      </>
    );
  
    return (
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularAuctioneers mobile />
          <Container className={appStyles.Description}>
            {hasLoaded ? (
              <>
                {mainAuctioneer}
                {mainAuctioneerPosts}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularAuctioneers />
        </Col>
      </Row>
    );
};
  
export default AuctioneerPage;
  