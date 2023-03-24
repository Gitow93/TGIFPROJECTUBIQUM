import { houseData } from "/json/house-data.mjs";

const houseDataMembers = houseData.results[0].members;
const statistics = calculateNumberOfReps(houseDataMembers);
const leastLoyalty = houseDataMembers
  .sort((a, b) => b.votes_against_party_pct - a.votes_against_party_pct)
  .slice(0, 46);

const mostLoyalty = houseDataMembers
  .sort((a, b) => a.votes_against_party_pct - b.votes_against_party_pct)
  .slice(0, 46);

function filterByParty(houseMembers, partyCode) {
  return houseMembers.filter((member) => member.party === partyCode).length;
}

function calculateVotesAverageByParty(houseMembers, partyCode) {
  const houseDataMembers = houseMembers.filter(
    (member) => member.party === partyCode
  );
  if (houseDataMembers.length === 0) {
    return "The average cannot be calculated.";
  }
  const totalVotes = houseDataMembers.reduce((acc, member) => {
    if (member.votes_with_party_pct !== undefined) {
      return acc + member.votes_with_party_pct;
    } else {
      return acc;
    }
  }, 0);
  const average = totalVotes / houseDataMembers.length;
  return average.toFixed(2);
}

function calculateNumberOfReps(houseMembers) {
  const statistics = [
    {
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
  return statistics;
}

function createStatisticsTable(membersData) {
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

createStatisticsTable(statistics);

function createLeastLoyaltyTable(houseMembers) {
  document.getElementById("tbody-bottom").innerHTML = "";
  for (let i = 0; i < houseMembers.length; i++) {
    const tableRow = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent =
      houseMembers[i].first_name + " " + houseMembers[i].last_name;
    link.setAttribute("href", houseMembers[i].url);
    tableRow.insertCell().append(link);
    tableRow.insertCell().innerHTML = houseMembers[i].total_votes;
    tableRow.insertCell().innerHTML = houseMembers[i].votes_against_party_pct;
    document.getElementById("tbody-bottom").append(tableRow);
  }
}

createLeastLoyaltyTable(leastLoyalty);

function createMostLoyaltyTable(houseMembers) {
  document.getElementById("tbody-top").innerHTML = "";
  for (let i = 0; i < houseMembers.length; i++) {
    const tableRow = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent =
      houseMembers[i].first_name + " " + houseMembers[i].last_name;
    link.setAttribute("href", houseMembers[i].url);
    tableRow.insertCell().append(link);
    tableRow.insertCell().innerHTML = houseMembers[i].total_votes;
    tableRow.insertCell().innerHTML = houseMembers[i].votes_against_party_pct;
    document.getElementById("tbody-top").append(tableRow);
  }
}
createMostLoyaltyTable(mostLoyalty);
