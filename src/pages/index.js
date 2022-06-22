import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = () => {
  const posts = useStaticQuery(
    graphql`
      query {
        allPrismicPag {
          nodes {
            uid
            data {
              page_title {
                text
              }
              sub_title {
                text
              }
              image {
                url
              }
              author {
                author_name {
                  text
                }
                author_photo {
                  url
                }
              }
              date
            }
          }
        }
      }
    `
  )

  function featuredDateFormat(date) {
    let mostRecentDate = date.split('-');
    let year = mostRecentDate[0];
    mostRecentDate.push(year);
    mostRecentDate.shift();
    const months = 'January, February, March, April, May, June, July, August, September, October, November, December';
    const monthsArray = months.split(',');
    if(mostRecentDate[0][0] === '0'){
      mostRecentDate[0] = mostRecentDate[0][1];
    };
    let finalDate = `${monthsArray[mostRecentDate[0]]} ${mostRecentDate[1]}, ${mostRecentDate[2]}`;
    return finalDate;
  }

  function mostRecentDateFormat(date) {
    let mostRecentDate = date.split('-');
    let year = mostRecentDate[0];
    mostRecentDate.push(year);
    mostRecentDate.shift();
    if(mostRecentDate[0][0] === '0'){
      mostRecentDate[0] = mostRecentDate[0][1];
    };
    let finalDate = `${mostRecentDate[0]}/${mostRecentDate[1]}/${mostRecentDate[2]}`;
    return finalDate;
  }

  return(
  <Layout>
    <Seo title="Home" />
    <h2 className={styles.categoryName}>Featured Posts</h2>
    <div className={styles.categoryRectangle}></div>
    <ul className={styles.list}>
      {posts.allPrismicPag.nodes.map((post, i) => {
        if(i=== 5 || i=== 4){
          return(
            <li key={post.uid} className={styles.listItem}>
                <div style={{
                  backgroundImage: `url("${post.data.image.url}")`,
                }}
                className={styles.listItemWrapper}
                >
                  <h3 className={styles.listItemHeader}>{post.data.page_title.text}</h3>
                  <p className={styles.listItemDescription}>{post.data.sub_title.text}</p>
                  <div className={styles.listItemAuthorDate}>
                    <div className={styles.listItemAuthor}>
                      <img 
                        src={post.data.author[0].author_photo.url} 
                        alt={post.data.author[0].author_name.text} 
                      />
                      <span>{post.data.author[0].author_name.text}</span>
                    </div>
                    <span className={styles.listItemDate}>{featuredDateFormat(post.data.date)}</span>
                  </div>
                </div>
            </li>
          )  
        }})}
    </ul>

    <h2 className={styles.categoryName}>Most Recent</h2>
    <div className={styles.categoryRectangle}></div>
    <ul className={styles.mostRecentlist}>
      {posts.allPrismicPag.nodes.map((post, i) => {
        while (i> 5 || i<4){
          return(
            <li key={post.uid} className={styles.mostRecentListItem}>
                <div style={{
                  backgroundImage: `url("${post.data.image.url}")`,
                }}
                className={styles.mostRecentItemWrapper}
                >
                  <h3 className={styles.mostRecentItemHeader}>{post.data.page_title.text}</h3>
                  <p className={styles.mostRecentItemDescription}>{post.data.sub_title.text}</p>
                  <div className={styles.mostRecentItemAuthorDate}>
                    <div className={styles.mostRecentItemAuthor}>
                      <img 
                        src={post.data.author[0].author_photo.url} 
                        alt={post.data.author[0].author_name.text} 
                      />
                      <span>{post.data.author[0].author_name.text}</span>
                    </div>
                    <span className={styles.mostRecentItemDate}>{mostRecentDateFormat(post.data.date)}</span>
                  </div>
                </div>
            </li>
          )  
        }})}
    </ul>
  </Layout>
)
}

export default IndexPage
