import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
            toast.success("Categories loaded successfully!");
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubCategories = async (categoryId) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
            setSubCategories(data.data);
            toast.success("Subcategories loaded successfully!");
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            toast.error("Failed to load subcategories. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto pt-10">
            <h2 className="text-4xl text-center text-green-600 mb-10">Categories</h2>

            {isLoading && <p className="text-center text-lg text-green-500">Loading...</p>}

            <div className="grid grid-cols-12 gap-5 mb-5">
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="col-span-4 cursor-pointer hover:shadow-lg border rounded-lg overflow-hidden"
                        onClick={() => fetchSubCategories(category._id)}
                    >
                        <img
                            className="w-full h-72 object-cover"
                            src={category.image}
                            alt={category.name}
                        />
                        <h3 className="text-2xl text-green-500 text-center p-5">{category.name}</h3>
                    </div>
                ))}
            </div>

            {subCategories.length > 0 && (
                <div className="mt-10 p-10">
                    <h2 className="text-3xl text-green-600 mb-5">Subcategories</h2>
                    <div className="grid grid-cols-12 gap-5">
                        {subCategories.map((sub) => (
                            <div
                                key={sub._id}
                                className="col-span-4 border border-spacing-2 p-5 rounded-lg shadow-sm"
                            >
                                <h4 className="text-lg text-green-700 text-center">{sub.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}