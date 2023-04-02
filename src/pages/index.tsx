import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import withAuth from "@/hoc/withAuth";
import FamilyTree from "@/components/FamilyTree";
import { lazy, Suspense, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <>
      <Head>
        <title>Ramiro Family Tree</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <FamilyTree />
        </Suspense>
      </main>
    </>
  );
};

export default withAuth(Home);
