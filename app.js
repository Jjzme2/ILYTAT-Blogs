const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js")
const _ = require('lodash');
const app = express();

const discordInfo = "https://discord.gg/cE53DwRt";
const dayContent = date.getTimeOfDay();
const contactInfo = "Jjzettler@Gmail.com";
const homeContent = "welcome to ILYTATWrites.";
const aboutContent = "This is the about section Content.";
const contactContent = "If you are interested in reaching me, feel free to contact me at";


let postRedir = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



const connectLink = "mongodb+srv://Jjzme2:tBYrKITMQ8RNwcjl@blog-site.t39wt.mongodb.net/posts?retryWrites=true&w=majority";


mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });


// Schemas

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});

//Models
const Post = mongoose.model("Post", PostSchema);

//Initial Array
const post1 = new Post({ title: "My First Post", body: "This is a post", description: "Really just a test" });
const post2 = new Post({ title: "Second Post Here", body: "Hello World!", description: "Second Description" });
const post3 = new Post({ title: "Third Post Here", body: "Goodbye World!", description: "Third Description" });

const posts = [];



// App Get

app.get("/", function(req, res) {

    if (!posts) {
        posts = [post1, post2, post3];
        posts.save();
    }
    res.render('home', {
        content: homeContent,
        timeOfDay: dayContent,
        posts: posts
    });
});

app.get("/about", function(req, res) {
    res.render('about', {
        content: aboutContent,
        timeOfDay: dayContent
    });
});

app.get("/contact", function(req, res) {
    res.render('contact', {
        content: contactContent,
        timeOfDay: dayContent,
        email: contactInfo,
        discord: discordInfo,
    });
});

app.get("/compose", function(req, res) {
    res.render('compose', {
        // homeContent: contactContent,
        timeOfDay: dayContent
    });
});

// app.get('/post', function(req, res) {
//   res.render('post'), {
//     posts: posts,
//   }
// })

//Verbatim Copy
// app.get("/posts/:postName", function(req, res){
//   const reqestedTitle = _.lowerCase(req.params.postName);
//   posts.forEach(function(post){
//     const storedTitle = _.lowerCase(post.title);
//
//     if(storedTitle === reqestedTitle){
//       res.render("post", {
//        title: post.title,
//        content: post.body
//        });
//     }
//
//   })
// })


//My Attempt
app.get('/posts/:post', function(req, res) {

    let post = _.lowerCase(req.params.post);

    posts.forEach(function(p) {
        if (post === _.lowerCase(p.title)) {
            res.render(`post`, {
                // content: p.description,
                postTitle: p.title,
                postBody: p.body
            });
        }
    })
})

app.post("/compose", function(req, res) {
    let post = {
        title: req.body.postTitle,
        body: req.body.postBody
    };

    posts.push(post);
    res.redirect("/");
});

app.listen(3000, function(req, res) {
    console.log("Server started on port 3000.");
});