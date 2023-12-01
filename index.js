var cur;
const search = document.getElementById("search");
const sf = document.getElementById("sf");
const load = document.querySelector(".load");
load.style.display = "none";
const getCountryData = async () => {
  try {
    load.style.display = "block";
    const data = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,flags,region,subregion,borders"
    );
    const dataJs = await data.json();
    load.style.display = "none";
    const container = document.getElementById("divContainer");

    dataJs.forEach((item, index) => {
      const newDiv = document.createElement("section");
      const button = document.createElement("button");
      newDiv.classList.add("rest-div");
      newDiv.classList.add("col");
      newDiv.classList.add("bg-light");

      var capital = dataJs[index].capital[0];
      var cName = dataJs[index].name.common;
      var oName = dataJs[index].name.official;
      var nName = dataJs[index].name.nativeName ?? "none";
      var nNam = nName.eng ?? "none";
      var nNa = nNam.common ?? "none";
      var nN = nNam.official ?? "none";
      var currencies = Object.values(dataJs[index].currencies);
      cur = currencies[0] ?? "none";
      cur.name ??= "none";
      cur.symbol ??= "none";
      var curName = cur.name;
      var curSym = cur.symbol;
      var population = dataJs[index].population;
      var flag = dataJs[index].flags.png;
      var borders = dataJs[index].borders ?? "none";
      var region = dataJs[index].region;
      var subregion = dataJs[index].subregion;
      newDiv.id = `${cName}`;
      button.classList.add("btn");
      button.classList.add("btn-primary");
      button.textContent = "See more";

      newDiv.innerHTML = `<div class="card m-2" >
      <img src=${flag} class="card-img-top" alt="flag of ${cName}">
      <div class="card-body ">
        <h5 class="card-title"><b>${cName}</b></h5>
        <p> <b>Capital:</b> ${capital}<br><b>Currencies:</b> ${curName}  <br><b>Population:</b> ${population}</p>
       
      </div>
    </div> `;

      newDiv.appendChild(button);
      container.appendChild(newDiv);

      const bttn = () => {
        console.log("i got clicked");

        container.innerHTML = `
        <ul class="nav">
        <li class="nav-item">
          <button class="btn btn-primary back mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            Go back
          </button>
        </li>
      </ul>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md">
            <div class="card" style="width: 18rem">
              <img src="${flag}" class="card-img-top" alt="flag of ${cName}" />
              <div class="card-body">
                <p class="card-text">
                 Flag of ${cName}
                </p>
              </div>
            </div>
            <div class="col-12 col-md bg-light">
              <div class="card">
                <div class="card-header">
                  <h1>${cName}</h1>
                </div>
                <div class="card-body">
                  <blockquote class="blockquote mb-0">
                    <p>
                      Names include:<br />Official:${oName}, Native : common:
                      ${nNa}, official:${nN}<br />Currency:${curName}, Symbol:
                      ${curSym}<br />
                      Population:${population}<br />Borders: ${borders}<br />
                      Region: ${region}<br />
                      Sub-region: ${subregion}.
                    </p>
                    <footer class="blockquote-footer m-3">
                      Made with 💖 in Lagos
                      <cite title="Source Title">CHO</cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
        function back() {
          getCountryData();
        }
        const go = document.querySelector(".back");
        go.onclick = back;
      };
      button.onclick = bttn;
    });

    const dataDiv = Array.from(container.querySelectorAll("section"));

    dataDiv.sort((a, b) => {
      const tA = a.querySelector("h5").textContent.toUpperCase();
      const tB = b.querySelector("h5").textContent.toUpperCase();
      return tA.localeCompare(tB, undefined, { sensitivity: "base" });
    });
    container.innerHTML = "";

    dataDiv.forEach((item) => {
      container.appendChild(item);
    });
    document.addEventListener("DOMContentLoaded", () => {
      console.log("i got loaded");
    });
    const handle = async (event) => {
      event.preventDefault();
      const st = search.value.toLowerCase();
      load.style.display = "block";

      for (const section of container.children) {
        const input = section.querySelector("h5").textContent.toLowerCase();
        if (input.includes(st)) {
          section.scrollIntoView({ behavior: "smooth" });
          break;
        } else {
          var msg = document.querySelector(".al");
          msg.style.display = "block";
          setTimeout(() => {
            msg.style.display = "none";
          }, 4000);
        }
      }

      load.style.display = "none";
    };
    sf.addEventListener("submit", handle);
    // search.addEventListener("input", handle);
    console.log(dataJs[69]);
  } catch (error) {
    console.error("err", error);
  }
};
getCountryData();
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded sucessfully");
});
