const express = require ("express");
const path = require ("path");
const fs = require("fs/promises");
// const { readFile } = require ("fs");
// const shorturl = require("node-url-shortener");
const shortURL = require("../middlewares/shortURL.js");
const app = express();


app.use(express.static(path.join(__dirname,"..",'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//  app.use("/shortUrls");

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"..", "pages/index.html"))
 }) 

 app.post("/shortUrls", shortURL, async (req, res) => {
   let data;
   try {
      data = await fs.readFile(path.resolve("/data.json"), "utf-8");
      data = JSON.parse(data);
      
   } catch (error) {
      data = [];
   }

    res.shorturl = `${req.protocol}://${req.get('host')}/${res.shortURL}`;

    let newUrl = {
        fullUrl : req.body.fullUrl,
        shorturl: res.shorturl,
        slug: res.shortURL
    }

    data.push(newUrl);

    await fs.writeFile(path.resolve("/data.json"), JSON.stringify(data));

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

 app.get("/:slug", async (req, res)=>{
   let smallUrl;
   try {
      smallUrl = await fs.readFile(path.resolve("/data.json"), "utf-8");
      smallUrl = JSON.parse(smallUrl)
   } catch (error) {
      smallUrl = [];
   }
   let getURL = smallUrl.find((link)=>{
      return link?.slug === req.params.slug
   });
   if(getURL){
     return res.redirect(getURL.fullUrl);
   }
   console.log(getURL);
   res.status(404).send();
   //  res.status(200).json(JSON.parse(data));   
 });

module.exports = app;

