import queryString from 'query-string';

const params = {
    sort: ['title:asc'],
    filters: {
      title: {
        $eq: 'hello',
      },
    },
    populate: {
      author: {
        fields: ['firstName', 'lastName']
      }
    },
    fields: ['title'],
    pagination: {
      pageSize: 10,
      page: 1,
    },
    publicationState: 'live',
    locale: ['en'],
  };
const query = queryString.stringify(params, {arrayFormat: 'bracket'}, false);

console.log(query);