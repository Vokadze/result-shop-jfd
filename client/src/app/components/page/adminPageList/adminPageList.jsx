import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import AdminProduct from "../../ui/adminPageUi/adminProduct";
import AdminTable from "../../ui/adminPageUi/adminTable";

import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../../store/categories";
import {
    getProductDeleteIds,
    getProducts,
    loadProductsList
} from "../../../store/products";

import history from "../../../utils/history";
import "./index.css";

const AdminPageList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ path: "prodNum", order: "asc" });
    const pageSize = 3;

    const products = useSelector(getProducts());

    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());

    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
    }, [products, categories]);

    const handleDelete = (id) => {
        dispatch(getProductDeleteIds(id));
    };

    const handleEdit = (param) => {
        history.push(`/admin/edit/${param}`);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (products) {
        const count = products.length;

        const productCrop = paginate(products, currentPage, pageSize);

        return (
            <div className="container admin-page-table-all">
                <div className="admin-page-form">
                    {categories && !categoriesLoading && (
                        <div className="container card">
                            <div className="card-body">
                                <h6 className="card-title">
                                    Блок для добавления или редактирования
                                    товара
                                </h6>
                                <AdminProduct products={products} />
                            </div>
                        </div>
                    )}
                    <div className="container admin-page-table">
                        <div className="p-0 m-0">
                            <AdminTable
                                data={products && productCrop}
                                products={productCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Loading adminPageList.jsx";
};

AdminPageList.propTypes = {
    products: PropTypes.array,
    product: PropTypes.array,
    prodId: PropTypes.string
};

export default AdminPageList;
