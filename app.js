
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome! This is a small journal app on Node.js using express-npm and ejs. To add your daily log, simply write  /compose after the link in the address bar of your browser. you can click on about us page for more information thanks";
const aboutContent = "Hi there, I'm Priyajeet Saxena. I am a web designer and developer, and this is a small project website deployed on cyclic. I will include the github repo of this project so you can see it and use it if you want. Feel free to add some changes. If you want to contact me, you can click on the contact page. thanks.";
const contactContent = "	you can contact me on :-";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render('home',{ homeStartingContent: homeStartingContent, posts: posts });
 });

 app.get("/about", function (req, res) {
  res.render('about',{ aboutContent: aboutContent });

 });

 app.get("/contact", function (req, res) {
  res.render('contact',{ contactContent: contactContent });

 });

 app.get("/compose", function (req, res) {
  res.render('compose');

 });

 app.get('/posts/:topic', function(req, res) {
  const reqtitle  = _.lowerCase(req.params.topic);
  
  posts.forEach(function(posts){
    const storedtitle = _.lowerCase(posts.title);
    if (reqtitle === storedtitle) {
      console.log("match")
      res.render("post",{
        title:posts.title,
        content:posts.content
      })
    }
  });
});

 app.post('/compose', function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

 
 







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
