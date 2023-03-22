import { houseData } from "/json/house-data.mjs";
import { states } from "/json/states-data.mjs";

const members = houseData.results[0].members;
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const dropdownMenu = document.querySelector(".states-options");
let check = [];

function createTable(array) {
  const tableBody = document.querySelector(".table_body");
  tableBody.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const name = array[i].first_name + " " + array[i].last_name;
    const url = array[i].url;
    const party = array[i].party;
    const state = array[i].state;
    const yearsInOffice = array[i].seniority;
    const votesPercentage = array[i].votes_with_party_pct;

    const tableRow = document.createElement("tr");
    const link = document.createElement("a");

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

function createDropdown(array) {
  const states = Object.keys(array);
  states.forEach((key, index) => {
    const stateOptions = document.createElement("option");
    stateOptions.value = `${key}`;
    stateOptions.text = `${key}`;
    dropdownMenu.appendChild(stateOptions);
  });
}

createDropdown(states);

function filterOptions(event) {
  check = Array.from(checkboxes)
    .filter((element) => element.checked)
    .map((element) => element.value);
  const state = dropdownMenu.value;
  let membersFiltered = [];
  if (check.length === 0 && state === "All states") {
    membersFiltered = event;
  } else {
    event.forEach((element) => {
      if (check.length !== 0 && state === "All states") {
        if (check.includes(element.party)) {
          membersFiltered.push(element);
        }
      } else if (check.length === 0 && state !== "All states") {
        if (element.state === state) {
          membersFiltered.push(element);
        }
      } else {
        if (check.includes(element.party) && element.state === state) {
          membersFiltered.push(element);
        }
      }
    });
  }
  return createTable(membersFiltered);
}

filterOptions(members);

dropdownMenu.addEventListener("change", () => {
  return filterOptions(members);
});
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", () => {
    return filterOptions(members);
  });
});
