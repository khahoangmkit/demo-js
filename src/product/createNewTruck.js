import {DataCategory} from '../data/constant.js';
import {createNewTruck} from "./common-product.js";
import {uploadImageToStrapiFromUrl} from "../getUrlStrapiFromImageUrl.js";

const hyundaiTQ = DataCategory.danhmucs.edges[5].node;

const listProducts = [];

hyundaiTQ.children.edges.forEach(children => {
  children.node.children.edges.forEach(item => {
    item.node.sanphams.edges.forEach(prod => {
      listProducts.push({
        parentSlug: item.node.slug,
        name: prod.node.title,
        slug: prod.node.slug,
        description: prod.node.sanphamField2.mota,
        urlImg: prod.node.sanphamField2.image.sourceUrl
      })
    })
    })
})

// console.log(listProducts,' =================', listProducts.length);
// for (const truck of listProducts) {
//
//   const uploadedOtherBlockFiles = await uploadImageToStrapiFromUrl(truck.urlImg);
//   const imageOtherBlockId = uploadedOtherBlockFiles[0].id;
//   const upTruck = await createNewTruck({
//     name: truck.name,
//     slug: truck.slug,
//     description: truck.description,
//     thumb: imageOtherBlockId,
//     "locale": "vi",
//   });
//   console.log(upTruck.data.id)
// }
