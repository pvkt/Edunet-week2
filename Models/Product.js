const mongoose = require("mongoose"); //importing mongoose

// defining the scheme / Sample model
const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: Number,
    discount: String,
    offer_price: Number,
    reviews: String,
});

const Product = mongoose.model("Product",productSchema); //creating the model
module.exports = Product;  // exporting the model
//Exports the Product model so it can be used in other files.