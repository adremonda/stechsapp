const fs = require('fs');
const chalk = require('chalk');

const modelsPath = './data/models.json';

const getModels = (path) => {
    return fs.readFileSync(path).toString();
}

const addModel = (vendor, name, soft ) => {
    const data = loadData();
    duplicateModel = data.models.find( (model) => {
        return model.vendor === vendor && 
            model.name === name && 
            model.soft === soft
    });
    if (!duplicateModel) {
        data.models.push({
            vendor: vendor,
            name: name,
            soft: soft
        });
        saveData(data);
        console.log(chalk.green.inverse('model added'));
    } else {
        console.log(chalk.red.inverse('model exist'));
    }
    return !duplicateModel;
}

const saveData = (models) => {
    modelsJosn = JSON.stringify(models)
    try {
        fs.writeFileSync(modelsPath, modelsJosn);
    } catch (err) {
        console.log(`Error writing ${modelsPath}:` + err.message)
    }
}

const loadModels = () => {
    data = loadData()
    return data.models
}

const loadData = () => {
    try {
        modelsBuffer = fs.readFileSync(modelsPath)
        modelsJson = modelsBuffer.toString()
        return JSON.parse(modelsJson)
    } catch (err) {
        return {models:[]}
    }
}

module.exports = {
    getModels: getModels,
    addModel: addModel,
    loadModels: loadModels
}