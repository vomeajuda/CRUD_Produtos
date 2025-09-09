import React, { useEffect, useState } from "react";
import api from "../services/api";
import "datatables.net";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/ProductTable";
import Swal from 'sweetalert2';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    console.log("abc");
    const res = await api.get("/products");
    setProducts(res.data);
    ProductTable(res.data, navigate, deleteProduct);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    const alerta = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja deletar este produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    });

    if (alerta.isConfirmed) {
      await api.delete(`/products/${id}`);
      loadProducts();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>
      <Button className="mb-3" onClick={() => navigate("/products/new")}>
        Novo Produto
      </Button>
      <table id="productsTable" className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ativo</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Ações</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}