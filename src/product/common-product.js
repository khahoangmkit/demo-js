import axios from "axios";
import {UrlStrapi} from "../config/env.js";
import {token} from "../config/token.js";
import fs from 'fs';
import {DataCategory} from "../data/constant.js";

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
    console.log('try create Product')

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

export async function createProductVersion(data) {
  try {
    console.log('try create Product')

    const res = await axios.post(`${UrlStrapi}/api/product-versions`, {data: data}, {
      headers: {
        Authorization: `Bearer ${token.TokenFullAccessLocal}`,
        // 'Content-Type': 'multipart/form-data',
      }
    })

    console.log("success create Product Version: ", res.data.id);
  } catch (err) {
    console.log("crate post failed: ", err)
  }
}

function demoWriteFile() {
  let data = DataCategory;

// Write data in 'Output.txt' .
  fs.writeFile('./dataProduct/Output.json', JSON.stringify(data), (err) => {

    // In case of a error throw err.
    if (err) throw err;
  })
}
// demoWriteFile();
// await createProductVersion()


export async function createNewCategory(data) {
  try {
    console.log('try create Product')

    const res = await axios.post(`${UrlStrapi}/api/new-categories`, {data: data}, {
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
