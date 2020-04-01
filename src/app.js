import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

export function App() {
  const client = new ApolloClient({
    url: 'https://graphql-pokemon.now.sh',
  })

  return (
    <ApolloProvider client={client}>
      <main>
        <PokemonsContainer />
      </main>
    </ApolloProvider>
  )
}
