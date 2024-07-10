import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import {token} from './token.js';



async function downloadImage(url) {
    const listStr = url.split('/');
    const fileName = listStr.slice(-1)[0];
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const formData = new FormData();
  formData.append('files', Buffer.from(response.data), {
    filename: fileName
  })
  
  
    axios.post('http://localhost:1337/api/upload',formData, {
        headers: {
            Authorization: `Bearer ${token.TokenUploadLocal}`,
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryiQPXFxXcNQKcehBG',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            ...formData.getHeaders(),
        }
    }).then(res => console.log("sucess:=====", res.data))
    .catch(err => console.error("error:=====", err));

//   fs.writeFile(filename, response.data, (err) => {
//     if (err) throw err;
//     console.log('Image downloaded successfully!');
//   });
}

downloadImage('https://admin.nlp168.com.vn/wp-content/uploads/2022/10/XE-NANG-20brj-1.jpg', './image/image.jpg');