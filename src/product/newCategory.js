import {DataCategory} from '../data/constant.js';
import {createNewCategory, updateNewCategory, updateTruck} from "./common-product.js";
import {listTruckHanQuoc} from "./listTrucks.js";

let listTrucks ={};
listTruckHanQuoc.forEach(item => {
  listTrucks[item.slug] = item.id
})
console.log(listTrucks, '========', listTruckHanQuoc.length)

function getModelNewCategory(num) {
  const hyundaiTQ = DataCategory.danhmucs.edges[num].node;


  const children = hyundaiTQ.children.edges.map(children => {
    return {
      name: children.node.name,
      slug: children.node.slug,
      groupProducts: children.node.children.edges.map(item => {
        return {
          name: item.node.name,
          slug: item.node.slug,
          trucks: item.node.sanphams.edges.map(item => listTrucks[item.node.slug])
        }
      })
    }
  })

  const newCate = {
    "name": hyundaiTQ.name,
    "description": hyundaiTQ.description,
    "fieldCategory": hyundaiTQ.fieldCategory.order,
    // "slug": hyundaiTQ.slug,
    "locale": "vi",
    children: children
  }
  return newCate;
  console.log(newCate, '======================')
}
// getModelNewCategory(3);

await updateNewCategory(5, getModelNewCategory(5))


async function createNewCate(num) {

  console.log('========================')

  try {
    await createNewCategory(newCate);

  } catch (e) {
    console.log('============errocer create ')
  }
}

// await createNewCate(7);

