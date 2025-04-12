import React from "react";
import PropTypes from "prop-types";

import BasketShopList from "../basketShopList/basketShopList";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../../store/products";
import history from "../../../../utils/history";
import {
    createBasket,
    getBasketUpdateContent
} from "../../../../store/baskets";
import basketService from "../../../../service/basket.service";

const BasketShopPage = ({ prodId }) => {
    const dispatch = useDispatch();

    const product = useSelector(getProductById(prodId));

    const onAddProduct = (product) => {
        console.log(product);

        if (!prodId) {
            console.log(prodId);
            dispatch(getBasketUpdateContent(product));
        } else {
            console.log(product);
            basketService.fetchAll(prodId);
            basketService.create(prodId, product);
            dispatch(createBasket(product));
        }
        // const exist = productsItems.find((p) => p._id === product._id);
        // if (exist) {
        //     const newCartProducts = productsItems.map((p) =>
        //         p._id === product._id
        //             ? {
        //                   ...exist,
        //                   count: exist.count - 1
        //               }
        //             : p
        //     );
        //     setProductItems(newCartProducts);
        //     localStorage.setItem(
        //         "productsItems",
        //         JSON.stringify(newCartProducts)
        //     );
        // } else {
        //     const newCartProducts = [
        //         ...productsItems,
        //         {
        //             ...product,
        //             qty: 1,
        //             countPay: 1
        //         }
        //     ];
        //     setProductItems(newCartProducts);
        //     localStorage.setItem(
        //         "productsItems",
        //         JSON.stringify(newCartProducts)
        //     );
        // }
        history.push(`/basket`);
    };

    // useEffect(() => {
    //     // setProductItems(
    //         localStorage.getItem("productsItems")
    //             ? JSON.parse(localStorage.getItem("productsItems"))
    //             : []
    //     // );
    // }, []);

    if (product) {
        return (
            <div className="d-flex flex-column">
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Путь к товару"
                    className="mb-4 text-center border border-warning"
                    style={{ background: "#dee2e6" }}
                />

                <BasketShopList product={product} onAddProduct={onAddProduct} />
            </div>
        );
    } else {
        return "loading BasketShopPage.jsx";
    }
};

BasketShopPage.propTypes = {
    prodId: PropTypes.string
};

export default BasketShopPage;
