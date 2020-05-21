module.exports = (sequelize, DataTypes) => {
  const Cablemodem = sequelize.define('Cablemodem', {
    vendor: {
      type: DataTypes.STRING,
      field: 'vsi_vendor'
    },
    name: {
      type: DataTypes.STRING,
      field: 'vsi_model'
    },
    soft: {
      type: DataTypes.STRING,
      field: 'vsi_swver'
    },
    mac: {
      type: DataTypes.STRING,
      field: 'modem_macaddr'
    }
  }, {
    tableName: 'docsis_update',
    timestamps: false
  });
  Cablemodem.removeAttribute('id');
  return Cablemodem;
};