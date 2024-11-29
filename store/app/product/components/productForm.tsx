"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ProductForm({ accessToken }: { accessToken?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, price } = formData;

    if (!name || !description || !price) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ name, description, price: parseFloat(price) }),
      });

      if (response.ok) {
        setMessage("Product created successfully!");
        setFormData({ name: "", description: "", price: "" });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Failed to create product.");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Typography variant="h5">Create New Product</Typography>
        {message && (
          <Typography
            sx={{ color: message.startsWith("Error") ? "error.main" : "success.main" }}
          >
            {message}
          </Typography>
        )}
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <TextField
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            multiline
            rows={4}
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <TextField
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Product price"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Add Product
        </Button>
      </Box>
    </>
  );
}

export default ProductForm;
