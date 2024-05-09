import Navbar from "../components/Navbar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full font-sans flex flex-col bg-primary items-center">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
