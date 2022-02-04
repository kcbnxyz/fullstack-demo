import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'


const Post = ({post}) => {
  return (
      <Card sx={{minwidth:275}}>
          <CardContent>
            <Typography noWrap> 
              <h4>{post.title}</h4>
            </Typography>
            <Typography noWrap>
              <p>{post.body}</p>
            </Typography>
            
          </CardContent>
          <CardActions>
              <Link to={`/post/${post.id}`}>
                <Button size='small'>
                    See More
                </Button>
              </Link>
          </CardActions>
      </Card>
  );
};

export default Post;
