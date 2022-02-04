import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';


const USER_QUERY = gql`
    query UserQuery($id: Int!) {
        user(id: $id) {
            name,
            email,
            posts {
                id,
                title
            }
        }
    }
`

const User = () => {
    let params = useParams()
    const {loading, error, data} = useQuery(USER_QUERY, {variables: {id: parseInt(params.id)}})
    if (error) console.log(error)
  return (
    <>
        <h1>User</h1>
        {loading && <h4>Loading...</h4>}
        {data &&

        <>
            <h2>{data.user.name}</h2>
            <p><span>Email: </span>{data.user.email}</p>
            <div><b>Posts</b></div>
            {data.user.posts.map((post,idx) => (
                <Link to={`/post/${post.id}`}>
                    <p key={idx}>{post.title}</p>
                </Link>
            ))}
            <CardActions>
                <Link to='/'>
                    <Button>
                        Back to Home Page
                    </Button>
                </Link>
            </CardActions>   

        </>
        }

    </>
  );
};

export default User;
