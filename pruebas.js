/* if (tableBody.innerHTML === "") {

  const result = document.createElement("p");
  result.setAttribute("class", "color");
  result.innerHTML = "Sorry. No results found";
  result.style.color = "red";

  tableBody.appendChild(result); } */

async function getUsers() {
  let url = "users.json";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
