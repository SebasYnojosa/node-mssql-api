import { getConnection } from "../database/connection.js"
import sql from "mssql";
 
export const getProducts = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM products;");

    res.send(result.recordset);
}   

export const getProduct = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query("SELECT * FROM products WHERE id = @id")

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" })
    }


    return res.json(result.recordset[0]);
}

export const createProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('name', sql.VarChar, req.body.name)
        .input('price', sql.Decimal, req.body.price)
        .input('quantity', sql.Int, req.body.quantity)
        .input('description', sql.Text, req.body.description)
        .query("INSERT INTO products (name, price, quantity, description) VALUES (@name, @price, @quantity, @description); SELECT SCOPE_IDENTITY() AS id;")

    res.json({ 
        id: result.recordset[0].id,
        name: req.body.name, 
        price: req.body.price, 
        quantity: req.body.quantity, 
        description: req.body.description 
    })
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    
    const pool = await getConnection();

    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.VarChar, req.body.name)
        .input('price', sql.Decimal, req.body.price)
        .input('quantity', sql.Int, req.body.quantity)
        .input('description', sql.Text, req.body.description)
        .query("UPDATE products SET name = @name, price = @price, quantity = @quantity, description = @description WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" })
    }

    return res.json({ message: "Producto actualizado exitosamente" });
} 

export const deleteProduct = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query("DELETE FROM products WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Producto no encontrado" })
    }

    return res.json({ message: "Producto eliminado exitosamente" });
}