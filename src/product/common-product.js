import axios from "axios";
import {UrlStrapi} from "../config/env.js";
import {token} from "../config/token.js";


export async function createCategoryProduct(data) {
  try {
    console.log('try createCategoryProduct')

    const res = await axios.post(`${UrlStrapi}/api/category-products`, {data: data}, {
      headers: {
        Authorization: `Bearer ${token.TokenFullAccessLocal}`,
        // 'Content-Type': 'multipart/form-data',
      }
    })

    console.log("success create Category: ", res.data.id);
  } catch (err) {
    console.log("crate post failed: ", err)
  }
}
export async function createProduct(data) {
  try {
    console.log('try uploadPostToStrapi')

    const res = await axios.post(`${UrlStrapi}/api/products`, {data: data}, {
      headers: {
        Authorization: `Bearer ${token.TokenFullAccessLocal}`,
        // 'Content-Type': 'multipart/form-data',
      }
    })

    console.log("success create Product: ", res.data.id);
  } catch (err) {
    console.log("crate post failed: ", err)
  }
}

