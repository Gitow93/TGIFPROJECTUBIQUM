import { houseData } from "/json/house-data.mjs";

const houseDataMembers = houseData.results[0].members;

const statistics = calculateNumberOfReps(houseDataMembers); // esta constante toma el valor de la función donde crearemos una array de objeto con las diferentes propiedades para la tabla
const leastEnganged = houseDataMembers // creamos una constante cuyo valor será el de el 10% de los menos comprometidos
  .sort((a, b) => b.missed_votes_pct - a.missed_votes_pct) // para ello utilizamos el metodo 'sort' en el array de houseDataMembers
  .slice(0, 46); // y luego aplicamos el metodo 'slice' para que nos muestre solo el 10% (10% de 455 =/ 46)

const mostEnganged = houseDataMembers //hacemos lo mismo con el 10% más comprometido
  .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
  .slice(0, 46);

function filterByParty(houseMembers, partyCode) {
  // hacemos el filter en una función para 'ahorrar codigo'
  return houseMembers.filter((member) => member.party === partyCode).length;
}

function calculateVotesAverageByParty(houseMembers, partyCode) {
  // creamos una función donde calcularemos la media de votos por partido
  const houseDataMembers = houseMembers.filter(
    (member) => member.party === partyCode
  ); // creamos una constante y hacemos el filter para que el value party sea igual a nuestro parametro
  if (houseDataMembers.length === 0) {
    // en este caso lo que queremos es desechar que nos de un error si en algún caso no hay miembros de un partido,
    return "The average cannot be calculated."; // por lo que si houseDataMembers.length es igual a 0, le decimos que nos devuelva una string
  }
  const totalVotes = houseDataMembers.reduce((acc, member) => {
    // en esta constante utilizamos el metodo reduce para hacer sacar el numero total de votos
    if (member.votes_with_party_pct !== undefined) {
      // con esta condición le decimos que mientras el value de member no sea undefined,
      return acc + member.votes_with_party_pct; // nos devuelva esta suma
    } else {
      return acc; // y para todo lo demás que sea sólo el acumulador 'acc'
    }
  }, 0);
  const average = totalVotes / houseDataMembers.length; // calculamos la media en una constante llamada 'average'
  return average.toFixed(2); // y le pedimos que nos la devuelva junto con el metodo 'toFixed()', que redondea a dos decimales
}

function calculateNumberOfReps(houseMembers) {
  /* const numberOfDemocrats = filterByParty(houseMembers, "D"); Este codigo está comentado porque en realidad no hace falta añadirle la función a una constante
  const numberOfRepublicans = filterByParty(houseMembers, "R"); basicamente con ponerla directamente en el 'value' nos ahorramos el declararlo dentro de la misma
  const numberOfIndependents = filterByParty(houseMembers, "ID"); AHORRANDO CODIGO */
  const statistics = [
    // creamos una constante que será la array de objeto con la que haremos la tabla
    {
      // le añadimos las distintas propiedades y valores
      party: "Democrat",
      number_of_members: filterByParty(houseMembers, "D"),
      votes_average: calculateVotesAverageByParty(houseMembers, "D"),
    },
    {
      party: "Republican",
      number_of_members: filterByParty(houseMembers, "R"),
      votes_average: calculateVotesAverageByParty(houseMembers, "R"),
    },
    {
      party: "Independent",
      number_of_members: filterByParty(houseMembers, "ID"),
      votes_average: calculateVotesAverageByParty(houseMembers, "ID"),
    },
  ];
  return statistics; // hacemos que la función nos devuelva la constante
}

function createStatisticsTable(membersData) {
  // creamos una función donde crearemos la tabla con las estadisticas que hemos ido buscando
  const tableBody = document.getElementById("tbody");
  for (let i = 0; i < membersData.length; i++) {
    const party = membersData[i].party;
    const numberOfMembers = membersData[i].number_of_members;
    const votesAverage = membersData[i].votes_average;

    const tableRow = document.createElement("tr");

    const partyCell = document.createElement("td");
    const numberOfMembersCell = document.createElement("td");
    const votesAverageCell = document.createElement("td");

    partyCell.appendChild(document.createTextNode(party));
    numberOfMembersCell.appendChild(document.createTextNode(numberOfMembers));
    votesAverageCell.appendChild(document.createTextNode(votesAverage));

    tableRow.appendChild(partyCell);
    tableRow.appendChild(numberOfMembersCell);
    tableRow.appendChild(votesAverageCell);
    tableBody.appendChild(tableRow);
  }
}

createStatisticsTable(statistics); // llamamos a la función

function createLeastEngangedTable(houseMembers) {
  // creamos una función para crear una tabla donde mostraremos los menos comprometidos
  document.getElementById("tbody-bottom").innerHTML = ""; //traemos el elemento con id 'tbody-bottom' y le añadimos un texto vacio
  for (let i = 0; i < houseMembers.length; i++) {
    // hacemos un for para que se recorra la array
    const tableRow = document.createElement("tr"); // creamos un 'tr'
    const link = document.createElement("a"); // hacemos lo mismo con la etiqueta 'a' donde irá nuestro link con el nombre
    link.textContent =
      houseMembers[i].first_name + " " + houseMembers[i].last_name; // metemos las propiedades con el nombre dentro de nuestro link
    link.setAttribute("href", houseMembers[i].url); // le damos los atributos nuevos a nuestro link
    tableRow.insertCell().append(link); // vamos creando celdas para cada tableRow que hayamos creado
    tableRow.insertCell().innerHTML = houseMembers[i].missed_votes;
    tableRow.insertCell().innerHTML = houseMembers[i].missed_votes_pct;
    document.getElementById("tbody-bottom").append(tableRow); // finalmente con 'append' agregamos nuestras tableRow a nuestro elemento tbody
  }
}

createLeastEngangedTable(leastEnganged);

function createMostEngangedTable(houseMembers) {
  // creamos una función para crear una tabla donde mostraremos los menos comprometidos
  document.getElementById("tbody-top").innerHTML = ""; //traemos el elemento con id 'tbody-bottom' y le añadimos un texto vacio
  for (let i = 0; i < houseMembers.length; i++) {
    // hacemos un for para que se recorra la array
    const tableRow = document.createElement("tr"); // creamos un 'tr'
    const link = document.createElement("a"); // hacemos lo mismo con la etiqueta 'a' donde irá nuestro link con el nombre
    link.textContent =
      houseMembers[i].first_name + " " + houseMembers[i].last_name; // metemos las propiedades con el nombre dentro de nuestro link
    link.setAttribute("href", houseMembers[i].url); // le damos los atributos nuevos a nuestro link
    tableRow.insertCell().append(link); // vamos creando celdas para cada tableRow que hayamos creado
    tableRow.insertCell().innerHTML = houseMembers[i].missed_votes;
    tableRow.insertCell().innerHTML = houseMembers[i].missed_votes_pct;
    document.getElementById("tbody-top").append(tableRow); // finalmente con 'append' agregamos nuestras tableRow a nuestro elemento tbody
  }
}
createMostEngangedTable(mostEnganged);
