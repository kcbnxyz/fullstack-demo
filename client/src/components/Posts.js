import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Post from './Post';
import Grid from '@mui/material/Grid';


const POSTS_QUERY = gql`
    query PostsQuery {
        posts {
            id,
            user {
                username
            }
            title,
            body
        }
    }
`

const Posts = () => {
    const {loading, error, data} = useQuery(POSTS_QUERY)
    if (error) console.log(error)

  return (
    <>
        <h1>Posts</h1>
        {loading && <h4>Loading...</h4>}
        {data && 
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.posts.map(post => (
                <Grid item xs={2} sm={4} md={3} zeroMinWidth>
                    <Post key={post.id} post={post} />
                </Grid>
        ))}
        </Grid>
        }
    </>
  ) 
  
};

export default Posts;
