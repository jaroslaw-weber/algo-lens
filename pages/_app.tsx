import Head from "next/head";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full font-sans flex flex-col bg-primary items-center">
      <Head>
        <title>Algo-Lens: Algorithm Visualization Tool</title>
        <meta
          name="description"
          content="Explore and visualize the execution of algorithms with Algo-Lens. Gain insights into algorithm behavior and step-by-step code execution to enhance your understanding and debugging skills."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
