import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import basketService from "../../../service/basket.service";
import {
    getCountDec,
    getCountInc,
    // getUpdateCount,
    loadBasketsList
} from "../../../store/baskets";

// function initialCount() {
//     const count = useSelector(selectCount);
//     return count;
// }

// function initialCount() {
//     const count = useSelector(selectCount);
//     return count;
// };

const BasketCartListCounter = ({ product, prodId }) => {
    console.log(product);
    console.log(prodId);

    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBasketsList(counter));
    }, [counter]);

    const formatCount = () => {
        return counter !== 0 ? counter : product.countPay;
    };

    const handleIncrement = async () => {
        console.log("handleIncrement", product);
        // if (prodId) {
        // console.log(prodId);
        await basketService.updateCount(product);
        // dispatch(getUpdateCount(prodId, product));
        dispatch(getCountInc({ counter, ...product }));
        await basketService.incCount(prodId, counter, product);
        setCounter((prevState) => prevState + 1);
        // }

        // if (product.countPay >= 1) {
        //     const newLocalPay = productsItems.filter(
        //         (product) => product.count === product.count--
        //     );
        //     localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        // }
        // setCountProduct(product.countPay++);
    };

    const handleDecrement = async () => {
        console.log("handleDecrement", product);
        if (counter < 0) {
            const counter = 0;
            await basketService.updateCount(product);
            dispatch(getCountDec(prodId, counter));
            await basketService.decCount(prodId, counter, product);
            setCounter((prevState) => prevState - 1);
        } else if (counter > 0) {
            await basketService.updateCount(product);
            dispatch(getCountDec(prodId, counter));
            await basketService.decCount(prodId, counter, product);
            setCounter((prevState) => prevState - 1);
            // }
            // if (product.countPay <= 1) {
            //     const newLocalPay = productsItems.filter(
            //         (product) => product.count === product.count++
            //     );
            //     localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        }
        // setCountProduct(product.countPay--);
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
            {/* <span className="badge bg-primary mx-2">{counter}</span> */}
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
    prodId: PropTypes.string,
    // handleIncrement: PropTypes.func,
    // handleDecrement: PropTypes.func,
    counter: PropTypes.number
};

export default BasketCartListCounter;
