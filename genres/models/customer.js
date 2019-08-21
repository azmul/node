const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required(),
        phone: Joi.string().alphanum().min(3).max(30).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema)
  }

module.exports = {
    Customer: Customer,
    validateCustomer: validateCustomer
}