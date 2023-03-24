import { senateData } from "/json/senate-data.mjs";

const senateDataMembers = senateData.results[0].members;
const statistics = calculateNumberOfReps(senateDataMembers);
const leastEnganged = senateDataMembers
  .sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
  .slice(0, 10);

const mostEnganged = senateDataMembers
  .sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
  .slice(0, 10);

function filterByParty(senateMembers, partyCode) {
  return senateMembers.filter((member) => member.party === partyCode).length;
}

function calculateVotesAverageByParty(senateMembers, partyCode) {
  const senateDataMembers = senateMembers.filter(
    (member) => member.party === partyCode
  );
  if (senateDataMembers.length === 0) {
    return "The average cannot be calculated.";
  }
  const totalVotes = senateDataMembers.reduce((acc, member) => {
    if (member.votes_with_party_pct !== undefined) {
      return acc + member.votes_with_party_pct;
    } else {
      return acc;
    }
  }, 0);
  const average = totalVotes / senateDataMembers.length;
  return average.toFixed(2);
}

function calculateNumberOfReps(senateMembers) {
  const statistics = [
    {
      party: "Democrat",
      number_of_members: filterByParty(senateMembers, "D"),
      votes_average: calculateVotesAverageByParty(senateMembers, "D"),
    },
    {
      party: "Republican",
      number_of_members: filterByParty(senateMembers, "R"),
      votes_average: calculateVotesAverageByParty(senateMembers, "R"),
    },
    {
      party: "Independent",
      number_of_members: filterByParty(senateMembers, "ID"),
      votes_average: calculateVotesAverageByParty(senateMembers, "ID"),
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

function createLeastEngangedTable(senateMembers) {
  document.getElementById("tbody-bottom").innerHTML = "";
  for (let i = 0; i < senateMembers.length; i++) {
    const tableRow = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent =
      senateMembers[i].first_name + " " + senateMembers[i].last_name;
    link.setAttribute("href", senateMembers[i].url);
    tableRow.insertCell().append(link);
    tableRow.insertCell().innerHTML = senateMembers[i].missed_votes;
    tableRow.insertCell().innerHTML = senateMembers[i].missed_votes_pct;
    document.getElementById("tbody-bottom").append(tableRow);
  }
}

createLeastEngangedTable(leastEnganged);

function createMostEngangedTable(senateMembers) {
  document.getElementById("tbody-top").innerHTML = "";
  for (let i = 0; i < senateMembers.length; i++) {
    const tableRow = document.createElement("tr");
    const link = document.createElement("a");
    link.textContent =
      senateMembers[i].first_name + " " + senateMembers[i].last_name;
    link.setAttribute("href", senateMembers[i].url);
    tableRow.insertCell().append(link);
    tableRow.insertCell().innerHTML = senateMembers[i].missed_votes;
    tableRow.insertCell().innerHTML = senateMembers[i].missed_votes_pct;
    document.getElementById("tbody-top").append(tableRow);
  }
}
createMostEngangedTable(mostEnganged);
