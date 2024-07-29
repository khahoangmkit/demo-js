import axios from "axios";
import {getUrlStrapiFromImageUrl, uploadImageToStrapiFromUrl} from "../getUrlStrapiFromImageUrl.js";
import {updateThumbPost, uploadPostToStrapi} from "../upLoadPost.js";
import {UrlStrapi} from "../config/env.js";
import {token} from "../config/token.js";
import {createCategoryProduct, createProduct} from "./common-product.js";
import { DataCategory } from "../data/constant.js";

async function createListCategoriesProduct() {
  for (const item of DataCategory.danhmucs.edges) {
    console.log(item.fieldCategory, item)
    const categoryProduct = {
      name: item.node.name,
      slug: item.node.slug,
      description: item.node.description,
      fieldCategory: item.node.fieldCategory.order,
    }
    await createCategoryProduct(categoryProduct);
  }
}

// await createListCategoriesProduct();

//
const listCategorySlug = [];
const listChildCategorySlug = [];
const listTypeProductSlug = [];
const listProductSlug = [];
const listProduct = [];

DataCategory.danhmucs.edges.forEach(category => {
  const categoryDetail = category.node;
  categoryDetail.children.edges.forEach(childCategory => {
    const childCategoryDetail = childCategory.node;

    childCategoryDetail.children.edges.forEach(typeProduct => {
      const typeProductDetail = typeProduct.node;

      typeProductDetail.sanphams.edges.forEach(product => {
        const productDetail = product.node;
        listProductSlug.push(productDetail.slug);
        listProduct.push({
          name: productDetail.title,
          slug: productDetail.slug,
          slugId: productDetail.slug,
          description: productDetail.sanphamField2.mota,
          thumb: productDetail.sanphamField2.image.sourceUrl,
          locale: 'vi',
        })
      })
    })
  })
})

console.log("=====length product: ", listProductSlug.length, listProduct[0]);


listProduct.forEach((product, index) => {
  if (index > 1) return;
  // if (index > 0) return;

  axios(`https://nlp168.com.vn/_next/data/WvLoJkJis4l92gilyqZw5/vi/san-pham/${product.slug}.json?slug=${product.slug}`)
    .then(async (res) => {
      if (res.data) {
        console.log('Get Product success');
      }

      const productDetail = res.data.pageProps.daisanpham.daisanphamField;

      if (!productDetail) return;

      console.log('get product Detail success!!! \n', productDetail);

      const noiBat = [];
      for (const item of productDetail.noibat3) {
        const uploadedFiles = await uploadImageToStrapiFromUrl(item.image.sourceUrl);
        const imageId = uploadedFiles[0].id;

        noiBat.push({
          ...item,
          image: imageId
        })
      }

      let noiBatOther;
      if (productDetail.noibatkhac) {
        const uploadedFiles = await uploadImageToStrapiFromUrl(productDetail.noibatkhac.image.sourceUrl);
        const imageId = uploadedFiles[0].id;

        noiBatOther = {
          title: productDetail.noibatkhac.title,
          description: productDetail.noibatkhac.desc,
          image: imageId
        }
      }


      const listAnToan = [];
      for ( const item of productDetail.antoan.list) {
        const uploadedFiles = await uploadImageToStrapiFromUrl(item.image.sourceUrl);
        const imageId = uploadedFiles[0].id;

        listAnToan.push({
          ...item,
          image: imageId
        })
      }

      const anToan = {
        title: productDetail.antoan.title,
        desc: productDetail.antoan.desc,
        listFeature: listAnToan
      };

      const uploadedOtherBlockFiles = await uploadImageToStrapiFromUrl(productDetail.otherBlock[0].image.sourceUrl);
      const imageOtherBlockId = uploadedOtherBlockFiles[0].id;

      const otherBlock = {
        ...productDetail.otherBlock[0],
        image: imageOtherBlockId
      }


      const videos = [];
      for (const item of productDetail.video) {
        const uploadedFiles = await uploadImageToStrapiFromUrl(item.thumbnail.sourceUrl);
        const imageId = uploadedFiles[0].id;

        videos.push({
          ...item,
          thumb: imageId
        })
      }

      const listHinhAnh = [];
      for (const item of productDetail.hinhanh.image) {
        const uploadedFiles = await uploadImageToStrapiFromUrl(item.sourceUrl);
        listHinhAnh.push(uploadedFiles[0].id);
      }



      const hinhAnh = {
        title: productDetail.hinhanh.title,
        desc: productDetail.hinhanh.desc,
        images: listHinhAnh
      }

      const uploadedThumbFiles = await uploadImageToStrapiFromUrl(product.thumb);
      const thumbImage = uploadedThumbFiles[0].id;

      const sanPhams = res.data.pageProps.daisanpham.sanphams.edges[0].node.xenangdau;
      const thongTinXe = {
        "taiTrong": sanPhams.taitrong,
        "tamTai": sanPhams.tamtai,
        "chieuCaoNang": sanPhams.chieucao,
        "dongCo": sanPhams.dongco,
        "congSuat": sanPhams.congsuat,
        "chieuDaiCang": sanPhams.chieudai,
        "hopSo": sanPhams.hopso,
        "lopXe": sanPhams.lop,
        "phanhXe": sanPhams.phanh
      }

      const newProduct = {
        ...product,
        ...thongTinXe,
        thumb: thumbImage,
        noiBat: noiBat,
        noiBatOther: noiBatOther,
        anToan: anToan,
        otherBlock: otherBlock,
        videos: videos,
        hinhAnh: hinhAnh
      }

      console.log('newProduct: ', newProduct);
      await createProduct(newProduct);
    })
})

