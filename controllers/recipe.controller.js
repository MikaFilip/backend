const path = require("path");
const RecipeDao = require("../dao/recipe.dao");
let dao = new RecipeDao(path.join(__dirname, "..", "storage", "recipes.json"))

exports.getOne= async function (req, res) {
    let id = req.params.id;
    console.log("id = "+id);
    result = await dao.one(id);
    res.status(200).json(result);
};


exports.getAll = async function(req, res) {
    var ret = [];
    var data = await dao.all();
    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        ret.push(value);
    }
    console.log("result = "+ret);
    res.status(200).json(ret);
};

exports.add = async function(req, res){
	let data = req.body;
    console.log("data = "+JSON.stringify(data));
    await dao.add(data);
    res.status(200).json(data);
};
