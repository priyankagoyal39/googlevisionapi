import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import data from '../../data';
import { createRequestJSON, getGoogleVisionUrl } from "../../actions/annotate";
import { main } from "../../components/Home/faceDetection";

const getData = () => data;
const storageBase = 'https://storage.googleapis.com/';

export default function Home() {
  const images = getData();
  const annotateData = useSelector(state => state.annotate);
  const [filteredImages] = useState(images);
  const dispatch = useDispatch();
  const requestJSON = createRequestJSON(filteredImages);
  if(annotateData.faceAnnotation.length !== 0){
    const data = annotateData.faceAnnotation;
    // main(data[0], storageBase + filteredImages[0]);
  }
  useEffect(() => {
    // code to run on component mount
    getGoogleVisionUrl(requestJSON, dispatch);
  }, [])
  

  return (
    <React.Fragment>
      <input placeholder="Filter by keyword (e.g. people, plants, chairs)" />

      <div>
        {filteredImages.map((path, index) => (
          <img
            alt=""
            key={index}
            src={storageBase + filteredImages[index]} />
        ))}
      </div>
    </React.Fragment>
  );
}
