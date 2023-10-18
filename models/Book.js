const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: Number, required: true },
    publisher: String,
    publicationYear: { type: Number},
    description: String,
    isAvailable: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    categories: [{ type: String, enum: ["Science fiction", "Fantasy", "Romance", "Horror", "Biography", "Philosophy", "Classic Literature", "Science"] }],
    ratings: { type: [Number], default: [] },
    edition: String,
    awards: [String],
    language: { type: String, enum: ['English', 'French', 'Spanish', 'German', 'Arabic', 'Turkish', 'Chinese'] },

});

module.exports = mongoose.model('Book', bookSchema);

