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

/* Here we are going to use the concept of Chained Routing of express
So in Chained Routing if we are doing the operations in a single location (here it is /articles) then it is better to use chained routing.
*/

app.route("/articles")
    
.get((req, res) => {

        Article.find()
            .then((foundList) => {
                res.send(foundList);
            })
            .catch((err) => console.log(err))
    
})

.post((req, res) => {

        const newPost = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newPost.save()
            .then(() => console.log("Successfully saved"))
            .catch((err) => console.log(err))
})

.delete ((req, res) => {

    Article.deleteMany()
        .then(() => console.log("Successfully Deleted !!"))
        .catch((err) => console.log(err))
})
    



/* Since there is no frontend for this application so we can send the POST rqst through POSTMAN

i) go to POSTMAN
ii) Set the method as POST & setup the route URL
iii) Go to Body then x-www-form-urlencoded   (so that we can get the data through BodyParser)
iv) then give the data and SEND

*/


/*  Delete Rqst through POSTMAN

app.delete("/articles", (req, res) => {

    Article.deleteMany()
        .then(() => console.log("Successfully Deleted !!"))
        .catch((err) => console.log(err))
})

*/



app.listen(5000, () => console.log("Server is listening to port 5000"));