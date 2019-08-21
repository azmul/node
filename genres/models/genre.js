const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    }
});

const Genre = mongoose.model('Genre', genreSchema)

module.exports = {
    Genre: Genre,
    genreSchema: genreSchema
}