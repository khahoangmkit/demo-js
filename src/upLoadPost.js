import axios from "axios";
import { token } from './config/token.js';
import {UrlStrapi} from "./config/env.js";
import {uploadImageToStrapiFromUrl} from "./getUrlStrapiFromImageUrl.js";


export async function uploadPostToStrapi(post) {
    try {
        console.log('try uploadPostToStrapi')

        const res = await axios.post(`${UrlStrapi}/api/posts`, {data: post}, {
            headers: {
                Authorization: `Bearer ${token.TokenFullAccessLocal}`,
                // 'Content-Type': 'multipart/form-data',
            }
        })

        return res.data;
    } catch (err) {
        console.log("crate post failed: ", err)
    }

    //   .then(res => {
    //     console.log("create Post success:");
    //     return res.data;
    // })
    //   .catch(err => console.error("create Post fail:", err));
}

export async function updateThumbPost(idPost, url) {
    try {
        console.log('try upload Thumb....')
        const uploadedFiles = await uploadImageToStrapiFromUrl(url);
        const imageId = uploadedFiles[0].id;

        const response = await axios.put(`${UrlStrapi}/api/posts/${idPost}`, {
            thumb: imageId,
        },{
            headers: {
                Authorization: `Bearer ${token.TokenFullAccessLocal}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error attaching file to collection:', error);
    }
}

export async function updateHeadPostById(idPost, content) {
    try {
        console.log('try update Content head....', idPost);

        const response = await axios.put(`${UrlStrapi}/api/posts/${idPost}`, { data: {
             headSeo: content,
            }
        },{
            headers: {
                Authorization: `Bearer ${token.TokenFullAccessLocal}`,
            }
        });

        console.log(`Update Content head ${idPost} complete!`);
    } catch (error) {
        console.error('Error update Content head....:', idPost, error);
    }
}
// await updateThumbPost(14, 'https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-cu-Hyundai-Trung-Quoc-35DE-7-1024x768.jpg')
