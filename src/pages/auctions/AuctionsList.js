import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { 
    Form, Container, Col, Row, 
} from 'react-bootstrap';
import { 
    useLocation 
} from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults';
import Asset from "../../components/Asset";
import AuctionList from "./AuctionList";
import appStyles from "../../App.module.css";
import styles from '../../styles/AuctionsList.module.css';
import NoResults from '../../assets/no-results.png';
import { fetchMoreData } from "../../utils/utils";
import PopularAuctioneers from "../auctioneers/PopularAuctioneers";


// Imports Auction component to genereate list of Auctions on the main page.
function AuctionsList({ message, filter = "" }) {
  const [auctions, setAuctions] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await axiosReq.get(`/auctions/?${filter}search=${query}`);
        setAuctions(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAuctions();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularAuctioneers mobile />
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search for  Auction"
          />
        </Form>
        {hasLoaded ? (
          <>
            {auctions.results.length ? (
              <InfiniteScroll
                children={auctions.results.map((auction) => (
                  <AuctionList key={auction.id} {...auction} setAuctions={setAuctions} />
                ))}
                dataLength={auctions.results.length}
                loader={<Asset spinner />}
                hasMore={!!auctions.next}
                next={() => fetchMoreData(auctions, setAuctions)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularAuctioneers />
      </Col>
    </Row>
  );
}

export default AuctionsList;
