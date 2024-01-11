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

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        {image2}
        {box.map((boxItm, idx) => (
          <div key={idx} className='bounding-box' style={{top: boxItm.topRow, right: boxItm.rightCol, bottom: boxItm.bottomRow, left: boxItm.leftCol}}></div>
        ))} {/*https://stackoverflow.com/a/64827479/10474024*/}
        {/* <img id='inputimage' alt='' src={imageUrl} width='400px' heigh='auto'/> */}
        {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
      </div>
    </div>
  );
}

export default FaceRecognition;