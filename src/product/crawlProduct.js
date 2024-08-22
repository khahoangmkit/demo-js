import axios from "axios";
import {getUrlStrapiFromImageUrl, uploadImageToStrapiFromUrl} from "../getUrlStrapiFromImageUrl.js";
import {updateThumbPost, uploadPostToStrapi} from "../upLoadPost.js";
import {UrlStrapi} from "../config/env.js";
import {token} from "../config/token.js";
import {createCategoryProduct, createProduct, createProductVersion} from "./common-product.js";
import {DataCategory, } from "../data/constant.js";
import fs from 'fs';

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
const listProductByChildCategory = {}

DataCategory.danhmucs.edges.forEach((category, index) => {
  if (index > 5 ) return;
  const categoryDetail = category.node;
  categoryDetail.children.edges.forEach(childCategory => {
    const childCategoryDetail = childCategory.node;

    listProductByChildCategory[childCategoryDetail.slug] = [];

    childCategoryDetail.children.edges.forEach(typeProduct => {
      const typeProductDetail = typeProduct.node;

      typeProductDetail.sanphams.edges.forEach(product => {
        const productDetail = product.node;
        listProductByChildCategory[childCategoryDetail.slug].push(productDetail.slug);
        listProductSlug.push(productDetail.slug);
        listProduct.push({
          name: productDetail.title,
          slug: productDetail.slug,
          slugId: productDetail.slug,
          typeProduct: childCategoryDetail.slug,
          description: productDetail.sanphamField2.mota,
          thumb: productDetail.sanphamField2.image.sourceUrl,
          locale: 'vi',
        })
      })
    })
  })
})

// fs.writeFile(`./listSlugsByChildCategory.json`, JSON.stringify(listProductByChildCategory), (err) => {
//
//   // In case of a error throw err.
//   if (err) throw err;
// })

// fs.writeFile(`./listSlugs.json`, JSON.stringify(listProductSlug), (err) => {
//
//   // In case of a error throw err.
//   if (err) throw err;
// })

// console.log("=====length product: ", listProductByChildCategory.length, listProduct[0]);


const listProductVersion =  [
  {
    slug: "c2500-c25-000",
    versionName: "C2500 – C25.000 Model",
  },
  {
    slug: "ac-electric-aisle-master",
    versionName: "AC Electric Aisle Master",
  }
];
listProductVersion.forEach((product, index) => {
  // return
  // if (index > 1) return;
  // if (index > 0) return;

  try {
    axios(`http://103.173.227.216:3000/_next/data/MiwdB99DHBAHRjnFgBRay/vi/san-pham/${product.slug}.json?slug=${product.slug}`)
      .then(async (res) => {
        if (res.data) {
          console.log('Get Product success');
        }

        console.log('process create product', product.slug)
        const productDetail = res.data?.pageProps?.daisanpham?.daisanphamField;

        if (!productDetail) return;

        // console.log('get product Detail success!!! \n', productDetail);

        const noiBat = [];
        for (const item of productDetail.noibat3) {

          // console.log(item.image.sourceUrl, '===============')
          try {
            const uploadedFiles = await uploadImageToStrapiFromUrl(item.image.sourceUrl);
            const imageId = uploadedFiles[0].id;

            noiBat.push({
              ...item,
              image: imageId
            })
          } catch (e) {
            console.log('Upload noiBat3 Fail!!!', product.slug)
          }
        }

        let noiBatOther;
        if (productDetail.noibatkhac) {
          try {
            const uploadedFiles = await uploadImageToStrapiFromUrl(productDetail.noibatkhac.image.sourceUrl);
            const imageId = uploadedFiles[0].id;

            noiBatOther = {
              title: productDetail.noibatkhac.title,
              description: productDetail.noibatkhac.desc,
              image: imageId
            }
          } catch (e) {
            console.log('Upload noiBatOther Fail!!!', product.slug)

          }
        }


        const listAnToan = [];
        try {
          for (const item of productDetail.antoan.list) {
            try {
              const uploadedFiles = await uploadImageToStrapiFromUrl(item.image.sourceUrl);
              const imageId = uploadedFiles[0].id;

              listAnToan.push({
                ...item,
                image: imageId
              })

            } catch (e) {
              console.log('Upload noiBatOther Fail!!!', product.slug)

            }
          }
        } catch (e) {
          console.log('Upload anToan Fail!!!', product.slug)
        }


        const anToan = {
          title: productDetail.antoan.title,
          desc: productDetail.antoan.desc,
          listFeature: listAnToan
        };

        let otherBlock = null;
        try {
          const uploadedOtherBlockFiles = await uploadImageToStrapiFromUrl(productDetail.otherBlock[0].image.sourceUrl);
          const imageOtherBlockId = uploadedOtherBlockFiles[0].id;

          otherBlock = {
            ...productDetail.otherBlock[0],
            image: imageOtherBlockId
          }
        } catch (e) {
          console.log('Upload OtherBlock Fail!!!', product.slug)
        }



        const videos = [];
        try {
          for (const item of productDetail.video) {
            const uploadedFiles = await uploadImageToStrapiFromUrl(item.thumbnail.sourceUrl);
            const imageId = uploadedFiles[0].id;

            videos.push({
              ...item,
              thumb: imageId
            })
          }
        } catch (e) {
          console.log('Upload videos Fail!!!', product.slug)

        }

        const listHinhAnh = [];
        try {
          for (const item of productDetail.hinhanh.image) {
            const uploadedFiles = await uploadImageToStrapiFromUrl(item.sourceUrl);
            listHinhAnh.push(uploadedFiles[0].id);
          }
        } catch (e) {
          console.log('Upload hinh anh Fail!!!', product.slug)
        }



        const hinhAnh = {
          title: productDetail.hinhanh.title,
          desc: productDetail.hinhanh.desc,
          images: listHinhAnh
        }

        // const uploadedThumbFiles = await uploadImageToStrapiFromUrl(product.thumb);
        // const thumbImage = uploadedThumbFiles[0].id;

        const sanPhams = res.data.pageProps.daisanpham.sanphams.edges[0].node.xenangdau;
        // const thongTinXe = {
        //   "taiTrong": sanPhams.taitrong,
        //   "tamTai": sanPhams.tamtai,
        //   "chieuCaoNang": sanPhams.chieucao,
        //   "dongCo": sanPhams.dongco,
        //   "congSuat": sanPhams.congsuat,
        //   "chieuDaiCang": sanPhams.chieudai,
        //   "hopSo": sanPhams.hopso,
        //   "lopXe": sanPhams.lop,
        //   "phanhXe": sanPhams.phanh
        // }

        const newProduct = {
          versionName: product.versionName,
          categoryName: 'Combilift',
          noiBat: noiBat,
          noiBatOther: noiBatOther,
          anToan: anToan,
          otherBlock: otherBlock,
          videos: videos,
          hinhAnh: [hinhAnh]
        }


      await createProductVersion(newProduct)
      })
      // .catch(e => {
      //   console.log('fail get data ', )
      // })

  } catch (e) {
    console.log('fail get data ', e.versionName, '==================')
  }

})


