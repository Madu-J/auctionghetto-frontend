import React from 'react';
import styles from '../../styles/Auctioneer.module.css';
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Button from 'react-bootstrap/Button';
import { useSetAuctioneerData } from '../../contexts/AuctioneerDataContext';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

//Component used for auctioneer information and avatar
const Auctioneer = (props) => {
  const { auctioneer, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = auctioneer;
  // console.log(auctioneer)

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetAuctioneerData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/auctioneers/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.PinkOutline}`}
              onClick={() => handleUnfollow(auctioneer)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Pink}`}
              onClick={() => handleFollow(auctioneer)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Auctioneer;

