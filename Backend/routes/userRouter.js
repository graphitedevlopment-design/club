const express = require('express');
const router = express.Router(); 
router.use(express.json());
router.use(express.urlencoded({extended:true}));

const userModel = require('../models/userModel');
// const jwt= require('jsonwebtoken');


// function verifyAdmin(req,res,next){
//   let token=req.headers.token;
//   try {
//     if(!token) throw 'Unauthorised access';
//     else{
//         let payload=jwt.verify(token,'Admin');
//         if(!payload) throw 'Unauthorized access';
//         next();                                 
//     }
//   } catch (error) {
//     console.log(error);
//   }
  
// }

/***************************route******************/


router.get('/', async (req, res) => {
try {
//    const Data = await userModel.find({approved:true});
      const Data = await userModel.find();
  //  console.log(Data)
   res.send({"hi" : Data})
} catch (error) {
  res.status(404).send('data not found');
}
});



module.exports = router;