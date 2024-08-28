import React from 'react'
import {QueryClient ,QueryClientProvider} from '@tanstack/react-query'

type Props = {
    children:React.ReactNode
}

const ReactQueryProvider = ({children}:Props) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
            },
        },
    });
  return (
    <QueryClientProvider client={client}>
    {children}
</QueryClientProvider>
  )
}

export default ReactQueryProvider