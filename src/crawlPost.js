import axios from "axios";
import {getUrlStrapiFromImageUrl} from "./getUrlStrapiFromImageUrl.js";
import {updateHeadPostById, updateThumbPost, uploadPostToStrapi} from "./upLoadPost.js";
import {UrlStrapi} from "./config/env.js";
import fs from "fs";
import {listSlug} from './data/constant.js';

async function getAllSlugPost() {
  const listPostSlug = [];
  let sum = 0;
  for (let index = 1; index < 16; index++) {
    try {
      const res = await axios(`https://nlp168.com.vn/_next/data/WvLoJkJis4l92gilyqZw5/vi/tin-tuc/${index}.json`);


      console.log("sucess:=====", res.data.pageProps.data.posts.nodes.length)
      sum += res.data.pageProps.data.posts.nodes.length;
      listPostSlug.push(...res.data.pageProps.data.posts.nodes.map(item => item.slug));
      if (index === 15) {
        console.log('sum====', sum)
        fs.writeFile(`./data/listPosts.json`, JSON.stringify(listPostSlug), (err) => {

          // In case of a error throw err.
          if (err) throw err;
        })
      }
    } catch (e) {
      console.log('error fetch');
    }
  }
}

async function crawlAllPost() {

  console.log(listSlug.length, '====================')
  for (const slug of listSlug) {
    const index = listSlug.indexOf(slug);
    try {
      console.log('copy post by slug: ', slug);
      const data = await axios(`https://nlp168.com.vn/_next/data/WvLoJkJis4l92gilyqZw5/vi/post/${slug}.json?slug=${slug}`);

      let postDetail = data.data.pageProps.data.post;
      if (!postDetail) continue;
      let content = postDetail.content;
      console.log('processing Find All Image in content ....')
      const listUrlImg = findAllImageInContent(content);
      console.log(`append  ${listUrlImg.length} Image in content!`)

      const imageMapper = {};
      for (const item of listUrlImg) {
        imageMapper[item] = await getUrlStrapiFromImageUrl(item);
      }

      for (const key in imageMapper) {
        while (content.indexOf(key) !== -1) {
          content = content.replace(key, imageMapper[key]);
        }
      }

      const post = {
        title: postDetail.title,
        slug: postDetail.slug,
        publicDate: postDetail.date.split('T')[0],
        content: content,
        description: postDetail.fieldPost.description,
        locale: 'vi',
      }

      const newPost = await uploadPostToStrapi(post);
      await updateThumbPost(newPost.data.id, postDetail.fieldPost.heroImage.sourceUrl);

      postDetail = null;
    } catch (e) {
      console.log('error fetch data from slug:=====', slug);
    }
  }
}

function findAllImageInContent(strContent) {
  const listUrlImg = [];
  let indexTemp = 0, start = 0, end = 0;
  while (strContent.indexOf('src=\"', indexTemp) !== -1) {
    start = strContent.indexOf('src=\"', indexTemp);
    indexTemp = start + 5;
    end = strContent.indexOf('\"', indexTemp);
    const url = strContent.substring(indexTemp, end)

    if (url.startsWith("http://")) {
      listUrlImg.push(url);
    }
  }

  return listUrlImg;
}

function updateHeadContentAllPost() {
  axios(`${UrlStrapi}/api/posts?pagination[page]=1&pagination[pageSize]=1000&sort=publicDate:desc&fields[0]=id&fields[1]=slug`)
    .then(async res => {
      console.log(res.data.data)
      const listPost = res.data.data;
      for (const post of listPost) {
        const index = listPost.indexOf(post);
        // if(index > 0) return;
        const resSeo = await axios(`https://admin.nlp168.com.vn/wp-json/rankmath/v1/getHead?url=https://admin.nlp168.com.vn/post/${post.slug}`)
        console.log('resSeo=====', post, resSeo.data);
        await updateHeadPostById(post.id, resSeo.data.head);
        // if (resSeo.data.success) {
        //   await updateHeadPostById(post.id, resSeo.data.head);
        // }

      }
    })
    .catch((err) => console.error("crawl data error:=====", err));
}


await crawlAllPost();
// updateHeadContentAllPost();
