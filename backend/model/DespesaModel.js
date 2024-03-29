const mongoose = require('mongoose');

const DespesaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"Despesa"
       
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
       
    },
    description: {
        type: String,
        required: true,
        maxLenght: 20,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Despesa', DespesaSchema)