import React, { useEffect, useState } from "react";
import api from "../services/api";
import $ from "jquery";
import "datatables.net";
import { Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
    const columns = [
      { title: "ID", data: "id", width: "5%", },
      { title: "Nome", data: "nome", width: "30%", },
      { title: "Preço", data: "preco", width: "15%", render: (data) => `R$ ${data.toFixed(2)}` },
      { title: "Ativo", data: "ativo", width: "10%", render: (data) => data ? "Sim" : "Não" },
      { title: "Criado em", data: "data_criacao", width: "15%" },
      { title: "Atualizado em", data: "data_atualizacao", width: "15%" },
      {
        title: "Ações",
        data: null,
        width: "15%",
        orderable: false,
        render: (data, type, row) => (
          `
        <button class="btn btn-warning btn-sm me-2 edit-btn" data-id="${row.id}" title="Editar">
          <i class="fa fa-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}" title="Excluir">
          <i class="fa fa-trash"></i>
        </button>
        `
        )
      },
    ];
    $("#productsTable").DataTable(
      {
        retrieve: true,
        data: res.data,
        columns: columns,
        pagination: true,
        pageLength: 10,
      }
    );

    $('#productsTable').off('click', '.edit-btn');
    $('#productsTable').off('click', '.delete-btn');

    $('#productsTable').on('click', '.edit-btn', function () {
      const id = $(this).data('id');
      navigate(`/products/edit/${id}`);
    });

    $('#productsTable').on('click', '.delete-btn', function () {
      const id = $(this).data('id');
      deleteProduct(id);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Deseja deletar este produto?")) {
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