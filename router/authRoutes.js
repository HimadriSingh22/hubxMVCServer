const authController = require("../controller/authController");

module.exports=(router)=>{
    router.route('/login').post(authController.login);
    router.route('/signup').post(authController.register);
}