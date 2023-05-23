import React from 'react';
import ImageDialog from './ImageDialog';
import { useState } from 'react';
import { Box } from '@mui/material';

const Image = ({ image }) => {
  const { webformatURL, tags } = image;

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 300,
          width: 400,
          m: 2,
          p: 0,
        }}
        alt={tags}
        onClick={toggle}
        src={webformatURL}
      ></Box>
      {show && <ImageDialog image={image} openFromImage={true} />}
    </>
  );
};

export default Image;
