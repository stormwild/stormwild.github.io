import type { NextPage } from "next";
import { ReactElement } from "react";
import Layout from "../src/components/Layout";

type NextPageWithLayout = NextPage & {
  getLayout?: Function;
};

const Home: NextPageWithLayout = () => {
  return <main>Hello WOrld</main>;
};

Home.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
