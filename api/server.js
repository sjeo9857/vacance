const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const multer = require('multer');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'password',
        database: 'travelblog'
    }
})

const app = express();
const form = multer();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//single file jpg, png storage

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg and png are allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({storage: storage}).single("File");

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach((user)=> {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
        
    })
    if(!found){
        res.status(400).json('not found');
    }
})

app.post('/signin', (req, res) => {

    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data=> {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid) {
            return db.select('id', 'name', 'email', 'joined').from('users')
            .where('email', '=', req.body.email)
            .then(user=>{
                console.log('login user info returning')
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

//posts the new user and shows the latest user
app.post('/register', (req, res) => {
    const {email,password,name} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
              // loginEmail[0] --> this used to return the email
              // TO
              // loginEmail[0].email --> this now returns the email
              email: loginEmail[0].email,
              name: name,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
    .catch(err => res.status(400).json('unable to register'))
})


app.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err});
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

app.post("/uploadimage", (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log("error");
            return res.json({success: false, err});
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

app.post('/blogs', form.none(), (req, res) => {

    const title = req.body.title
    const coverImage = req.body.coverImage
    const content = req.body.content
    const tags = req.body.tags
    const author = req.body.author

    //coverImage has to be stored in colunm name: coverimage
    db.select('title', 'coverImage', 'content', 'tags', 'author', 'created').from('blogs')
    .insert({
        //if tags equals notselected, then display tags as none
        title: title,
        coverimage: coverImage,
        content: content,
        tags: tags,
        author: author,
        created: new Date() 
    })
    .returning('*')
    .then((blogs) =>{
        if (blogs[0].title === title && blogs[0].coverimage === coverImage && blogs[0].content === content 
            && blogs[0].tags === tags && blogs[0].author === author) {
            res.json({ success: true }); // Respond with success
          } else {
            res.status(400).json({ success: false, error: 'Unable to post blogs' }); // Respond with an error
          }
    })
    .catch((err) => {
        console.error('Error:', err); // Log the error to the console
        res.status(400).json({ success: false, error: 'Unable to post blogs' }); // Respond with an error
    })
})

app.get('/getBlogs', (req, res) => {
    db.select('*').from('blogs')
    .orderBy('created', 'desc')
    .then((blogs) => {
        res.json({success: true, blogs: blogs})
    })
    .catch((err) => {
        res.status(400).json({success: false, error: 'Unable to fetch blogs'})
    })
})

app.post('/getBlogs', (req, res) => {
    db.select('*').from('blogs')
    .where('id', '=', req.body.id)
    .then((blogs) => {
        console.log(blogs)
        res.json({success: true, blogs: blogs})
    })
    .catch((err) => {
        res.status(400).json({success: false, error: 'Unable to fetch blogs'})
    })
})

app.listen(process.env.PORT || 2000, ()=> {
    console.log(`app is  running on port ${process.env.PORT}`);
});
