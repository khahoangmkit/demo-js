import axios from "axios";
import {getUrlStrapiFromImageUrl} from "./getUrlStrapiFromImageUrl.js";
import {updateThumbPost, uploadPostToStrapi} from "./upLoadPost.js";


const listPostSlug = [];
[...Array(15)].forEach((_, index) => {
  if (index === 0) return;

  axios(`https://nlp168.com.vn/_next/data/WvLoJkJis4l92gilyqZw5/vi/tin-tuc/${16 - index}.json`)
    .then(async (res) => {
      console.log("sucess:=====", res.data.pageProps.data.posts.nodes.length)
      listPostSlug.push(...res.data.pageProps.data.posts.nodes.map(item => item.slug));

      for (const slug of listPostSlug) {
        // const index1 = listPostSlug.indexOf(slug);
        // if (index1 > 0) continue;
        const data = await axios(`https://nlp168.com.vn/_next/data/WvLoJkJis4l92gilyqZw5/vi/post/${slug}.json?slug=${slug}`);

        let postDetail = data.data.pageProps.data.post;
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
        await updateThumbPost(newPost.data.id,  postDetail.fieldPost.heroImage.sourceUrl)
      }
    })
    .catch((err) => console.error("crawl data error:=====", err));
})


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
