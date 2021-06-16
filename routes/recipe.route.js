module.exports = app => {
    const recipe = require("../controllers/recipe.controller.js");
  
    var router = require("express").Router({mergeParams: true});
  
   
  
    router.get('/:id', recipe.getOne);
    
    router.get('/',  recipe.getAll);

    router.post('/',  recipe.add);
    
    app.use('/recipe', router);
    
  };