// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
// const cors = require('cors');
// const knex = require('knex');
// const multer = require('multer');

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: 'password',
//         database: 'travelblog'
//     }
// })

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// //single file jpg, png storage

// let storage = multer.diskStorage({
//     dsetination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },

//     filename: (req, file,cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },

//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' && ext !== '.png') {
//             return cb(res.status(400).end('only jpg and png are allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// const upload = multer({storage: storage}).single("file");



// app.post('/createPost', (req,res) => {
//     const {title, coverImage, content} = req.body;




// })

// app.post("/uploadfiles", (req, res) => {
//     upload(req, res, err => {
//         if (err) {
//             return res.json({success: false, err});
//         }
//         return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
//     })
// })

// app.listen(2000, ()=> {
//     console.log("app is  running on port 2000");
// });
