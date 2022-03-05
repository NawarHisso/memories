import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";

import Post from "./Post/Post";
import useStyle from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyle();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) {
    return (
      <Container>
        <Paper className={classes.isLoading} elevation={6}>
          <Typography variant="h4">No posts found!</Typography>
        </Paper>
      </Container>
    );
  }

  return isLoading ? (
    <Container className={classes.isLoading}>
      <CircularProgress size="7em" />
    </Container>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
