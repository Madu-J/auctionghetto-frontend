import React from 'react';
import {
    Row, Col,  OverlayTrigger, Card, Tooltip 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Auction.module.css';
import { axiosRes } from '../../api/axiosDefaults';


// This component creates each Auction on the landing page
// AuctionList component genereates the complete list of Auctions.
const AuctionList = (props) => {
    const {
      id,
      owner,
      auctioneer_id,
      bookmark_id,
      title,
      year,
      item_products,
      fueltype,
      price,
      image,
      updated_at,
      setAuctions,
    } = props;
  
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
  
    const handleBookmark = async () => {
      try {
        const { data } = await axiosRes.post("/saved/", { auction: id });
        setAuctions((setAuctions) => ({
          ...setAuctions,
          results: setAuctions.results.map((auction) => {
            return auction.id === id ? { ...auction, bookmark_id: data.id } : auction;
          }),
        }));
      } catch (err) {
        //console.log(err);
      }
    };
  
    const handleUnbookmark = async () => {
      try {
        await axiosRes.delete(`/bookmarked/${bookmark_id}/`);
        setAuctions((setAuctions) => ({
          ...setAuctions,
          results: setAuctions.results.map((auction) => {
            return auction.id === id ? { ...auction, bookmark_id: null } : auction;
          }),
        }));
      } catch (err) {
        //console.log(err);
      }
    };
    return (
      <Card className={styles.Auction}>
        <Card.Body>
          <Row>
            <Col xs={5}>
              <Link to={`/auctions/${id}`}>
                <Card.Img src={image} alt={title} />
              </Link>
            </Col>
  
            <Col xs={7}>
              <Row className="text-right">
                <Col className={styles.PostBar}>
                  {is_owner ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>You cannot bookmark your own listed item!</Tooltip>}
                    >
                      <i className="far fa-heart" />
                    </OverlayTrigger>
                  ) : bookmark_id ? (
                    <span onClick={handleUnbookmark}>
                      <i className={`fas fa-bookmark ${styles.Bookmark}`} />
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleBookmark}>
                      <i className={`fas fa-bookmark ${styles.BookmarkOutline}`} />
                    </span>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to bookmark auction!</Tooltip>}
                    >
                      <i className="fas fa-bookmark" />
                    </OverlayTrigger>
                  )}
  
                  <span>{updated_at}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link to={`/auctions/${id}`}>
                    {title && (
                      <Card.Title className="text-left">{title}</Card.Title>
                    )}
                  </Link>
                </Col>
              </Row>
  
              <Row>
                <Col className="d-flex justify-content-between">
  
                  <div>
                    <i className="fa-solid fa-calendar-days"></i>
                    {year}
                  </div>
                  <div>
                    <i className="fa-solid fa-bookmark"></i>
                    {item_products}
                  </div>
                  
                  <div className="text-capitalize">
                    <i className="fa-solid fa-gas-pump"></i>
                    {fueltype}
                  </div>
                </Col>
              </Row>
  
              <Row>
                <Col className="d-flex justify-content-between mt-1">
                  <div className="font-weight-bold">{price}€</div>
                  <div>
                    <span>Seller:&nbsp;</span>
                    <Link to={`/auctioneers/${auctioneer_id}`}>{owner}</Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };
  
  export default AuctionList;
  