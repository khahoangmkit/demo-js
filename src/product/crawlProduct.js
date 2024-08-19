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


const listProductVersion = [
  // {
  //   slug: "15d-7e",
  //   versionName: "15D-7E / 18D-7E / 20DA-7E",
  // },
  // {
  //   slug: "25df-7",
  //   versionName: "25DF-7 / 30DF-7 / 33DF-7",
  // },
  // {
  //   slug: "25d-9",
  //   versionName: "25D-9 / 30D-9 / 35DA-9",
  // },
  // {
  //   slug: "35d-9s",
  //   versionName: "35D-9S / 40D-9S / 45D-9S / 50D-9SA / 50DN-9VB",
  // },
  // {
  //   slug: "70df-7",
  //   versionName: "70DF-7",
  // },
  // {
  //   slug: "70d-7e",
  //   versionName: "70D-7E ACE / 80D-7E ACE",
  // },
  // {
  //   slug: "100d-9-xe-nang-dau-10-tan",
  //   versionName: "100D-9",
  // },
  // {
  //   slug: "110d-7e",
  //   versionName: "110D-7E / 160D-7E / 130D-7E",
  // },
  // {
  //   slug: "180d-7e",
  //   versionName: "180D-7E",
  // },
  // {
  //   slug: "250d-7e",
  //   versionName: "125D-7E",
  // },
  // {
  //   slug: "300d-9",
  //   versionName: "300D-9",
  // },
  // {
  //   slug: "15bt-9u",
  //   versionName: "15BT-9U / 20BT-9U / 18BT-9U",
  // },
  // {
  //   slug: "15bt-9u",
  //   versionName: "15BT-9U / 20BT-9U / 18BT-9U",
  // },
  // {
  //   slug: "16b-9f",
  //   versionName: "16B-9F / 20B-9F / 18B-9F",
  // },
  // {
  //   slug: "25b-9u",
  //   versionName: "25B-9U / 35B-9U",
  // },
  // {
  //   slug: "25b-9f",
  //   versionName: "25B-9F / 35B-9F",
  // },
  // {
  //   slug: "40b-9",
  //   versionName: "40B-9 / 50B-9 / 45B-9",
  // },
  // {
  //   slug: "50dn-9vb",
  //   versionName: "50DN-9VB",
  // },
  // {
  //   slug: "25br-x",
  //   versionName: "25BR-X / 18BR-X / 15BR-X",
  // },
  // {
  //   slug: "16brj-9",
  //   versionName: "16BRJ-9 / 20BRJ-9",
  // },
  // {
  //   slug: "50d-9sa",
  //   versionName: "50D-9SA / 45D-9S / 40D-9S / 35D-9S",
  // },
  // {
  //   slug: "23brp-9",
  //   versionName: "23BRP-9 / 20BRP-9 / 18BRP-9 / 15BRP-9",
  // },
  // {
  //   slug: "20br-9",
  //   versionName: "20BR-9 / 25BR-9 / 18BR-9 / 15BR-9",
  // },
  // {
  //   slug: "20bcs-9",
  //   versionName: "20BCS-9 / 18BCS-9 / 15BCS-9",
  // },
  // {
  //   slug: "13bop-9",
  //   versionName: "13BOP-9",
  // },
  // {
  //   slug: "50l-9",
  //   versionName: "50L-9 / 45L-9 / 40L-9 ",
  // },
  // {
  //   slug: "33l-7a",
  //   versionName: "33L-7A / 30L-7A / 25L-7A ",
  // },
  {
    slug: "20l-7m",
    versionName: "20L-7M / 18L-7M / 15L-7M ",
  },
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
          categoryName: 'HYUNDAI HÀN QUỐC',
          noiBat: noiBat,
          noiBatOther: noiBatOther,
          anToan: anToan,
          otherBlock: otherBlock,
          videos: videos,
          hinhAnh: [hinhAnh]
        }


      await createProductVersion(newProduct)
      })
      .catch(e => {
        console.log('fail get data ')
      })

  } catch (e) {
    console.log(e)
  }

})


