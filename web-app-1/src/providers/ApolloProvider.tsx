'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';

const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  );
}
