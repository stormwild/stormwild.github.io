import { Props } from "additional";
import Head from "next/head";

export default function Page({ meta, children }: Props) {
  return (
    <>
      <Head>
        <title>{meta?.title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
