const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    nit: { type: String, required: false, default: '' },
    active: { type: Boolean, default: true, required: true }
});

module.exports = model('Company', companySchema);