const { makeQueryString } = require('../src/utils.js');

test('Should return the same query with 1 module', () => {
    const result = makeQueryString(1)
    const query = 'SELECT `vsi_vendor` as `vendor`, `vsi_model` as `name`, `vsi_swver` as `soft`, `modem_macaddr` as `mac` FROM \
`docsis_modem`.`docsis_update` WHERE `vsi_vendor` = ? AND (`vsi_model`<> ? OR `vsi_swver`<> ?) GROUP BY `vendor`, `name`, `soft`, `mac`';
    if (result !== query) {
        throw new Error('Result should be the same of query. Got ' + result)      
    }
})


test('Should return the same query with 0 module', () => {
    const result = makeQueryString()
    const query = 'SELECT `vsi_vendor` as `vendor`, `vsi_model` as `name`, `vsi_swver` as `soft`, `modem_macaddr` as `mac` FROM \
`docsis_modem`.`docsis_update` WHERE `vsi_vendor` = ? GROUP BY `vendor`, `name`, `soft`, `mac`';
    if (result !== query) {
        throw new Error('Result should be the same of query. Got ' + result)      
    }
})

test('Should return the same query with 2 module', () => {
    const result = makeQueryString(2)
    const query = 'SELECT `vsi_vendor` as `vendor`, `vsi_model` as `name`, `vsi_swver` as `soft`, `modem_macaddr` as `mac` FROM \
`docsis_modem`.`docsis_update` WHERE `vsi_vendor` = ? AND (`vsi_model`<> ? OR `vsi_swver`<> ?) AND (`vsi_model`<> ? OR `vsi_swver`<> ?) GROUP BY `vendor`, `name`, `soft`, `mac`';
    if (result !== query) {
        throw new Error('Result should be the same of query. Got ' + result)      
    }
})