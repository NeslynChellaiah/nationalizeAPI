let body = document.querySelector("body");
body.classList.add(
  "d-flex",
  "flex-column",
  "align-items-center",
  "pt-5",
  "min-vh-100"
);

let header = document.createElement("h1");
header.classList.add("text-primary");
header.innerText = "Nationalize API";
body.append(header);

let searchDiv = document.createElement("div");
searchDiv.classList.add(
  "col-12",
  "px-4",
  "col-md-6",
  "px-md-0",
  "d-flex",
  "justify-content-center"
);
body.append(searchDiv);

let searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.classList.add(
  "form-control",
  "border-primary",
  "border-1",
  "name-input"
);
searchDiv.append(searchInput);

let searchBtn = document.createElement("button");
searchBtn.setAttribute("type", "button");
searchBtn.classList.add("btn", "btn-primary");
searchBtn.setAttribute("onclick", "search()");
searchBtn.innerText = "Search";
searchDiv.append(searchBtn);

let responseDiv = document.createElement("div");
responseDiv.classList.add(
  "col-12",
  "px-4",
  "col-md-6",
  "px-md-0",
  "mt-3",
  "text-success",
  "response"
);
body.append(responseDiv);

let loaderContainer = document.createElement("div");
loaderContainer.classList.add("container", "ring-container");
let loaderRing = document.createElement("div");
loaderRing.classList.add("ring");
loaderContainer.append(loaderRing);

const search = async () => {
  let name = document.querySelector(".name-input").value;

  let responseDiv = document.querySelector(".response");
  responseDiv.innerHTML = "";

  if (!name) {
    return;
  }

  var response;
  try {
    responseDiv.classList.add(
      "justify-content-center",
      "align-items-center",
      "d-flex"
    );
    responseDiv.append(loaderContainer);
    response = await fetch(`https://api.nationalize.io/?name=${name}`);
    response = await response.json();
  } catch {
    alert("Something went wrong");
  }
  responseDiv.classList.remove(
    "justify-content-center",
    "align-items-center",
    "d-flex"
  );
  responseDiv.innerHTML = "";

  if (response.country) {
    let nameH4 = document.createElement("h4");
    nameH4.innerText = "Name: ";

    let nameHighlighted = document.createElement("span");
    nameHighlighted.classList.add("bg-warning", "px-4");
    nameHighlighted.innerText = name;

    nameH4.append(nameHighlighted);
    responseDiv.append(nameH4);

    let resultDiv = document.createElement("ul");
    response.country.forEach((country, index) => {
      if (index > 1) {
        return;
      }

      let result = document.createElement("li");
      result.classList.add("text-success");
      result.innerText = `Country: ${country.country_id}, Probability: ${country.probability}`;
      resultDiv.append(result);
      responseDiv.append(resultDiv);
    });
  }
};
