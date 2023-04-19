const productSchema = require("../model/productSchema");



// all product services
const getAllproductsService = async (req, res) => {
  try {
    const allproduct= await productSchema.find()
    if(!allproduct){
      return false;
    }
    else{
       return allproduct
    }
   
  } catch (error) {
    return false;
  }
};


//  update product services
const upDateProductService = async (id,updateData) => {
  var product= await productSchema.findById(id)
  try {
      
       if(!product){
               return false 
       }
        else {
               product= await productSchema.findByIdAndUpdate(id,updateData,{
                   new:true,
                   runValidators:true,
                   useFindAndModify:false
               })
               return product;
        }
    
  } catch (error) {
     console.log(error)
  }
};

//  Delete product services
const deleteProductService = async (id) => {
  try {
    const deletedProduct = await productSchema.findByIdAndDelete(id);
    if (!deletedProduct) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllproductsService ,upDateProductService,deleteProductService};
