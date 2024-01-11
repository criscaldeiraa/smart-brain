import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  //console.log({imgURL})
  let image2;  // https://reactjs.org/docs/conditional-rendering.html
  if (imageUrl !== '') {
      //<img id="intputIMG" src={imageUrl} alt="User Provided For Checking Faces" width='42%' height='auto' />
      image2 = <img id="inputimage" src={imageUrl} alt="User Provided For Checking Faces" width='500px' height='auto' />;
  } else {
      image2 = <img id="inputimage" src={imageUrl} alt="" width='500px' height='auto' />;
  }

  function imageBox(props) {
    const finalBox = box.map((boxItm, idx)=> (
      <div 
        key={idx} 
        className='bounding-box' 
        style={
          {
            top: boxItm.topRow, 
            right: boxItm.rightCol, 
            bottom: boxItm.bottomRow, 
            left: boxItm.leftCol
            }}>
          </div>))
  }


  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        {image2}
        <imageBox />
        {/* {box.map((box, idx) => (
          <div key={idx} className='bounding-box' style={{top: boxItm.topRow, right: boxItm.rightCol, bottom: boxItm.bottomRow, left: boxItm.leftCol}}></div>
        ))} */}
        {/* <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/> */}
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
      </div>
    </div>
  );
}

export default FaceRecognition;