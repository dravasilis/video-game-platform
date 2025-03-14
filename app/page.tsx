import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {" "}
      <Head>
        <title>My page title</title>
      </Head>
      <Link href="/home">Home</Link>
    </>
  );
}
