import axios from "axios";
import {listProducts, listProductVersion, mapProductId, mapProductIdLocal} from "./constanst.js";
import {updateTruck} from "../product/common-product.js";


let mapProductType = {};

listProducts.forEach(item => {
  mapProductType[item.slug] = item.type
})

function getDataProduct(slug) {
  try {
    axios(`https://nlp168.com.vn/_next/data/pacNyJUtasePfXdVkdq3e/vi/san-pham/${slug}.json?slug=${slug}`)
      .then(async (res) => {
        if (res.data) {
          console.log('Get Product success');
        }
        const dataProd = res.data.pageProps.sanphams.edges.filter(item => item.node.slug === slug);

        const truck =  dataProd.length ? dataProd[0].node : null;
        
        if (truck && truck.xenangdau && truck.xenangdien && truck.xenangkhac) {
          
          const newTruck = {
            "taiTrong": truck.xenangdien.taitrong,
            "tamTai": truck.xenangdien.tamtai,
            "chieuCaoNang": truck.xenangdien.chieucao,
            "dongCo": truck.xenangdau.dongco,
            "congSuat": truck.xenangdau.congsuat,
            "chieuDaiCang": truck.xenangdau.chieudai,
            "hopSo": truck.xenangdau.hopso,
            "lopXe": truck.xenangdau.lop,
            "phanhXe": truck.xenangdau.phanh,

            "hanhLangDiChuyen": truck.xenangdien.hanhlangdichuyen,
            "motorDiChuyen": truck.xenangdien.motordichuyen,
            "motorNangHa": truck.xenangdien.motornangha,
            "hopDieuKhien": truck.xenangdien.hopdieukhien,

            "type": mapProductType[slug],
            "locale": "vi"
          }

          await updateTruck(mapProductId[slug], newTruck)


        }
        
      })
  } catch (e) {
    console.log('fail get data ', e.versionName, '==================')
  }
}



const listVersionNameHanQuoc = listProductVersion.filter(item => item.categoryName === "Combilift").map(item => item.versionName);


console.log(listVersionNameHanQuoc, '===');

const allName = [];

listVersionNameHanQuoc.forEach(name => {
  allName.push(...(name.split(' / ').map(item => item.trim().toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('/', '-'))))
})

console.log(allName, '=====allNAme')
// function crawlTruck(slug) {
//   const product = getDataProduct(slug);
//
//   if (product) {
//     console.log(product,'================')
//   }
// } 'spt-1000-(4-bánh)', 'spt-2000-(3-bánh)', 'spt-1000-(3-bánh)',

for(const slug of ['c2500-c25-000', 'ac-electric-aisle-master']) {
  getDataProduct(slug)
}


