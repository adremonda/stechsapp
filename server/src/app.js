const express = require('express');
const { check, query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const { connection } = require('./db.js');
const { makeQueryString } = require('./utils.js');
const cablemodem = require('./cablemodem.js');

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
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  let query_params=[req.query.vendor];
  try {
    const _cablemodems = cablemodem.loadModels();
    //buscamos vendor sin incluir cablemodems
    const [vendors] = await connection.promise().execute(
      makeQueryString(), query_params
    );
    if (!vendors.length) // si no encontramos, avisamos que no hay vendor
      return res.status(404).send({ message: 'Vendor not found' });

    for (let model of _cablemodems) {
      query_params.push(model.name)
      query_params.push(model.soft)
    }

    const [modems] = await connection.promise().execute(
      makeQueryString(_cablemodems.length), query_params
    );
    return res.status(200).send({ data: modems, message: 'OK' });
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
async (req, res) => {
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