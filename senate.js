import {senateData} from "./senate-data.mjs"
import {states} from "./states-data.mjs"

const members = senateData.results[0].members; // creamos una variable donde le damos el valor de la ruta que nos lleva a la array con la que vamos a trabajar
const checkboxes = document.querySelectorAll("input[type=checkbox]"); // creamos una variable que contenga los checkboxes que hemos creado en html
const dropdownMenu = document.querySelector('.states-options'); // variable que contiene la clase del elemento select de nuestro html
let check = [] // declaramos una variable que contenga una array vacía para utilizarla más tarde con nuestro filter

function createTable(array) { //creamos una array para crear una tabla

const tableBody = document.querySelector(".table_body"); // seleccionamos la clase del body de la tabla
tableBody.innerHTML = ''; // le vaciamos el contenido

for (let i = 0; i < array.length; i++) { //hacemos un bucle para recorrer cada elemento de la array
    const name = array[i].first_name + " " + array[i].last_name; // cogemos cada propiedad con la que vayamos a trabajar en la tabla y la metemos en una variable
    const url = array[i].url;
    const party = array[i].party;
    const state = array[i].state;
    const yearsInOffice = array[i].seniority;
    const votesPercentage = array[i].votes_with_party_pct;

    const tableRow = document.createElement("tr"); // creamos el elemento 'fila' dentro de una variable
    const link = document.createElement("a") // creamos un elemento con la etiqueta 'a' para los links de los nombres 

    link.href = url; // le damos un valor a href del link que hemos creado anteriormente
    link.appendChild(document.createTextNode(name)); // metemos la variable name dentro de la variable link

    const nameCell = document.createElement("td"); // creamos las celdas donde irán nuestras variables
    const partyCell = document.createElement("td");
    const stateCell = document.createElement("td");
    const yearsInOfficeCell = document.createElement("td"); 
    const votesPercentageCell = document.createElement("td");

    nameCell.appendChild(link); // metemos cada variable con las propiedades de la array dentro de cada celda creada anteriormente
    partyCell.appendChild(document.createTextNode(party));
    stateCell.appendChild(document.createTextNode(state));
    yearsInOfficeCell.appendChild(document.createTextNode(yearsInOffice));
    votesPercentageCell.appendChild(document.createTextNode(votesPercentage)); 

    tableRow.appendChild(nameCell); // metemos las celdas dentro de las filas 
    tableRow.appendChild(partyCell);
    tableRow.appendChild(stateCell);
    tableRow.appendChild(yearsInOfficeCell);
    tableRow.appendChild(votesPercentageCell); 

    tableBody.appendChild(tableRow); // metemos las filas dentro del table body
}

}

createTable(members); // llamamos a la función

function createDropdown(array) { // creamos una función para crear y poner las opciones del Dropdown
  const states = Object.keys(array);  // con esta constante cojemos solo la propiedad de 'key' del Objeto, obviando la de 'value' (mirar referencia si hace falta)
  states.forEach((key, index) => { // hacemos un 'forEach.' para que para cada uno de nuestros elementos 'KEY', haga lo siguiente:
    const stateOptions = document.createElement('option'); // se cree un elemento option
    stateOptions.value = `${key}`;// donde el valor será la key del objeto que hemos cogido antes
    stateOptions.text =`${key}`; // así como también lo será el texto que nos aparezca
    dropdownMenu.appendChild(stateOptions); // finalmente añadimos las opciones a nuestra variable 'dropdownMenu' que creamos antes                                     
  });                                      // cuyo valor es el elemento con clase 'state-options'
}

createDropdown(states);


function filterOptions (event) {  //creamos una función donde pondremos el evento que deseamos filtrar (a los eventos siempre se les llama EVENT o EV!!)
    check =  Array.from(checkboxes).filter(element => element.checked).map(element => element.value); // igualamos una constate state al 'value' de los checkboxes
      // la variable de array 'check' que declaramos al principio la convertimos en un array de los checkboxes, 
      // a los que le hacemos un filter con los elementos checked y luego lo convertimos en una nueva array con map de dichos elementos
    const state = dropdownMenu.value; // creamos una variable con el 'value' del elemento select del html que será nuestro dropdown (donde filtraremos los estados)
    let  membersFiltered = []; // declaramos una variable array que después nos servirá para 'pushear' nuestros elementos 'filtrados'
    if (check.length === 0 && state === "All states") {
      membersFiltered = event; // damos la primera condición (la condición por defecto) donde mostramos todo
    } else { // ahora hacemos una condición para cada caso que queramos
      event.forEach(element => {
        if (check.length !== 0 && state === "All states") { // en esta primera opción aparecerá la selección 'todos los estados' pero se filtrará por el partido
          if (check.includes(element.party)) {              // así pues le decimos que si nuestra array check incluye la propiedad party que queremos
           membersFiltered.push(element);                   // nos la puseé en la array antes creada y nos la muestre en pantalla 
          }
        } else if (check.length === 0 && state !== "All states") { // en esta segunda opción hacemos lo mismo que en la primera pero con la propiedad de state
          if (element.state === state) {
           membersFiltered.push(element);
          }
        } else {
          if (check.includes(element.party) && element.state === state) { // en nuestra última condición le pedimos que si incluye la propiedad 'party' que queremos 
            membersFiltered.push(element);                                // así como que la propiedad de 'state' coincida con el 'value' del dropdown que metimos antes en la constante 'state'
          }                                                               // nos puseé ambos elementos en la array creada y nos los devuelva
        } 
      });
    } 
      return createTable(membersFiltered); // finalmente nuestra array se mostrará en nuestra función donde creamos la tabla
  };

  filterOptions(members) // llamamos a la función

// function createEventListener (array) { // creamos una función para el eventlistener donde abarcaremos ambos casos
    dropdownMenu.addEventListener('change',()=>{ // en primer lugar el dropdown, donde nos tendrá que devolver la función de 'filterOptions'
    return filterOptions(members)
    });
    checkboxes.forEach(function(checkbox) { // en segundo lugar los checkboxes, donde utilizaremos el método 'forEach' para recorrer cada elemento de la array
      checkbox.addEventListener('change', () =>{ // en cada checkbox o elemento de la array añadimos un eventlistener
        return filterOptions(members); // le pedimos  que nos devuelva la función de 'filterOptions'
        });
      })
  //}

 // createEventListener(members) // llamamos a la función



