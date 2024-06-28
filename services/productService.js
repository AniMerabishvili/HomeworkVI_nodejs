const productModel = require('../models/product');

module.exports = {
    getAll: (req, res) => {
        productModel.find ({})
        .then (data => {
            res.json(data);
        })
        .catch (error => {
            res.status(500).json(error);
        })
    },
    getOne: async (req, res) => {
        try {
            const item = await productModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    add: async (req, res) => {
        try {
            const savedItem = await new productModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        const { specifications } = req.body; // Extract specifications from req.body
    
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(
                req.params.id,
                { specifications },
                { new: true }
            );
    
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    },
    search: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const title = req.query.title;
    
        const query = {};
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
    
        try {
            const products = await productModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
    
            const count = await productModel.countDocuments(query);
    
            res.json({
                products,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalProducts: count
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}