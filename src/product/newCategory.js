import {DataCategory} from '../data/constant.js';
import {createNewCategory} from "./common-product.js";


async function createNewCate(num) {
  const hyundaiTQ = DataCategory.danhmucs.edges[num].node;


  const children = hyundaiTQ.children.edges.map(children => {
    return {
      name: children.node.name,
      slug: children.node.slug,
      groupProducts: children.node.children.edges.map(item => {
        return {
          name: item.node.name,
          slug: item.node.slug,
          trucks: []
        }
      })
    }
  })

  const newCate = {
    "name": hyundaiTQ.name,
    "description": hyundaiTQ.description,
    "fieldCategory": hyundaiTQ.fieldCategory.order,
    "slug": hyundaiTQ.slug,
    // "locale": "vi",
    children: children
  }
  console.log('========================')

  try {
    await createNewCategory(newCate);

  } catch (e) {
    console.log('============errocer create ')
  }
}

await createNewCate(7);

