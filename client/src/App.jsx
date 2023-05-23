import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  fetchImagesWithParams,
  getPage,
  getCategory,
  getSortBy,
  pageReset,
} from './actions/fatchData';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormLabel,
  Typography,
  Grid,
  Paper,
  FormControl,
} from '@mui/material';
import ImageList from './components/ImageList';

const state = (state) => {
  return {
    images: state.images,
    page: state.page,
    category: state.category,
    sortBy: state.sortBy,
  };
};

const actions = {
  fetchImagesWithParams,
  getPage,
  getCategory,
  getSortBy,
  pageReset,
};

const App = ({
  images,
  category,
  page,
  sortBy,
  fetchImagesWithParams,
  getPage,
  getCategory,
  getSortBy,
  pageReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [disable, setDisable] = useState(false);

  let totalPages = images.totalPages;
  let totalRows = images.totalRows;
  let currentImages = images.items;

  const fetch = useCallback(() => {
    fetchImagesWithParams(category, page, sortBy);
  }, [category, page, sortBy, fetchImagesWithParams]);

  useEffect(() => {
    fetch();
    if (images) {
      if (totalPages <= page) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [images, totalPages, page, fetch]);

  const handleSortBy = (e) => {
    getSortBy(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSearchCategory = (e) => {
    e.preventDefault();
    pageReset();
    getCategory(newCategory);
    setNewCategory('');
  };

  const prevPage = () => {
    getPage(page - 1);
  };

  const nextPage = () => {
    getPage(page + 1);
  };

  return (
    <Paper>
      <Grid container direction="row" alignContent="center" width="100%">
        <Grid item xs={4}>
          <Button
            onClick={prevPage}
            sx={{ width: '100%' }}
            disabled={page === 1}
            variant="text"
          >
            Prev
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ textAlign: 'center', width: '100%' }}>
            Page Number {page} of {totalPages ? totalPages : 1}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            disabled={disable}
            sx={{ width: '100%' }}
            onClick={nextPage}
            variant="text"
          >
            Next
          </Button>
        </Grid>
      </Grid>

      <Grid container alignItems="center" direction="column">
        <Typography variant="h4" align="center">
          Gallery
        </Typography>
        <Typography sx={{ mb: 2 }} variant="h8" align="center">
          By Daniel Levi
        </Typography>
        {/* select the category */}
        <Button
          sx={{ mb: 2 }}
          onClick={() => setIsOpen(!isOpen)}
          variant="contained"
        >
          {isOpen ? 'Close' : 'Search category'}
        </Button>
        {isOpen && (
          <FormControl
            sx={{ width: '100%', m: 2, alignItems: 'center' }}
            variant="outlined"
          >
            <TextField
              label="Search Category"
              required
              sx={{ mb: 2 }}
              id="newCategory"
              value={newCategory}
              onChange={handleChangeCategory}
            />

            <FormLabel htmlFor="sortBy">Sort by:</FormLabel>
            <Select
              sx={{ mb: 2 }}
              id="sortBy"
              value={sortBy}
              onChange={handleSortBy}
            >
              <MenuItem value="id">Id</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>

            <Button
              onClick={handleSearchCategory}
              variant="contained"
              type="submit"
            >
              Search
            </Button>
          </FormControl>
        )}
        <Typography>
          {category
            ? `${category[0].toUpperCase()}${category.slice(
                1,
                category.length
              )} Images, total: ${totalRows} `
            : `No Category`}
        </Typography>
        {/*Render current images*/}
        {currentImages && <ImageList images={currentImages} />}
      </Grid>
    </Paper>
  );
};

export default connect(state, actions)(App);
