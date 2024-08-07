const products = require('express').Router();
const db = require('../models');
const { Product } = db;

//GET ALL PRODUCTS

products.get('/', async (req, res) => {
    try {
        const allProducts = await Product.findAll();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET AVAILABLE PRODUCTS FROM USER

products.get('/available/:id', async (req, res) => {
    try {
        const allProducts = await Product.getAvailableProductsFromUser(req.params.id);
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

products.get('/withsellers', async (req, res) => {
    try {
        const allProducts = await Product.getAllProductsWithSeller();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET NEXT AVAILABLE PRODUCT
products.get('/:id/next', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        const next = await Product.findNextAvailableProduct(product.id);
        res.status(200).json(next);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET PREVIOUS AVAILABLE PRODUCT
products.get('/:id/previous', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        const previous = await Product.findPreviousAvailableProduct(product.id);
        res.status(200).json(previous);
    } catch (error) {
        res.status(500).json(error);
    }
});


products.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.getProductsFromCategory(req.params.category);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);

    }
}
);


//GET PRODUCT BY ID

products.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


//GET PRODUCT ASSOCIATED TO SELLER OBJECT

products.get('/seller/:id', async (req, res) => {
    try {
        const product = await Product.getProductAndSeller(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET PRODUCTS BY SELLER ID

products.get('/user/:id', async (req, res) => {
    try {
        const products = await Product.getProductsFromUser(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

products.post('/sell', async (req, res) => {
    try {
      // Validate the request data
      if (!req.body.name || !req.body.price || !req.body.category 
        || !req.body.brand || !req.body.model || !req.body.size
        || !req.body.sellerId || !req.body.imageUrl || !req.body.description) {
        return res.status(400).json({ error: 'Invalid data' });
      }
  
      // Create a new product
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        model: req.body.model,
        size: req.body.size,
        condition: req.body.condition,
        productDescription: req.body.description,
        imageUrl: req.body.imageUrl,
        sellerId: req.body.sellerId

      });
  
      // Save the product to the database
      await product.save();
  
      // Respond with the created product
      res.status(201).json(product);
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


products.post('/edit', async (req, res) => {
    try {
      // Validate the request data
      if (!req.body.id || !req.body.name || !req.body.price || !req.body.category 
        || !req.body.brand || !req.body.model || !req.body.size
        || !req.body.sellerId || !req.body.imageUrl || !req.body.description) {
          console.log("reqbody: " + req.body);
  
          return res.status(400).json({ error: 'Invalid data 400' });
      }
  
      // Find the existing product
      const oldProduct = await Product.findByPk(req.body.id);
      oldProduct.name = req.body.name;
      oldProduct.price = req.body.price;
      oldProduct.category = req.body.category;
      oldProduct.brand = req.body.brand;
      oldProduct.model = req.body.model;
      oldProduct.size = req.body.size;
      oldProduct.condition = req.body.condition;
      oldProduct.productDescription = req.body.description;
      oldProduct.imageUrl = req.body.imageUrl;
      oldProduct.sellerId = req.body.sellerId;
      
      // Save the product to the database
      await oldProduct.save();
  
      // Respond with the updated product
      res.status(201).json(oldProduct);
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  
products.post('/delete', async (req, res) => {
try {
    // Validate the request data
    if (!req.body.id) {
    return res.status(400).json({ error: 'Invalid data' });
    }

    // Find the existing product
    const oldProduct = await Product.findByPk(req.body.id);
    await oldProduct.destroy();
    res.status(201).json(oldProduct);
} catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
    }
}
);



module.exports = products;




