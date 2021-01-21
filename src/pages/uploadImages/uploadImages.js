import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//Components
import Navbar from "../../components/navbar/navbar";

//CSS
import "./uploadImages.scss";

//REDUX
import { connect } from "react-redux";
import {
  uploadLicenseImage,
  uploadAlternateImage,
} from "../../redux/actions/userActions";

function UploadImages(props) {
  const [errors, setErrors] = useState({});
  const [isLicenseImageUploaded, setIsLicenseImageUploaded] = useState(false);
  const [isAlternateImageUploaded, setIsAlternateImageUploaded] = useState(
    false
  );

  //Destructure props
  const {
    UI: { loading },
    user: { licenseImageURL, alternateIDImageURL },
  } = props;

  //Update error state when errors passed from props is changed
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  //Update state when imageURLs are updated
  useEffect(() => {
    licenseImageURL && setIsLicenseImageUploaded(true);
  }, [licenseImageURL]);

  useEffect(() => {
    alternateIDImageURL && setIsAlternateImageUploaded(true);
  }, [alternateIDImageURL]);

  //Clicks on hidden input field
  const handleLicenseImageUpload = () => {
    const fileInput = document.getElementById("licenseImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleLicenseImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadLicenseImage(formData);
  };

  //Clicks on hidden input field
  const handleAlternateImageUpload = () => {
    const fileInput = document.getElementById("alternateImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleAlternateImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadAlternateImage(formData);
  };

  return (
    <div className="login_main">
      <Navbar />
      <Container className="container-main">
        <Row>
          <Col>
            <Card className="card upload-card">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <p className="upload-label">Upload an image of your license</p>
                <p
                  hidden={!isAlternateImageUploaded}
                  className="image-uploaded-text"
                >
                  [Successfully uploaded]
                </p>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  onClick={handleLicenseImageUpload}
                >
                  {isLicenseImageUploaded
                    ? "Upload Again"
                    : "Upload license image"}
                </Button>
                <input
                  type="file"
                  id="licenseImageInput"
                  onChange={handleLicenseImageChange}
                  hidden="hidden"
                  accept=".png, .jpeg, .jpg"
                />
                <p className="error-text" hidden={!errors.licenseImage}>
                  {errors.licenseImage}
                </p>
                <p className="upload-label">Upload an alternate ID image</p>
                <p
                  hidden={!isAlternateImageUploaded}
                  className="image-uploaded-text"
                >
                  [Successfully uploaded]
                </p>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleAlternateImageUpload}
                  disabled={loading}
                >
                  {isAlternateImageUploaded
                    ? "Upload Again"
                    : "Upload alternate image"}
                </Button>
                <input
                  type="file"
                  id="alternateImageInput"
                  onChange={handleAlternateImageChange}
                  hidden="hidden"
                  accept=".png, .jpeg, .jpg"
                />

                <p className="error-text" hidden={!errors.alternateImage}>
                  {errors.alternateImage}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h2 className="title">UPLOAD IDENTIFICATION IMAGES</h2>
            <p className="description">
              Fringilla ut morbi tincidunt augue interdum velit euismod in
              pellentesque. At risus viverra adipiscing at in tellus integer. Id
              aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet
              id donec ultrices tincidunt. Bibendum at varius vel pharetra.
              Viverra adipiscing at in tellus integer. Amet volutpat consequat
              mauris nunc congue nisi vitae suscipit. Pretium viverra
              suspendisse potenti nullam ac tortor. Et egestas quis ipsum
              suspendisse. Cursus in hac habitasse platea dictumst quisque. Mi
              proin sed libero enim sed faucibus turpis in eu.
            </p>
            <Button
              variant="primary"
              type="submit"
              disabled={!isLicenseImageUploaded || !isAlternateImageUploaded}
              href="/"
            >
              Proceed to home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

UploadImages.propTypes = {
  uploadLicenseImage: PropTypes.func.isRequired,
  uploadAlternateImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadLicenseImage,
  uploadAlternateImage,
};

export default connect(mapStateToProps, mapActionsToProps)(UploadImages);
