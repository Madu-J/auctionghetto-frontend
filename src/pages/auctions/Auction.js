import React from "react";
import {
  Row, Col, Media, Tooltip, 
  Card, OverlayTrigger 
 } from 'react-bootstrap';
import { Link, useHistory  } from 'react-router-dom';

import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Auction.module.css";


/* Component used for creating the Auctionghetto post information */
const Auction = (props) => {
  const {
    id,
    owner,
    auctioneer_id,
    auctioneer_image,
    bookmark_id,
    title,
    categories,
    products,
    auctionday,
    description,
    year,
    price,
    image,
    updated_at,
    auctionPage,
    setAuctions,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

   /* Bookmark your favorite auction */
   const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { auction: id });
      setAuctions((setAuctions) => ({
        ...setAuctions,
        results: setAuctions.results.map((auction) => {
          return auction.id === id ? { ...auction, bookmark_id: data.id } : auction;
        }),
      }));
    } catch (err) {
     // console.log(err);
    }
  };

   /* Delete auction from bookmarked auctions */
  const handleDeleteBookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
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
  const handleEdit = () => {
    history.push(`/auctions/${id}/edit`);
  };

  /* Delete auctioghetto posting */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/auctions/${id}/`);
      history.goBack();
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Card className={styles.Auction}>
      <Card.Body>
      <Media className="align-items-center justify-content-around">
            <span>Sold by:</span>
            <Link to={`/auctioneers/${auctioneer_id}`}>
              <Avatar src={auctioneer_image} height={40} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>Added: {updated_at}</span>
              {is_owner && auctionPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
          </div>
        </Media>
      </Card.Body>
        <Link to={`/auctions/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
      <Card.Body>
        {title && <Card.Title className="text-left">{title}</Card.Title>}
          {description && (
            <Card.Text className="text-left mb-5">{description}</Card.Text>
          )}
      <div className={styles.PostBar}>
        {is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>User cannot bookmark own listed item!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        ) : bookmark_id ? (
          <span onClick={handleDeleteBookmark}>
            <i className={`fas fa-heart ${styles.Heart}`} />
          </span>
        ) : currentUser ? (
          <span onClick={handleBookmark}>
            <i className={`far fa-heart ${styles.HeartOutline}`} />
          </span>
        ) : (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Log in to bookmark an auction!</Tooltip>}
          >
            <i className="far fa-heart" />
          </OverlayTrigger>
        )}
      </div>
        <Row className="mb-2 text-left no-gutters">
          <Col>
              <Row>
                  <Col className="d-inline-block" xs={3}>
                  <i className="fa-solid fa-shop"></i>
                  </Col>
                  <Col className="d-inline-block" xs={9}>
                    <span className="d-block text-muted">Categories</span>
                    <span className="font-weight-bold text-capitalize">
                      {categories}
                    </span>
                  </Col>
              </Row>
          </Col>
          <Col>
              <Row>
                  <Col className="d-inline-block" xs={3}>
                    <i className="fa-solid fa-cart-flatbed"></i>
                </Col>
                <Col className="d-inline-block" xs={9}>
                  <span className="d-block text-muted">Products</span>
                  <span className="font-weight-bold">{products}</span>
                </Col>
            </Row>
          </Col>
          <Col>
              <Row>
                <Col className="d-inline-block" xs={3}>
                <i className="fa-solid fa-calendar-day"></i>
                </Col>
                <Col className="d-inline-block" xs={9}>
                  <span className="d-block text-muted">Auctionday</span>
                  <span className="font-weight-bold">{auctionday}</span>
                </Col>
              </Row>
            </Col>
        </Row>
        <Row className="mb-5 text-left no-gutters">
          <Col>
              <Row>
                <Col className="d-inline-block" xs={3}>
                  <i className="fa-solid fa-calendar-days"></i>
                </Col>
                <Col className="d-inline-block" xs={9}>
                  <span className="d-block text-muted">Year</span>
                  <span className="font-weight-bold text-capitalize">
                    {year}
                    </span>
                </Col>
              </Row>
          </Col>
          <Col>
              <Row>
                <Col className="d-inline-block" xs={3}></Col>
                <Col className="d-inline-block" xs={9}>
                  <span className="d-block text-muted">Price</span>
                  <span className="font-weight-bold">{price}€</span>
                </Col>
              </Row>
            </Col>
          </Row>
      </Card.Body>
    </Card>
  );
};

export default Auction;