const express = require('express');
const router = express.Router();
const multer = require('multer');
const path   = require('path');
const indexmodel = require("../schema/indexmodel");

//postimage
router.post('/postimage',  async function(req, res, next) {
 
  try{
  upload(req,res,async function(err) {
    
    if(err) {
      console.log(err)
        return res.end("Error uploading file.");
    }
   

let imageArr = [];
req.files.map((img)=>{
  imageArr.push(img.path);
});

let body ={
  Image:imageArr
}
let Images=  await new indexmodel(body).save();

    res.end("File is uploaded",Images);
});
}catch(err){
console.log("err",err)
}
});

//getimage
router.get('/getImage', async function(req, res, next) {
  try{ 
    let data = await indexmodel.find()
   
    if(!data){
      res.send("Data not found");

    }else{
      res.send(data);
    }
  }
    catch(err){
console.log(err)
    }
 
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage }).array('Image',10);

module.exports = router;
