const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("articles", articleSchema);


app.get("/articles", (req, res) => {

    Article.find()
        .then((foundList) => {
            res.send(foundList);
        })
        .catch((err) => console.log(err))
    
})

app.get("/articles/:title", (req, res) => {
    
    const titleName = req.params.title;

    Article.findOne({ title: titleName })
        .then((foundObject) => {
            console.log("Successfully fetched !!");
            res.send(foundObject);
        })
            
        .catch((err) => console.log(err))
})

/* Since there is no frontend for this application so we can send the POST rqst through POSTMAN

i) go to POSTMAN
ii) Set the method as POST & setup the route URL
iii) Go to Body then x-www-form-urlencoded   (so that we can get the data through BodyParser)
iv) then give the data and SEND

*/


app.post("/articles", (req, res) => {


    const newPost = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newPost.save()
        .then(() => console.log("Successfully saved") )
        .catch((err) => console.log(err))
})

app.put("/articles/:title", (req, res) => {
    
    const titleName = req.params.title;

    Article.updateOne({ title: titleName }, {
        $set: {
            title: req.body.title,
            content: req.body.content
        }
    })
        .then(() => console.log("Successfully Updated !!"))
        .catch((err) => console.log(err))
})

app.patch("/articles/:title", (req, res) => {
    
    Article.updateOne({ title: req.params.title }, { $set: req.body })
        .then(() => console.log("Successfully update the article"))
        .catch((err) => console.log(err))
})

app.delete("/articles/:title", (req, res) => {
    
    const titleName = req.params.title;

    Article.deleteOne({ title: titleName })
        .then(() => console.log("Successfully deleted !!!"))
        .catch((err) => console.log(err))


})

/*  Delete Rqst through POSTMAN

app.delete("/articles", (req, res) => {

    Article.deleteMany()
        .then(() => console.log("Successfully Deleted !!"))
        .catch((err) => console.log(err))
})

*/



app.listen(5000, () => console.log("Server is listening to port 5000"));