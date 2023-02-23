import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import 'antd/dist/reset.css'
import AddContact from './components/forms/AddContact'
import Contacts from './components/lists/Contacts'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1 style={{margin: '2rem', borderBottom: '1px solid #f2f2f2', paddingBottom: '1rem'}}>PEOPLE AND THEIR CARS</h1>
        <AddContact />
        <Contacts />
      </div>
    </ApolloProvider>
  )
}

export default App