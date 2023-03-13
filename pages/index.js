import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Layout, { siteTitle } from "@/components/Layout";
import Link from "next/link";
import utilsStyles from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* eslint-disable */

//SSG
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,data,thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("送信中・・・");
    console.log(nameRef.current?.value);

    let data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) console.log("送信に成功しました");
    });
  };

  return (
    <>
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
            資格: IELTS GENERAL 7.0・IELTS ACADEMIC 6.5・TOEIC 900点・秘書検定
            2級
          </p>
        </section>

        <section
          className={"${utilsStyles.headingMd} ${utilsStyles.padding1px}"}
        >
          <h1 className={utilsStyles.heading2Xl}>Portfolio</h1>
          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={`${thumbnail}`} className={styles.thumbnailImage} />
                </Link>
                <Link href={"/posts/${id}"}>
                  <p className={utilsStyles.boldText}>{title}</p>
                </Link>
                {/* <br /> */}
                <small className={utilsStyles.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </Layout>

      <div className="container mt-5 ">
        <h2 className="mb-3">お気軽にご連絡くださいませ</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              お名前
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              required
              ref={nameRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              required
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              メッセージ
            </label>
            <textarea
              className="form-control"
              id="message"
              required
              ref={messageRef}
            />
          </div>
          <button className="btn btn-danger" type="submit">
            メール送信
          </button>
        </form>
      </div>
    </>
  );
}
