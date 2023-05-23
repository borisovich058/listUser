import "@/styles/prime_theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
