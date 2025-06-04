function users(page) {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'
    const REQRES_ENDPOINT = "https://api.escuelajs.co/api/v1/users";
    fetch(REQRES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    })
      .then((response) => {
        return response.json().then(
          data => {
          return {
            status: response.status,
            info: data,
          };
        });
      })
      .then((result) => {
        console.log("resultado ", result);
        if (result.status === 200) {
          let listusers = `
          <button type="button" class="btn btn-outline-success" onclick="createUser()">Agregar</button>
              <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Rol</th>
        <th scope="col">Email</th>
        <th scope="col">Acción</th>

      </tr>
    </thead>
    <tbody>`;
          result.info.forEach(element => {
             listusers =  listusers + `   
            <tr>
                  <td>${element.id}</td>
                  <td>${element.name}</td>
                  <td>${element.role}</td>
                  <td>${element.email}</td>
                  <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
            </tr>
            `
          });
          listusers= listusers + `
              </tbody>
          </table>    
          <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
          `
          document.getElementById("info").innerHTML =  listusers;
        } 
        else {
          document.getElementById("info").innerHTML =
            "No existe usuarios en la Base de Datos";
        }
      });
  }
  function getUser(idUser){
    const REQRES_ENDPOINT = "https://api.escuelajs.co/api/v1/users/"+idUser;
    fetch(REQRES_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
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
        if(response.status === 200){
            const user = response.body
            const modalUser = `
            
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="card">
                        <img src="${user.avatar}" class="img-thumbnail" alt="Avatar del usuario">
                        <div class="card-body">
                            <h5 class="card-title">Informacion del Usuario:</h5>
                            <p class="card-text">Nombre: ${user.name}</p>
                            <p class="card-text">Rol: ${user.role}</p>
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
        else{
            document.getElementById('info').innerHTML = 
            '<h3>No se encontro el usuario en la Api</h3>'
        }
    })
  }

  function createUser(){
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
                    <form id="formCreateUser">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="name" placeholder="Name" aria-label="Name" required>
                            </div>
                            <div class="col">
                                <input type="email" class="form-control" id="email" placeholder="Email" aria-label="Email" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <input type="password" class="form-control" id="password" placeholder="Password" aria-label="Password" required>
                            </div>
                            <div class="col">
                                <input type="url" class="form-control" id="avatar" placeholder="avatar" aria-label="Avatar" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
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

function saveUser(){
    const form = document.getElementById('formCreateUser')
    if(form.checkValidity()){
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const avatar = document.getElementById('avatar').value
        const user = {name, email, password, avatar}

        const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/users/'
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
                '<h3>Se guardo el usuario</h3>'
            }
            else{
                document.getElementById('info').innerHTML =
                '<h3>Error al guardar el usuario</h3>'
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