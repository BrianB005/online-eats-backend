const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');


const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  
  let products;
  
    products = await Product.find({}).sort('createdAt');
  res.status(StatusCodes.OK).json({ count: products.length,products});
  
}  
const searchProducts = async (req, res) => {
	const query  = req.query.search_query;
  let products;
	try {
    products = await Product.find({name: { $regex: query,$options:'i'}});
		res.status(200).json({ products });
    if (products.length<1){
      res.status(200).json({msg:"No products match your search!!"})
    }
	} catch (err) {
		// console.log(err, 'search failed');
		res.status(500).json({
			msg: 'Please try again later',
		});
	}
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const searchCategoryProducts = async (req, res) => {
	const query  = req.query
	try {
    const products = await Product.find(query);
		res.status(200).json({ products });
    
    
	} catch (err) {
		console.log(err, 'filter failed');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: `Success! Product with id ${productId }removed.` });
};
const getAllCategories=async(req,res)=>{
  const categories=await Product.find({}).distinct('category');
  res.status(200).json(categories)
}
 
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  searchCategoryProducts,
  getAllCategories,
};
