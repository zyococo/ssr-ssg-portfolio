import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout, { siteTitle } from '@/components/Layout'
import Link from "next/link";
import utilsStyles from "../styles/utils.module.css";
import {getPostsData} from "../lib/post";
import React from 'react'

/* eslint-disable */


//SSG
export async function getStaticProps(){
  const allPostsData = getPostsData();//id,title,data,thumbnail

  return {
    props:{
      allPostsData,
    },
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilsStyles.headingMd}>
        <p>
          1995年生まれ 京都産業大学　総合生命科学部　動物生命医科学科(19卒)
          <br />
          South Metropolitan TAFE Australia　Diploma of Software
          Development(22卒)
          <br />
          趣味: ゴルフ・筋トレ
          <br />
          資格: IELTS GENERAL 7.0・IELTS ACADEMIC 6.5・TOEIC 900点・秘書検定 2級
        </p>
      </section>

      <section className={"${utilsStyles.headingMd} ${utilsStyles.padding1px}"}>
        <h1 className={utilsStyles.heading2Xl}>Portfolio</h1>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key = {id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={'/posts/${id}'}>
                <p className={utilsStyles.boldText}>{title}</p>
              </Link>
              {/* <br /> */}
              <small className={utilsStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}