"use strict";
const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// 1
const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "recipes.json");

class RecipeDao {
    constructor(storagePath) {
        console.log("path = " + storagePath );
        this.storagePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
        console.log("path = " + this.storagePath);
        
    }

    async add(material) {
        let materials = await this._load();
        let id = material.id.toString();
        materials[material.id] = material;
        this._write(materials); 

    }

    async one(id){
        let materials = await this._load();
        let material = materials[id];
        return material;
    }


    async all(){
        let materials = await this._load();
        console.log("materials = "+materials);
        return materials;
    }


    async _load() {
        let materials;
        try {
            materials = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                materials = {};
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + this._getStorageLocation());
            }
        }
        return materials;
    }

    async _write(materials){
        try {
            await wf(this._getStorageLocation(), JSON.stringify(materials, null, 2));
            return book;
        } catch (error) {
            const e = new Error(`Failed to store book to local storage.`);
            e.code = "FAILED_TO_STORE_BOOK";
            throw e;
        }
    }

    _getStorageLocation() {
        return this.storagePath;
    }

}

module.exports = RecipeDao;