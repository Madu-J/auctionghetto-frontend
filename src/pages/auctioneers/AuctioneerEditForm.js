import React, { 
  useState, useEffect, useRef 
} from 'react';
import { 
  useHistory, useParams 
} from 'react-router-dom';
import { 
  Container, Form, Alert, 
  Col, Row, Image, Button 
} from 'react-bootstrap';
import { 
  axiosReq 
} from '../../api/axiosDefaults';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../../contexts/CurrentUserContext';
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


/* Component includes the form for creating or updating
user profile and error handling input fields */
const AuctioneerEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [auctioneerData, setAuctioneerData] = useState({
    name: "",
    description: "",
    street_address: "",
    city: "",
    postcode: "",
    email: "",
    phone: "",
    image: "",
  });

  const {
    name,
    description,
    street_address,
    city,
    postcode,
    email,
    phone,
    image,
  } = auctioneerData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.auctioneer_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/auctioneers/${id}/`);
          const {
            name,
            description,
            street_address,
            city,
            postcode,
            email,
            phone,
            image,
          } = data;

          setAuctioneerData({
            name,
            description,
            street_address,
            city,
            postcode,
            email,
            phone,
            image,
          });
        } catch (err) {
          //console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setAuctioneerData({
      ...auctioneerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('street_address', street_address);
    formData.append('postcode', postcode);
    formData.append('city', city);
    formData.append('email', email);
    formData.append('phone', phone);

    if (imageFile?.current?.files[0]) {
      formData.append('auctioneer_image', imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/auctioneers/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        auctioneer_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      //console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={handleChange}
          name="description"
          rows={7}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.city?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Street address</Form.Label>
        <Form.Control
          type="text"
          name="street_address"
          value={street_address}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.street_address?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Postcode</Form.Label>
        <Form.Control
          type="text"
          name="postcode"
          value={postcode}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.postcode?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.phone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Description}>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Change image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setAuctioneerData({
                      ...auctioneerData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Description}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default AuctioneerEditForm;
