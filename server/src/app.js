const express = require('express');
const { check, validationResult } = require('express-validator');
const { connection } = require('./db.js');
const { makeQueryString } = require('./utils.js');
const app = express();

app.use(express.json());

app.post('/models/verify', 
[
  check('vendor').exists().bail().isString(),
  check('models').exists().bail().isArray(),
  check('models.*.name').exists().bail().isString(),
  check('models.*.soft').exists().bail().isString()
],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() })
  const _models = req.body.models;
  let query_params=[req.body.vendor+'%'];
  try {
    //buscamos vendor sin incluir models
    const [vendors] = await connection.promise().execute(
      makeQueryString(0), query_params
    );
    if (!vendors.length) // si no encontramos, avisamos que no hay vendor
      return res.status(404).send({ message: 'vendor not found' });

    for (let model of _models) {
      query_params.push(model.name)
      query_params.push(model.soft)
    }

    const [modems] = await connection.promise().execute(
      makeQueryString(_models.length), query_params
    );
    return res.status(200).send({ data: modems, message: 'OK' });
  }
  catch (err) {
    console.log(err);
    return res.status(500).send({ error: err, message: err.message });
  }
})

module.exports = app;