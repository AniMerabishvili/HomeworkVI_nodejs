const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: {type: Array} [{
        warehouse: {type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    specifications: { type: String, required: true },
}, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;