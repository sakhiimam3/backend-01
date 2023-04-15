const { getAllproductsService } = require("../services/productService.js");
const responses = require("../constant/responses.js");

const getAllproducts = async (req, res) => {
  const data = await getAllproductsService();
  try {
    if (!data) {
      res.send(
        responses.genericResponse(500, false, null, {
          message: responses.FAILED,
        })
      );
      return;
    } else {
      res.send(
        responses.genericResponse(200, true, {
          message: responses.SUCCESS,
          data: data,
        })
      );
      return;
    }
  } catch (error) {
    res.send(
      responses.genericResponse(400, false, null, {
        message: responses.NETWORK_ERROR,
      })
    );
  }
};
module.exports = { getAllproducts };
