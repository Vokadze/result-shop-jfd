const express = require("express")
const auth = require("../middleware/auth.middleware")
const Basket = require("../models/Basket")
const router = express.Router({mergeParams: true})

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const list = await Basket.find()
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
              });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newBasket = await Basket.create({
                ...req.body,
                _id: req._id
            })
            res.status(201).send(newBasket)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
              });
        }
    })
    router.patch("/:basket", auth, async (req, res) => {
        try {
            if (req.body) {
                const newBasketUptate = await Basket.findByIdAndUpdate(req.body._id, req.body, {new: true})
                res.status(200).send(newBasketUptate)
            } else {
                res.status(401).json({ message: "NOT_FOUND"})
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
              });
        }
    })

    router.delete("/:prodId", auth, async (req, res) => {
        try {
            const { prodId } = req.params

            const removedBasketProduct = await Basket.findById(prodId)

            if (removedBasketProduct._id.toString() === prodId) {
                await removedBasketProduct.deleteOne()
                return res.send(null)
            } else {
                return res.status(401).json({ message: "Unauthorized delete" })
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
              });
        }
    })

    module.exports = router