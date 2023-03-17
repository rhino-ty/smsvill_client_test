import FileInputReadExcel from "@/components/FileInputReadExcel";
import FileInputXLSX from "@/components/FileInputXLSX";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>동네문자</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <FileInputXLSX /> */}
      <FileInputReadExcel />
    </>
  );
}
