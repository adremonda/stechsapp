const makeQueryString = (modelsLengt) => {
  let query = 'SELECT `vsi_vendor` as `vendor`, `vsi_model` as `name`, `vsi_swver` as `soft` \
FROM `docsis_modem`.`docsis_update` \
WHERE `vsi_vendor` like ?';
  if(modelsLengt>0) {
    let conditions = Array(modelsLengt).fill('(`vsi_model`<> ? OR `vsi_swver`<> ?)');
    query += ' AND ' + conditions.join(' AND ');
  }
  return query + ' GROUP BY `vendor`, `name`, `soft`';
}

module.exports = {
  makeQueryString
}