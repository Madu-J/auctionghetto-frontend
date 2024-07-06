import React from 'react';
import './BookmarkAuctionForm.css';
import { axiosReq } from "../api/axiosDefaults";
import PropTypes from 'prop-types';

class BookmarkAuctionForm extends React.Component {
    constructor() {
        super();
        this.state = {
            auctionId: '',
            errorMessage: false
        };
    }
    handleSubmit = event => {
        event.preventDefault();
        let userInput = this.state.auctionId;
        if (Validation(userInput)) {
            this.props.addAuction(userInput);
            this.setState({
                auctionId: '',
                errorMessage: false
            });
        } else {
            this.setState({ errorMessage: true });
        }
    };
    updateInputState = event => {
        this.setState({ auctionId: event.target.value });
    };
    render() {
        return (
            <div className="bookmark-form-container">
                <form onSubmit={this.handleSubmit} className="bookmark-form">
                    <input
                        type="text"
                        value={this.state.auctionId}
                        onChange={this.updateInputState}
                        placeholder="Add auction id"
                        autoFocus
                        required
                    />
                    <input type="submit" value="Submit" />
                </form>
                {this.state.errorMessage && (
                    <div id="error-message">Unknown auction id</div>
                )}
            </div>
        );
    }
}
BookmarkAuctionForm.propTypes = {
    addAuction: PropTypes.func
};

export default BookmarkAuctionForm;