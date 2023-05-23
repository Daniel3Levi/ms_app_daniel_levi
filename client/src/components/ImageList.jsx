import React from 'react';
import Image from './Image';

const ImageList = ({ images }) => {
  return (
    <>
      {images.map((image) => (
        <Image key={image.id} image={image} />
      ))}
    </>
  );
};

export default ImageList;
