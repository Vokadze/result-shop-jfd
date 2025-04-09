// 1. У любого пользователя будет как минимум в БД categories
// 2. Они равны mock данным

const Category = require("../models/Category")
const Product = require("../models/Product")
const Basket = require("../models/Basket")

const categoryMock = require("../mock/categories.json")
const productsMock = require("../mock/products.json")
const basketsMock = require("../mock/baskets.json")

module.exports = async ()=> {
    const categories = await Category.find()
        if (categories.length !== categoryMock.length) {
            await createInitialEntity(Category, categoryMock)
        }
    const products = await Product.find()
        if (products.length !== productsMock.length) {
            await createInitialEntity(Product, productsMock)
        }
    const baskets = await Product.find()
        if (baskets.length !== basketsMock.length) {
            await createInitialEntity(Basket, basketsMock)
        }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}