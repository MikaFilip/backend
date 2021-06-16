module.exports = app => {
    const material = require("../controllers/material.controller.js");
  
    var router = require("express").Router({mergeParams: true});
  
   
  
    router.get('/:id', material.getOne);
    
    router.get('/',  material.getAll);

    router.post('/',  material.add);
    
    app.use('/material', router);
    
  };