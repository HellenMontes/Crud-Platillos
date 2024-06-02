import { Guardar, onSnapshot, collection, db, Borrar, mostrar, guardarCambios } from "./firebase.js";

const formPlatilos = document.getElementById("form-platillos");
const ContainerPlat = document.getElementById("container-platillos");

let editStatus = false;
let id = "";


/*Valida campos del form */
function validaForm() {
    const nombre = formPlatilos["nombre"].value;
    const precio = formPlatilos["precio"].value;
    const descripcion = formPlatilos["descripcion"].value;
    const categoria = formPlatilos["categoria"].value;
    const ingredientes = formPlatilos["ingredientes"].value;

    if (!nombre || !precio || !descripcion || !categoria || !ingredientes) {
        alert("Completa todos los campos antes de guardar.");
        return false;
    }
    return true; 
}


window.addEventListener("DOMContentLoaded", async () => {
    onSnapshot(collection(db, "platillos"), (querySnapshot) => {
        let html = "";
    /*Formato para mostrar la informacion*/
        querySnapshot.forEach((doc) => {
            const platillo = doc.data();
            html += `
                <div class="cards">
                    <h3>${platillo.title}</h3><br>
                    <p><b>Precio:</b> $ ${platillo.preci}</p>
                    <p><b>Descripcion:</b> <br>${platillo.description}</p>
                    <p><b>Ingredientes:</b> <br>${platillo.ingredient}</p>
                    <p><b>Categoria: </b>${platillo.categori}</p>
                    <button class="btn-borrar" data-id="${doc.id}">Borrar</button>
                    <button class="btn-editar" data-id="${doc.id}">Editar</button>
                </div>
            `;
        });
        ContainerPlat.innerHTML = html;


        /*Boton para borrar registros*/
        const btnBorrar = ContainerPlat.querySelectorAll('.btn-borrar');
        btnBorrar.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                confirm(dataset.id);
            });
        });

        /*Boton para editar datos*/
        const btnsEdit = ContainerPlat.querySelectorAll('.btn-editar');
        btnsEdit.forEach(async (btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await mostrar(e.target.dataset.id);
                const platillo = doc.data();

                formPlatilos['nombre'].value = platillo.title;
                formPlatilos['descripcion'].value = platillo.description;
                formPlatilos['precio'].value = platillo.preci;
                formPlatilos['ingredientes'].value =platillo.ingredient;
                formPlatilos['categoria'].value =platillo.categori;
                editStatus = true;
                id = doc.id;
                formPlatilos['btn-guardado'].innerText = 'Guardado';
            });
        });
    });
});

/* Función para confirmar la eliminación */
function confirm(id) {
    const confirmed = window.confirm("¿Está seguro de que desea eliminar este elemento?");
    if (confirmed == true) {
        Borrar(id);
    }else {
        return false;
    }
}


/* Actualizar info*/
formPlatilos.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validaForm()){
        return;
    }

    const title = formPlatilos["nombre"];
    const description = formPlatilos["descripcion"];
    const preci = formPlatilos["precio"];
    const ingredient = formPlatilos["ingredientes"];
    const categori =formPlatilos["categoria"];

    if (!editStatus) {
        Guardar(title.value, description.value, preci.value, ingredient.value, categori.value);
    } else {
        guardarCambios(id, {
            title: title.value,
            description: description.value,
            preci: preci.value,
            ingredient: ingredient.value,
            categori:categori.value,
        }); 
        editStatus = false;
    }
    formPlatilos.reset(); /*vaciar el formulario*/
});
