import Container from "@components/container";
import MoreStories from "@components/more-stories";
import HeroPost from "@components/hero-post";
import Intro from "@components/intro";
import Layout from "@components/layout";
import { getAllPostsForHome } from "@lib/api";
import Head from "next/head";
import { CMS_NAME } from "@lib/constants";

export default function Index({ preview, allPosts }) {
  const heroPost = allPosts[0];
  
  const morePosts = allPosts.slice(1);
  const title = `Next.js Blog Example with ${CMS_NAME}`;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{title}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.image}
              date={heroPost.postingDate}
              author={heroPost.author}
              slug={heroPost.urlTitle}
              excerpt={heroPost.teaser}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);

  return {
    props: { preview, allPosts },
  };
}
