import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import { LensProvider, LensConfig, staging, production } from '@lens-protocol/react';
import { localStorage } from '@lens-protocol/react/web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from 'next/head'
import Header from '../../components/Header'
import '@/styles/globals.css'

const queryClient = new QueryClient();

const { provider, webSocketProvider } = configureChains([polygonMumbai], [publicProvider()]);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
  storage: localStorage(),
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
    <Head>
      <title>Oura Lens Friends</title>
      <meta name="description" content="Oura Lens Friends" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <WagmiConfig client={client}>
      <LensProvider config={lensConfig}>
          <QueryClientProvider client={ queryClient } contextSharing={true}>
            <Header/>
            <Component {...pageProps} />
          </QueryClientProvider>
      </LensProvider>
    </WagmiConfig>
    </div>
  )
}
