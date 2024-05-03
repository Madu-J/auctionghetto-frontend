import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import styles from '../../styles/AuctionCreateEditForm.module.css';
import appStyles from "../../App.module.css";
import btnStyles from '../../styles/Button.module.css';
import { useEffect, useRef, useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

// Component for editing an existing auction.
// Prepopulates the existing data into the form.
function AuctionEditForm() {
  const [errors, setErrors] = useState({});

  const [auctionData, setAuctionData] = useState({
    title: "",
    productcategory: "",
    description: "",
    year: "",
    fueltype: "",
    price: "",
    image: "",
  });

  const {
    title,
    productcategory,
    description,
    year,
    fueltype,
    price,
    image,
  } = auctionData;

   const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/auctions/${id}/`);
        const {
            title,
            productcategory,
            item_products,
            autocategory,
            description,
            auctionstartday,
            year,
            fueltype,
            price,
            image,
            is_owner,
        } = data;

        is_owner
          ? setAuctionData({
              title,
              categories,
              items,
              auto,
              description,
              auctionday,
              year,
              fueltype,
              price,
              image,
            })
          : history.push("/");
      } catch (err) {
      //console.log(err);
    }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setAuctionData({
      ...autotraderData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setAuctionData({
        ...auctionData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("categories", categories);
    formData.append("items", items);
    formData.append("auto", auto);
    formData.append("auctionday", auctionday);
    formData.append("description", description);
    formData.append("year", year);
    formData.append("fueltype", fueltype);
    formData.append("price", price);
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    try {
      await axiosReq.put(`/auctions/${id}/`, formData);
      history.push(`/auctions/${id}`);
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="categories"
          value={brand}
          onChange={handleChange}
        >        
        <option value="home">Home</option>
        <option value="office">Office</option>
        <option value="building">Building</option>
        <option value="vehicle">Vehicle</option>
        <option value="industry">Industry</option>
        <option value="agriculture">Agriculture</option>
        </Form.Control>
        </Form.Group>

        <Form.Group>
        <Form.Label>Items</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="items"
          value={items}
          onChange={handleChange}
        >
          <option value='furniture'>Furniture</option>
          <option value='chair'>Chair</option>
          <option value='table'>Table</option>
          <option value='bicycle'>Bicycle</option>
          <option value='bed'>Bed</option>
          <option value='pc'>PC</option>
          <option value='phones'>Phones</option>
          <option value='other'>Other</option> 
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Autocategory</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="auto"
          value={autocategory}
          onChange={handleChange}
        >
          <option value='car'>Car</option>
          <option value='minibus'>Minibus</option>
          <option value='truck'>Truck</option>
          <option value='bus'>Bus</option>
          <option value='escavator'>Escavator</option>
          <option value='motocycle'>Motocycle</option>
          <option value='other'>Other</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>auctionstartday</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="auctionday"
          value={auctionstartday}
          onChange={handleChange}
        >
          <option value='monday'>Monday</option>
          <option value='tuesday'>Tuesday</option>
          <option value='wednesday'>Wednesday</option>
          <option value='thursday'>Thursday</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          min="0"
          step="1.00"
          name="year"
          value={year}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.year?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Fueltype</Form.Label>
        <Form.Control
          as="select"
          type="text"
          name="fueltype"
          value={fueltype}
          onChange={handleChange}
        >        
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>

        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          min="0"
          step="1.00"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default AuctionEditForm;