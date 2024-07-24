import axios from "axios";
import FormData from "form-data";
import {token} from "./config/token.js";
import {UrlStrapi} from "./config/env.js";

export async function getUrlStrapiFromImageUrl(url) {
  // const responseData = await downloadImageFromUrl(url);
  //
  // const listStr = url.split("/");
  // const fileName = listStr.slice(-1)[0];
  //
  // // console.log(Buffer.from(responseData), '=================')
  // const formData = new FormData();
  // formData.append("files", Buffer.from(responseData), {
  //   filename: fileName,
  // });
  //
  // let urlImage;
  // const res = await uploadFileToStrapi(formData, fileName);

  const res = await uploadImageToStrapiFromUrl(url);

  return  UrlStrapi + res[0].url;

}

export async function downloadImageFromUrl(url) {
  const response = await axios.get(url, {responseType: "arraybuffer"});
  return response.data;
}

export async function uploadFileToStrapi(formData) {
  try {
    const response = await axios
      .post(`${UrlStrapi}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token.TokenUploadLocal}`,
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryiQPXFxXcNQKcehBG",
          "Accept-Encoding": "gzip, deflate, br, zstd", ...formData.getHeaders(),
        },
      })

    return response.data;
  } catch (error) {
    console.error('Upload file fail: :', error);
    throw error;
  }
}

export async function uploadImageToStrapiFromUrl(url) {
  try {
    console.log('try uploadImageToStrapiFromUrl.....')
    const responseData = await downloadImageFromUrl(url);

    const listStr = url.split("/");
    const fileName = listStr.slice(-1)[0];

    const formData = new FormData();
    formData.append("files", Buffer.from(responseData), {
      filename: fileName,
    });

    const res = await uploadFileToStrapi(formData);
    console.log('response uploadImageToStrapiFromUrl: ', res);
    return res;
  } catch (err) {
    console.log('Error uploadImageToStrapiFromUrl: ', err);
  }
}

// await getUrlStrapiFromImageUrl('https://admin.nlp168.com.vn/wp-content/uploads/2024/04/Xe-nang-cu-Hyundai-Trung-Quoc-35DE-7-1024x768.jpg')
