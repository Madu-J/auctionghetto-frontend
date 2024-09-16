import React from 'react';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from "../styles/MoreDropdown.module.css";


/* This dropdown component is enables edit or delete
functionality for the Auctions and Auctioneer pages
 */
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
));
  
export const MoreDropdown = ({handleEdit, handleDelete}) => {
    return (
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />
  
        <Dropdown.Menu
          className="text-center"
          popperConfig={{strategy: "fixed"}}
        >
        <Dropdown.Item
          className={styles.DropdownItem}
          aria-label="edit"
          onClick={handleEdit}
        >
          <i className="fas fa-edit" /> Edit auction
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            aria-label="delete"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt" /> Delete auction
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
};
  
export function AuctioneerEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} 
      />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/auctioneers/${id}/edit`)}
          aria-label="edit-auctioneer"
        >
          <i className="fas fa-edit" />Edit auctioneer
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/auctioneers/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />Change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/auctioneers/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
