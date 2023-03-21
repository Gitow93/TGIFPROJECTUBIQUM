if (tableBody.innerHTML === "") {

  const result = document.createElement("p");
  result.setAttribute("class", "color");
  result.innerHTML = "Sorry. No results found";
  result.style.color = "red";

  tableBody.appendChild(result); }
