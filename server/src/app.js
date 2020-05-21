const express = require('express');
const { check, query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const {Cablemodem, Sequelize} = require('./models');
const cablemodem = require('./utils/cablemodem.js');
const Op = Sequelize.Op;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get('/cablemodems', 
[
  query('vendor').exists().withMessage('The vendor is required'),
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const _vendor = req.query.vendor;
  try {
    const _cablemodems = cablemodem.loadModels();
    let where = {vendor: _vendor};
    //buscamos vendor sin incluir cablemodems
    Cablemodem.findOne( {
      where: where
    }).then( vendor => {
      if (!vendor) // si no encontramos, avisamos que no hay vendor
        return res.status(404).send({ message: 'Vendor not found' });
    })
    where[Op.and] = [];
    for (let model of _cablemodems) {
      where[Op.and].push({[Op.or]: [{name: {[Op.ne]: model.name}}, {soft: {[Op.ne]: model.soft}}]})
    }
    Cablemodem.findAll( {
      where: where,
      group: ['vendor', 'name', 'soft', 'mac']
    }).then( modems => {
      return res.status(200).send({ data: modems, message: 'OK' });
    })
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: err.message });
  }
})

app.post('/cablemodems', 
[
  check('vendor').exists().bail().isString(),
  check('name').exists().bail().isString(),
  check('soft').exists().bail().isString()
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  try {
    if (cablemodem.addModel(req.body.vendor, req.body.name, req.body.soft)) {
      return res.status(201).send({ message: 'OK' });
    } else {
      return res.status(409).send({ message: 'Cablemodem model already exist' });
    }

  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: err.message });
  }
})
module.exports = app;