import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import basketService from "../../../service/basket.service";
import {
    getCountDec,
    getCountInc,
    loadBasketsList
} from "../../../store/baskets";

const BasketCartListCounter = ({ product, prodId }) => {
    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBasketsList(counter));
    }, [counter]);

    const formatCount = () => {
        return counter !== 0 ? counter : product.countPay;
    };

    const handleIncrement = async () => {
        const { count } = product;
        await basketService.updateCount(product);
        dispatch(getCountInc({ counter, count, ...product }));
        await basketService.incCount(prodId, counter, count, product);
        setCounter((prevState) => prevState + 1);
    };

    const handleDecrement = async () => {
        const { count } = product;
        if (counter < 0) {
            const counter = 0;
            await basketService.updateCount(product);
            dispatch(getCountDec(prodId, counter, count));
            await basketService.decCount(prodId, counter, count, product);
            setCounter((prevState) => prevState - 1);
        } else if (counter > 0) {
            await basketService.updateCount(product);
            dispatch(getCountDec(prodId, counter, count));
            await basketService.decCount(prodId, counter, count, product);
            setCounter((prevState) => prevState - 1);
        }
    };

    return (
        <>
            <div onClick={handleDecrement} role="button">
                <HiMinus
                    size={20}
                    style={{
                        background: "#ffc107",
                        borderRadius: 25
                    }}
                />
            </div>
            <span className="badge bg-primary mx-2">{formatCount()}</span>
            <div onClick={handleIncrement} role="button">
                <FaPlus
                    size={20}
                    style={{
                        background: "#ffc107",
                        borderRadius: 25
                    }}
                />
            </div>{" "}
        </>
    );
};

BasketCartListCounter.propTypes = {
    product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    prodId: PropTypes.string
};

export default BasketCartListCounter;
