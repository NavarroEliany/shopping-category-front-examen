function category() {
    document.getElementById('cardHeader').innerHTML = '<h5>Lista de Categorias</h5>';
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories';
    
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        info: data,
    })))
    .then(result => {
        if (result.status === 200) {
            let listUsers = `
                <button type="button" class="btn btn-outline-success" onclick="createCategory()">Agregar Categoria</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Babosa</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            result.info.forEach(element => {
                listUsers += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.slug}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="getCategory(${element.id})">
                                Ver
                            </button>
                        </td>
                    </tr>
                `;
            });
            listUsers += `
                    </tbody>
                </table>
            `;
            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = 'No existen categorias en la base de datos.';
        }
    });
}
function getCategory(idCategory) {
    const REQRES_ENDPOINT = "https://api.escuelajs.co/api/v1/categories/" + idCategory;

    fetch(REQRES_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1",
        },
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            const element = response.body;
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                            <img src="${element.image}" class="img-thumbnail" alt="Imagen del producto">
                            <div class="card-body">
                                <h5 class="card-title">Información del Producto:</h5>
                                <p class="card-text">ID: ${element.id}</p>
                                <p class="card-text">Nombre: ${element.name}</p>
                                <p class="card-text">Babosa: ${element.slug}</p>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API.</h3>';
        }
    });
}

function createCategory(){
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card">
                <div class="card-body">
                    <form id="formCreateCategory">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="name" placeholder="Name" aria-label="Name" required>
                            </div>
                            <div class="col">
                                <input type="url" class="form-control" id="image" placeholder="Image" aria-label="Image" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <button type="button" class="btn btn-success" onclick="saveCategory()">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    `
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()

}

function saveCategory(){
    const form = document.getElementById('formCreateCategory')
    if(form.checkValidity()){
        const name = document.getElementById('name').value
        const image = document.getElementById('image').value
        const user = {name, image}

        const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/categories/'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((result) =>{
            return result.json().then(
                data =>{
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })
        .then((response) =>{
            console.log('entra aca', response)
            if(response.status === 201){
                document.getElementById('info').innerHTML =
                '<h3>Se guardo la categoria</h3>'
            }
            else{
                document.getElementById('info').innerHTML =
                '<h3>Error al guardar la categoria</h3>'
            }
            const modalId = document.getElementById('modalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
        form.reportValidity()
    }
    
}