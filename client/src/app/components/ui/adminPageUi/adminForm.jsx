import React from "react";
import PropTypes from "prop-types";

import TextFieldAdmin from "../../common/form/textFieldAdmin";
import SelectFieldAdmin from "../../common/form/selectFieldAdmin";
import useForm from "../../../hook/useForm";
import { useSelector } from "react-redux";
import { getUserId } from "../../../service/localStorage.service";

const AdminForm = ({ data, onSubmit, categoriesList }) => {
    const { form, handleChange, handleSubmit } = useForm(data, onSubmit);
    const userId = useSelector(getUserId);

    if (userId) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <TextFieldAdmin
                        name="prodNum"
                        value={form.prodNum || ""}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                    />
                    <SelectFieldAdmin
                        defaultOption="Choose..."
                        name="category"
                        options={categoriesList}
                        onChange={handleChange}
                        value={form.category || ""}
                    />
                    <TextFieldAdmin
                        name="price"
                        value={form.price || ""}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="count"
                        value={form.count || ""}
                        onChange={handleChange}
                    />
                    <TextFieldAdmin
                        name="image"
                        value={form.image || ""}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-100 mx-auto"
                    >
                        {data ? "Редактировать" : "Добавить"}
                    </button>
                </form>
            </>
        );
    }
    return "Зайдите под своим аккаунтом";
};

AdminForm.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    categoriesList: PropTypes.array
};

export default AdminForm;
