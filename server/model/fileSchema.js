const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    filename: {
        type: String, required: true
    },
    path: { 
        type: String, required: true
    },
    size: {
        type: Number, required: true
    },
})

const File = mongoose.model('file', fileSchema);
module.exports = File;