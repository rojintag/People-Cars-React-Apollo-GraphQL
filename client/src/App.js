import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'antd/dist/reset.css'
import HomePage from './components/pages/HomePage';
import DetailsPage from './components/pages/DetailsPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


const App = () => {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />\
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
  )
}

export default App