

import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
    try {
    const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
    } catch (error) {
    console.log(error);
    }
};

export const getAllAdminProducts = async () => {
    try {
    const res = await fetch("https://sopify-lac.vercel.app/api/admin/all-products", {
        method: "GET",
        cache: "no-store",
    });

    const data = await res.json();

    return data;

    } catch (error) {
    console.log(error);
    }
};

export const updateAProduct = async (formData) => {
    try {
    const res = await fetch("/api/admin/update-product", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
    } catch (e) {
    console.log(e);
    }
};

export const deleteAProduct = async (id) => {
    try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        },
    });

    const data = await res.json();

    return data;
    } catch (e) {
    console.log(e);
    }
};

export const productByCategory = async (id) => {
    try {
    const res = await fetch(
        `https://sopify-lac.vercel.app/api/admin/product-by-category?id=${id}`,
        {
        method: "GET",
        cache: "no-store",
        }
    );

    const data = await res.json();

    return data;
    } catch (e) {
    console.log(e);
    }
};

export const productById = async (id) => {
    try {
    const res = await fetch(
        `http://localhost:3000/api/admin/product-by-id?id=${id}`,
        {
        method: "GET",
        cache: "no-store",
        }
    );

    const data = await res.json();

    return data;
    } catch (e) {
    console.log(e);
    }
};