import axios from "axios";
import { main } from "../../components/Home/faceDetection";
import actionTypes from "../../actionTypes";

export const createRequestJSON = paths => ({
  requests: paths.map(path => ({
    image: {
      source: {
        // DO NOT CHANGE! this is where the demo images are hosted
        imageUri: `gs://${path}`,
      },
    },
    // Hint: You need to ask for some features.
    // See https://cloud.google.com/vision/docs/request#json_request_format
    features: [
      {
        "type":"FACE_DETECTION",
        "maxResults":10
      }
    ],
  })),
});

export const getGoogleVisionUrl = (data, dispatch) => {
  // Construct Google Vision API endpoint path.
  // Hint: You will need to use the `REACT_APP_GOOGLE_VISION_API_KEY` environment variable.
  // Google Vision API Docs: https://cloud.google.com/vision/docs/reference/rest/

  axios
    .post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD6_GOlweRC-QgNCD419L1qrKvOc7DgC1s", data)
    .then(res => {
        dispatch({
          type: actionTypes.GET_FACEANNOTATION_SUCCESS,
          payload: res.data.responses
        })
        // const output = res.data.responses.map(item => main(item))
    })
    .catch(err => {

    });
  return '';
};
