import { houseData } from "/json/house-data.mjs";
const members = houseData.results[0].members;

function calculateNumberOfReps(houseMembers) {
  /* const numberOfDemocrats = filterByParty(members, "D"); Este codigo está comentado porque en realidad no hace falta añadirle la función a una constante
  const numberOfRepublicans = filterByParty(members, "R"); basicamente con ponerla directamente en el 'value' nos ahorramos el declararlo dentro de la misma
  const numberOfIndependents = filterByParty(members, "ID"); AHORRANDO CODIGO */
  const numberOfReps = {
    democrats: filterByParty(members, "D"),
    republicans: filterByParty(members, "R"),
    independents: filterByParty(members, "ID"),
  };
  return numberOfReps;
}
function filterByParty(houseMembers, partyCode) {
  return houseMembers.filter((member) => member.party === partyCode).length;
}

console.log(calculateNumberOfReps(members));
