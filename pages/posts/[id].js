import Head from 'next/head';
import { getAllPostIds, getPostData } from "@/lib/post";
import Layout from "../../components/Layout";
import utilsStyles from "../../styles/utils.module.css";
import React from 'react'

/* eslint-disable */


export async function getStaticPaths(){
    const paths = getAllPostIds();

    return{
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}){
const postData = await getPostData(params.id);
return {
  props: {
    postData,
  },
};



}


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilsStyles.headingX1}>{postData.title}</h1>
        <div className={utilsStyles.lightText}>{postData.date}</div>
        <div
          dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}
        ></div>
      </article>
    </Layout>
  );
}    