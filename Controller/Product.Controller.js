const router = require("express").Router();
const {Product} = require("../models")
const {Protect} = require("../Middleware/Auth");

router.post("/create-product", Protect, async (req,res) => {
    try {
        const id = req.user._id.toString()
        const bodyData = req.body
        bodyData.userId = id

        const product = new Product(bodyData);
        const result = await product.save()
        res.status(200).json(result)

    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
