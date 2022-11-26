// import "styles/globals.css";
import { ReactElement } from "react";
import { AppPropsWithLayout } from "additional";
import Layout from "@/components/Layout";

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}

export default App;
