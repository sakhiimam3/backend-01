const UserRouter = require("express").Router();
const userController = require("../controllers/usercontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


UserRouter.post("/user/register",userController.registerUser);
UserRouter.post("/user/login", userController.loginUser);
UserRouter.get("/user/logout", userController.logout);
UserRouter.post("/user/password/forgot", userController.forgotPassword);
UserRouter.post("/password/forgot", userController.forgotPassword);
UserRouter.put("/password/reset/:token", userController.resetPassword);
UserRouter.put("/password/update", isAuthenticatedUser,userController.updatePassword);
UserRouter.get("/me", isAuthenticatedUser,userController.getUserDetails);
UserRouter.put("/me/update", isAuthenticatedUser,userController.updateProfile);
UserRouter.get("/admin/allusers",isAuthenticatedUser, authorizeRoles("admin"),userController.getAllUser);
UserRouter.get("/admin/:id",isAuthenticatedUser,authorizeRoles("admin"),userController.getSingleUser);
UserRouter.put("/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),userController.updateUserRole)
UserRouter.delete( "/admin/user/:id",isAuthenticatedUser,authorizeRoles("admin"),userController.deleteUser);

















module.exports = UserRouter;
