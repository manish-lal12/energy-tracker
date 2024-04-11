const mongoose = require('mongoose')

const EnergyDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name cannot be longer than 20 characters']
    },
    consumption: {
        type: Number,
        required: [true, 'provide consumption details'],
        maxlength: [10, 'consumption units cannot be more than 10 digits']
    }
})

module.exports = mongoose.model('EnergyData', EnergyDataSchema)