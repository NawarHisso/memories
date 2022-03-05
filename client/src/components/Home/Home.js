import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles";

import { getPosts, getPostsBySearch } from "../../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  const query = useQuery();
  const history = useHistory();

  const page = query.get("page") || 1;

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchPost();
    }
  };

  const handleOnAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleOnDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch, page]);

  const searchPost = (event) => {
    event.preventDefault();
    if (searchTerm.trim() || tags) {
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${searchTerm || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={searchTerm}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleOnAdd}
                onDelete={handleOnDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
