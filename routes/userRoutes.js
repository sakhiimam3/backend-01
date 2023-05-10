const UserRouter = require("express").Router();
const userController = require("../controllers/usercontroller");


UserRouter.post("/user/register",userController.registerUser);
UserRouter.post("/user/login", userController.loginUser);
UserRouter.get("/user/logout", userController.logout);





module.exports = UserRouter;
