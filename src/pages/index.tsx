import Page from "@/components/Page";
import { NextPageWithLayout } from "additional";
import { ReactElement } from "react";

const meta = {
  title: "Home",
  author: "Some Dude",
};

const Home: NextPageWithLayout = () => {
  return <h1>Hello WOrld</h1>;
};

Home.getLayout = function (page: ReactElement) {
  return <Page meta={meta}>{page}</Page>;
};

export default Home;
