import moment from 'moment';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let lastCategory = '';
let imagesDataList = '';
let dataList = '';

export const getImages = async (req, res) => {
  const { category, page, sortBy } = req.query;

  if (category === lastCategory && imagesDataList) {
    dataList = imagesDataList;
  } else {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`,
        { httpsAgent }
      );
      dataList = response.data.hits;
      imagesDataList = dataList;
      lastCategory = category;
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong, please try again');
    }
  }

  // ?sortBy=id ?sortBy=date
  try {
    if (sortBy === 'id') {
      dataList.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'date') {
      // slice date from the previewURL and sort from the latest --> newest
      dataList.sort(
        (a, b) =>
          moment(b.previewURL.slice(30, 46), 'YYYY/MM/DD/HH/mm') -
          moment(a.previewURL.slice(30, 46), 'YYYY/MM/DD/HH/mm')
      );
    } else {
      // Invalid query parameter
      res.status(400).send(` Bad Request - Invalid query parameter: ${sortBy}`);
      return;
    }
    //page result setup navgation

    const limitRows = 9;
    const startRows = (page - 1) * limitRows;
    const endRows = startRows + limitRows;
    const currentRows = dataList.slice(startRows, endRows);
    const totalRows = dataList.length;

    res.send({
      items: currentRows,
      currentPage: page,
      totalPages: Math.ceil(totalRows / limitRows),
      totalRows: totalRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong, please try again.');
  }
};
