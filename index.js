const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://guru-bondhu.web.app",
        "https://guru-bondhu.firebaseapp.com"
    ],
}));
app.use(express.json());

let products = [
    {
        "id": 1,
        "name": "Rice",
        "sku": "sku",
        "modifiedByName": "Asduzzaman Hisam",
        "modifiedByProfilePhotoUrl": "https://rps-static-assets.s3.ap-southeast-2.amazonaws.com/test-onpoint-images/pp-d3b6d059-ef7e-481b-8497-a370d4dac49e",
        "modifiedAt": "2025-02-03T15:28:20.600398Z",
        "creatorName": "Asduzzaman Hisam",
        "categoryId": 2,
        "description": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "attrs": {
                        "textAlign": null
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Hi Hello"
                        }
                    ]
                }
            ]
        },
        "currencyId": 3,
        "cost": 10,
        "price": 20,
        "pricingModel": "Fixed",
        "isRecurring": true,
        "billingPeriod": "Monthly",
        "images": []
    },
    {
        "id": 2,
        "name": "Car",
        "sku": "sku",
        "modifiedByName": "Asduzzaman Hisam",
        "modifiedByProfilePhotoUrl": "https://rps-static-assets.s3.ap-southeast-2.amazonaws.com/test-onpoint-images/pp-d3b6d059-ef7e-481b-8497-a370d4dac49e",
        "modifiedAt": "2025-02-03T16:21:10.853817Z",
        "creatorName": "Asduzzaman Hisam",
        "categoryId": 2,
        "description": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "attrs": {
                        "textAlign": null
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Hi Hello"
                        }
                    ]
                }
            ]
        },
        "currencyId": 3,
        "cost": 10,
        "price": 20,
        "pricingModel": "12",
        "isRecurring": true,
        "billingPeriod": "Quarterly",
        "images": []
    },
    {
        "id": 3,
        "name": "Car",
        "sku": "sku",
        "modifiedByName": "Asduzzaman Hisam",
        "modifiedByProfilePhotoUrl": "https://rps-static-assets.s3.ap-southeast-2.amazonaws.com/test-onpoint-images/pp-d3b6d059-ef7e-481b-8497-a370d4dac49e",
        "modifiedAt": "2025-02-03T16:21:10.853817Z",
        "creatorName": "Asduzzaman Hisam",
        "categoryId": 2,
        "description": null,
        "currencyId": 3,
        "cost": 10,
        "price": 20,
        "pricingModel": "12",
        "isRecurring": true,
        "billingPeriod": "Quarterly",
        "images": []
    }
];

// Sample categories data
let categories = [
    {
        "id": 1,
        "name": "Electronics",
        "description": "Devices and gadgets"
    },
    {
        "id": 2,
        "name": "Clothing",
        "description": "Apparel and fashion"
    },
    {
        "id": 3,
        "name": "Home & Kitchen",
        "description": "Furniture and appliances"
    }
];
// Sample currency data
let currencies = [
    {
        "id": 2,
        "code": "BDT",
        "name": "Bangladesh Currency"
    },
    {
        "id": 7,
        "code": "USD",
        "name": "Kindom"
    }
];

// GET /products
app.get('/products', (req, res) => {
    // console.log('Products:', products);

    res.json(products);
});

// POST /products
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        ...req.body,
        modifiedAt: new Date().toISOString(),
        modifiedByName: "Asduzzaman Hisam",
        modifiedByProfilePhotoUrl: "https://rps-static-assets.s3.ap-southeast-2.amazonaws.com/test-onpoint-images/pp-d3b6d059-ef7e-481b-8497-a370d4dac49e",
        creatorName: "Asduzzaman Hisam",
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// POST /products/delete
app.post('/products/delete', (req, res) => {
    const ids = req.body;  // Directly expecting an array of product IDs

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'Invalid input. Please provide an array of product IDs.' });
    }

    let deletedCount = 0;

    // Loop through the provided IDs and delete products
    ids.forEach(id => {
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            products.splice(productIndex, 1);  // Delete the product
            deletedCount++;  // Increment the deleted count
        }
    });

    if (deletedCount > 0) {
        res.status(200).json({ message: `${deletedCount} product(s) successfully deleted.` });
    } else {
        res.status(404).json({ message: 'No products found to delete.' });
    }
});

// GET /products/:productId
app.get('/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId); // Convert to number

    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
});


// PUT /products/:productId
app.put('/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const updatedProductData = req.body;

    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updatedProductData,
        modifiedAt: new Date().toISOString(),
        modifiedByName: "Asduzzaman Hisam",
        modifiedByProfilePhotoUrl: "https://rps-static-assets.s3.ap-southeast-2.amazonaws.com/test-onpoint-images/pp-d3b6d059-ef7e-481b-8497-a370d4dac49e"
    };

    res.status(200).json({ message: "Successfully updated" });
});

// GET /categories
app.get('/categories', (req, res) => {
    res.json(categories);
});

// POST /categories - Create a new category
app.post('/categories', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    const newCategory = {
        id: categories.length + 1, // Auto-increment ID
        name,
        description
    };

    categories.push(newCategory);
    res.status(201).json({ message: "Successfully created" });
});
// DELETE /category/:categoryId - Delete a category by ID
app.delete('/category/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);

    // Find the index of the category with the given ID
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);

    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Category not found" });
    }

    // Remove the category from the array
    categories.splice(categoryIndex, 1);

    res.json({ message: "Successfully deleted" });
});
// PUT /categories/:id - Update a category by ID
app.put('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { name, description } = req.body;

    // Find the category by ID
    const category = categories.find(cat => cat.id === categoryId);

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    // Update the category
    category.name = name || category.name;
    category.description = description || category.description;

    res.json({ message: "Successfully updated" });
});
// GET /currency - Fetch all currencies
app.get('/currency', (req, res) => {
    res.json(currencies);
});
// POST /currency - Create a new currency
app.post('/currency', (req, res) => {
    const { code, name } = req.body;

    if (!code || !name) {
        return res.status(400).json({ message: "Code and name are required" });
    }

    const newCurrency = {
        id: currencies.length + 1, // Auto-increment ID
        code,
        name
    };

    currencies.push(newCurrency);
    res.status(201).json({ message: "Successfully created" });
});
// DELETE /currency/:currencyId - Delete a currency by ID
app.delete('/currency/:id', (req, res) => {
    const currencyId = parseInt(req.params.id);

    // Find the index of the currency with the given ID
    const currencyIndex = currencies.findIndex(currency => currency.id === currencyId);

    if (currencyIndex === -1) {
        return res.status(404).json({ message: "Currency not found" });
    }

    // Remove the currency from the array
    currencies.splice(currencyIndex, 1);

    res.json({ message: "Successfully deleted" });
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
