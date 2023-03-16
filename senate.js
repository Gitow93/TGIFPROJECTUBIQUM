import {senateData} from "./senate-data.mjs"

const members = senateData.results[0].members;

function createTable(array) {

const tableBody = document.querySelector(".table_body");
tableBody.innerHTML = '';

for (let i = 0; i < array.length; i++) {
    const name = array[i].first_name + " " + array[i].last_name;
    const url = array[i].url;
    const party = array[i].party;
    const state = array[i].state;
    const yearsInOffice = array[i].seniority;
    const votesPercentage = array[i].votes_with_party_pct;

    const tableRow = document.createElement("tr");
    const link = document.createElement("a")

    link.href = url;
    link.appendChild(document.createTextNode(name));

    const nameCell = document.createElement("td");
    const partyCell = document.createElement("td");
    const stateCell = document.createElement("td");
    const yearsInOfficeCell = document.createElement("td"); 
    const votesPercentageCell = document.createElement("td");

    nameCell.appendChild(link);
    partyCell.appendChild(document.createTextNode(party));
    stateCell.appendChild(document.createTextNode(state));
    yearsInOfficeCell.appendChild(document.createTextNode(yearsInOffice));
    votesPercentageCell.appendChild(document.createTextNode(votesPercentage)); 

    tableRow.appendChild(nameCell);
    tableRow.appendChild(partyCell);
    tableRow.appendChild(stateCell);
    tableRow.appendChild(yearsInOfficeCell);
    tableRow.appendChild(votesPercentageCell); 

    tableBody.appendChild(tableRow);
} 

}

createTable(members);
