import {DataCategory} from '../data/constant.js';

console.log(DataCategory.danhmucs.edges.length);

const hyundaiTQ = DataCategory.danhmucs.edges[7].node;


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

console.log('====', children)
const newCate = {
  "name": hyundaiTQ.name,
  "description": hyundaiTQ.description,
  "fieldCategory": hyundaiTQ.fieldCategory.order,
  "slug": hyundaiTQ.slug,
  "locale": "vi",
  children: children
}
console.log('========================')