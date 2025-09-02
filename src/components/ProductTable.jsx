import $ from "jquery";

function ProductTable(products, navigate, deleteProduct) {

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
    `<button class="btn btn-warning btn-sm me-2 edit-btn" data-id="${row.id}" title="Editar">
      <i class="fa fa-edit"></i>
    </button>
    <button class="btn btn-danger btn-sm delete-btn" data-id="${row.id}" title="Excluir">
      <i class="fa fa-trash"></i>
    </button>`
    )
  },
];
$("#productsTable").DataTable(
  {
    retrieve: true,
    data: products,
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

}

export default ProductTable;