import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa6";
import { HiMinus } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectCount } from "../../../store/counterSlice";

function initialCount() {
    const count = useSelector(selectCount);
    return count;
}

const BasketCartListCounter = ({ product, prodId }) => {
    console.log(product);
    console.log(prodId);

    const [counter, setCounter] = useState(initialCount());

    const handleIncrement = () => {
        console.log("handleIncrement", product);
        setCounter((prevState) => prevState + 1);
        // if (product.countPay >= 1) {
        //     const newLocalPay = productsItems.filter(
        //         (product) => product.count === product.count--
        //     );
        //     localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        // }
        // setCountProduct(product.countPay++);
    };

    const handleDecrement = () => {
        console.log("handleDecrement", product);
        setCounter((prevState) => prevState - 1);
        // if (product.countPay <= 1) {
        //     const newLocalPay = productsItems.filter(
        //         (product) => product.count === product.count++
        //     );
        //     localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        // }
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
            {/* <span className="badge bg-primary mx-2">{product.countPay}</span> */}
            <span className="badge bg-primary mx-2">{counter}</span>
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
