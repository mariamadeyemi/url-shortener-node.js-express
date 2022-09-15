const express = require ("express");
const path = require ("path");
// const { readFile } = require ("fs");
// const shorturl = require("node-url-shortener");
const shortURL = require("../middlewares/shortURL.js");
const app = express();


app.use(express.static(path.join(__dirname,"..",'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//  app.use("/shortUrls");
let data = []
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"..", "pages/index.html"))
 }) 

 app.post("/shortUrls", shortURL, (req, res) => {
   

    res.shorturl = `${req.protocol}://${req.get('host')}/${res.shortURL}`;

    let newUrl = {
        fullUrl : req.body.fullUrl,
        shorturl: res.shorturl,
        slug: res.shortURL
    }

    data.push(newUrl);

    console.log(req.body);
    res.status(200).json(newUrl);
    // let getFullUrl = req.body.fullUrl;
    // console.log(res.shortURL);
    // getFullUrl = `https://${res.shortURL}`;
    // console.log(req.get('host'));
    // console.log(res.shortURL);
    // console.log(getFullUrl);


    // let newURL = {
    //     longurl: req.body.fullUrl
    // }
   //  res.redirect('/');
 });

 app.get("/:slug",  (req, res)=>{
   
   let getURL = data.find((link)=>{
      return link?.slug === req.params.slug
   });
   if(getURL){
     return res.redirect(getURL.fullUrl);
   }
   res.status(404).send();
   //  res.status(200).json(JSON.parse(data));   
 });

module.exports = app;

