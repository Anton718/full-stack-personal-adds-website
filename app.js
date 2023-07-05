const express = require('express')
const app = express()
const port = process.env.port || 3000
const bodyParser = require('body-parser');  
const urlencodedParser = bodyParser.urlencoded({ extended: false })  
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:1234567@localhost:5432/my_data')
const path = require('path')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

app.use(cookieParser('rwervterbj353jhbdkfhv'))

app.set('view engine', 'ejs')

app.get(['/', '/index'], async (req, res) => {
  try {
    const token = req.signedCookies.token
    const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
  return res.render('index', { active: 'index', response: '', token: token, user: user.username})
} catch { undefined }
res.render('index', { active: 'index', response: '', token: '', user: ''})
})

app.get('/logout', async (req, res) => {
  res.clearCookie('token')
  var response = "You logged out"
  res.render('index', {active: 'index', response: response, token: ''})
})

app.post('/signup', urlencodedParser, async (req, res) => {
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [req.body.name])
  const responseUser = {
    username: req.body.name,
    password: req.body.pass,
  }

  if (savedHash[0]) {
   await bcrypt.compare(req.body.pass, savedHash[0].pass, function(err, result) {
    if (!result) {
      response = `User ${(req.body.name).toLowerCase()} exists but the password is wrong`
      return res.render('index', {active: 'index', resonse: response, token: '', user: ''})
    } else {
      response = `You logged in, ${(req.body.name).toLowerCase()}`
      const token = jwt.sign(responseUser, 'rwervterbj353jhbdkfhv' , {expiresIn: 900});
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000000,
        signed: true
      })
      res.render('index', {active: 'index', response: response, token: token, user: req.body.name})
    }
})
} else {
   await bcrypt.hash(req.body.pass, 10, async function(err, hash) {
      if (err) throw err;
        await db.query("INSERT INTO Users(name, pass) VALUES ($1, $2)", [(req.body.name).toLowerCase(), hash])
      response = `You signed up as ${(req.body.name).toLowerCase()}`
      const token = jwt.sign(responseUser, 'rwervterbj353jhbdkfhv' , {expiresIn: 900});
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: 1000000,
        signed: true
      })
       res.render('index', {active: 'index', response:`You signed up as ${(req.body.name).toLowerCase()}`, token: token, user: req.body.name})
  })
}
  })
  
app.get('/contacts', (req, res) => {
  try {
  const token = req.signedCookies.token
  const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
  return res.render('contacts', {active: 'contacts', token: token, user: user.username})
  } catch { undefined }
res.render('contacts', {active: 'contacts', token: '', user: ''})
})

app.get('/blog', async (req, res) => {
  let posts;
  await db.query("SELECT * FROM posts ORDER BY id DESC")
.then(result => posts = result)
.catch(error => console.log(error))
try {
const token = req.signedCookies.token
const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
 return res.render('blog', {active: 'blog', posts: posts, response: '', token: token, user: user.username})
} catch {undefined}
res.render('blog', {active: 'blog', posts: posts, response: '', token: '', user: ''})
})

app.get('/blog/:id', async (req, res) => {
  try {
    const token = req.signedCookies.token
    const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
  await db.query("DELETE FROM posts WHERE id=$1 AND username=$2", [req.params.id, user.username])
} catch { 
  response = 'Cannot delete others posts'
res.render('blog', {active: 'blog', posts: posts, response: response, token: token, user: user.username})

}
  res.redirect('/blog')
})

app.post('/form', urlencodedParser, async (req, res) => {
responseForm = {  
    email: req.body.email,  
    text: req.body.textarea, 
};  
await db.one('INSERT INTO messages(email, text) VALUES ($1, $2)', 
[req.body.email, req.body.textarea])
.then((data) => {
  console.log('DATA:', data.value)
})
.catch((error) => {
  console.log('ERROR:', error)
})

const token = req.signedCookies.token
const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
res.render('form', {active: '', token: token, user: user.username});  
})

app.post('/post', urlencodedParser,  async (req, res) => {
  responsePost = {  
      title: req.body.title,  
      post: req.body.post,
  };  
  try {
    const token = req.signedCookies.token
    const user = jwt.verify(token, 'rwervterbj353jhbdkfhv')
  if (user) {
  await db.one('INSERT INTO posts(title, content, username) VALUES ($1, $2, $3)', 
  [req.body.title, req.body.post, user.username])
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
  res.redirect('blog'); 
} } catch {
  response = `You need to be signed up to post`
  return res.render('blog', {active: 'blog', response: response, posts: '', token: '', user: ''})
}
  })

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

