var cur;
const search = document.getElementById("search");
const sf = document.getElementById("sf");
const load = document.querySelector(".load");
load.style.display = "none";
const getCountryData = async () => {
  try {
    load.style.display = "block";
    const data = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,flags,region,subregion,borders,demonyms,idd,languages,maps,latlng,coatOfArms,callingCodes"
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
      var currencies = Object.values(dataJs[index].currencies) || "none";
      cur = currencies[0]  || "none";
      cur.name ??= "none";
      cur.symbol ??= "none";
      var curName = cur.name || "none";
      var curSym = cur.symbol || "none";
      var population = dataJs[index].population;
      var flag = dataJs[index].flags.png;
      var borders = dataJs[index].borders ?? "none";
      var region = dataJs[index].region;
      var subregion = dataJs[index].subregion;
      var idd = dataJs[index].idd;
      var iddR = idd.root;
      var iddS = idd.suffixes;
      var callCode = iddR + iddS[0];
      if (callCode.length > 4) {
        callCode = iddR + "(" + iddS[0] + ")";
      }
      var dE = dataJs[index].demonyms.eng;
      var deF = dE.f;
      var deM = dE.m;
      var lat = dataJs[index].latlng[0];
      var lng = dataJs[index].latlng[1];
      var maps = dataJs[index].maps.googleMaps;
      var languages = Object.values(dataJs[index].languages) ?? "none";
      var coat = dataJs[index].coatOfArms.png;
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
                      <br> Call Code: ${callCode}<br>Nationality: <br>Female:${deF}, Male:${deM}
                      <br>Latitide: ${lat}<br>Longtitude: ${lng} <br> <a href="${maps}" target="_blank" >View live map</a><br>Languages: ${languages}<br>Coat of Arms:<br>
                      <img src="${coat}" class="card-img-top" stlye="width:7px" alt="coat of Arms of ${cName}" />
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
      newDiv.onclick = bttn;
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

    const handle = (event) => {
      event.preventDefault();
      const st = search.value.toLowerCase();
      load.style.display = "block";
      const dataDivf = dataDiv.filter((el) => {
        return el.id.toLowerCase().includes(st);
      });
      container.innerHTML = "";
      dataDivf.forEach((item) => {
        container.appendChild(item);
      });
      if (dataDivf == 0) {
        var msg = document.querySelector(".al");
        msg.style.display = "block";
        setTimeout(() => {
          msg.style.display = "none";
        }, 2000);
      }

      load.style.display = "none";
    };

    sf.addEventListener("submit", handle);
    search.addEventListener("input", handle);
  } catch (error) {
    console.error("err", error);
  }
};
getCountryData();
