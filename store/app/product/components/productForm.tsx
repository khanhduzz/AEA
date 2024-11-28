"use client"
import { useState } from "react";

function ProductForm({ accessToken }: { accessToken?: string }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description || !price) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({ name, description, price: parseFloat(price) }),
            });

            console.log(response);


            if (response.ok) {
                setMessage("Product created successfully!");
                setName("");
                setDescription("");
                setPrice("");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setMessage("Failed to create product.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Product</h2>
            {message && <p>{message}</p>}
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
}
export default ProductForm;