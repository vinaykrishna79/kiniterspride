import { Feed } from "feed";
import moment from "moment";
import { Baseurl } from "../utils/BaseUrl";

// NOTE: This should be a function or imported method that makes a call to the backend.
const getAllArticles = async () => {
  let paths = [];

  const res1 = await fetch(`${Baseurl}blog/slugs`);
  const data1 = await res1.json();
  const blogData = data1.data;

  for (let lang in blogData) {
    for (let blogslug of blogData[lang]) {
      if (lang === "en") {
        //   paths.push(`/blog/${blogslug.slug}/${lang}`);
        paths.push({
          slug: `/blog/${blogslug.slug}/${lang}`,
          title: `${blogslug.slug}`,
          summary: `${blogslug.slug} blogs`,
          date: moment(blogslug.createdAt, "YYYY-MM-DD").add(1, 'days'),
        });
      }
    }
  }
  return paths;
};

const hostUrl = "https://knitterspride.com";

const buildFeed = (items) => {
  //   console.log("items", items);
  const feed = new Feed({
    id: hostUrl,
    link: hostUrl,
    title: "knitters Pride Blogs",
    description: "knitters Pride Blogs",
    copyright: "Knitter's Pride © Copyright 2011 - 2021",
    updated: new Date(),
    author: {
      name: "knitters Pride",
      link: hostUrl,
    },
  });

  items.forEach((item) => {
    feed.addItem({
      title: item.title,
      link: `${hostUrl}${item.slug}`,
      description: item.summary,
      date: moment(item.date, "YYYY-MM-DD").toDate(),
    });
  });

  return feed;
};

export const getServerSideProps = async (context) => {
  if (context && context.res) {
    const { res } = context;

    const articles = await getAllArticles();

    const feed = buildFeed(articles);
    res.setHeader("content-type", "text/xml");
    res.write(feed.rss2()); // NOTE: You can also use feed.atom1() or feed.json1() for other feed formats
    res.end();
  }

  return {
    props: {},
  };
};

const RssPage = () => null;

export default RssPage;
