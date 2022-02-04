import './App.css';
import React from 'react';
import { Container } from '@mui/material';
import Posts from './components/Posts';
import PostItem from './components/PostItem';
import User from './components/User';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        
        <Container maxwidth='md'>

          <Routes>
            <Route path='/' element={<Posts/>}/>
            <Route path='/post/:id' element={<PostItem />} />
            <Route path='/user/:id' element={<User/>}/>
          </Routes>
        </Container>  
        
      
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
