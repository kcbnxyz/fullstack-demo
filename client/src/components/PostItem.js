import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {Link, useParams} from 'react-router-dom';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';

const POST_QUERY = gql`
    query PostQuery($id: Int!) {
        post(id: $id) {
            user {
                username,
                id
            },
            title,
            body,
            comments {
                name,
                body
            }
        }
    }
`

const PostItem = () => {
    let params = useParams()
    const {loading, error, data} = useQuery(POST_QUERY, {variables:{id:parseInt(params.id)}})
    if(error) console.log(error)
    
    
  return (
      <>
        {loading && <h4>Loading...</h4>}
        {data && 
            <>
                
                <h2>{data.post.title}</h2>
                <Link to={`/user/${data.post.user.id}`} >
                    <p><i>{data.post.user.username}</i></p>
                </Link>
                
                <p>{data.post.body}</p>
                <div>
                    <h4>Comments</h4>
                    <Stack spacing={2}>
                        {data.post.comments.map((comment, idx) => (
                            <Card key={idx}>
                                <CardContent>
                                    <p><i>{comment.name}</i></p>
                                    <p>{comment.body}</p>
                                </CardContent>
                                
                            </Card>
                        ))}
                    </Stack>
                    
                </div>
            </>
        }
        
        <CardActions>
            <Link to='/'>
                <Button>
                    Back to Home Page
                </Button>
            </Link>
        </CardActions>    
        
        
        
      </>
  );
};

export default PostItem;
