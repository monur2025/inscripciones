const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyluVorZvojK1pgmYoIcjs1_yGo1e6kghtIqJaeS09UcqiISzkAH9YOnp2B-ZmrcJ_f/exec'; // *** IMPORTANT: Replace with your actual URL ***

const form = document.getElementById("inscription");
const comitesDiv = document.getElementById("comitesDiv");

document.addEventListener("DOMContentLoaded", function () {
    form.reset()
});


const comites = {
    fao: {
        id: "FAO",
        prefix: "fao",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    cs: {
        id: "Consejo de Seguridad",
        prefix: "cs",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    corte: {
        id: "Tribunal",
        prefix: "corte",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    prensa: {
        id: "Prensa",
        prefix: "prensa",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    adhoc: {
        id: "AD-HOC",
        prefix: "adhoc",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    ams: {
        id: "AMS",
        prefix: "ams",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    unesco: {
        id: "UNESCO",
        prefix: "unesco",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    otan: {
        id: "OTAN",
        prefix: "otan",
        cargos: [],
        availability: [],
        delegateCount: 0,
        delegateInputList: [],
        cargoInputList: []
    },
    observadores: {
        id: "observador",
        prefix: "observadores",
        delegateCount: 0,
        delegateInputList: []
    }
}


async function getSheet2Stuff() {

    try {
        const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL);
        const data = await response.json()

        const cellData = data.cellData;




        if (cellData && cellData.length > 0) {
            // Iteramos a través de cada fila (cada sub-array)
            cellData.forEach((row) => { // Accedemos a los valores de cada celda por su índice
                const cellA = row[0];   // La primera celda de la fila (columna A)
                const cellB = row[1];   // La segunda celda de la fila (columna B)
                const cellC = row[2];   // La segunda celda de la fila (columna B)
                const cellD = row[3];
                const cellE = row[4];
                const cellF = row[5];
                const cellG = row[6];
                const cellH = row[7];
                const cellI = row[8];
                const cellJ = row[9];
                const cellK = row[10];
                const cellL = row[11];
                const cellM = row[12];
                const cellN = row[13];
                const cellO = row[14];
                const cellP = row[15];

                comites.fao.cargos.push(cellA);
                comites.fao.availability.push(cellB);
                comites.unesco.cargos.push(cellC);
                comites.unesco.availability.push(cellD);
                comites.adhoc.cargos.push(cellE);
                comites.adhoc.availability.push(cellF);
                comites.ams.cargos.push(cellG);
                comites.ams.availability.push(cellH);
                comites.prensa.cargos.push(cellI);
                comites.prensa.availability.push(cellJ);
                comites.corte.cargos.push(cellK);
                comites.corte.availability.push(cellL);
                comites.cs.cargos.push(cellM);
                comites.cs.availability.push(cellN);
                comites.otan.cargos.push(cellO);
                comites.otan.availability.push(cellP);

            });
        } else {
            dataContainer.textContent = 'No se encontraron datos.';
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }

    for (const x in comites) {
        if (x == 'observadores') {
            continue;
        }
        else {
            const filteredCargos = comites[x].cargos.filter(str => str !== "");
            const filteredAvailability = comites[x].availability.filter(str => str !== "");

            comites[x].cargos = filteredCargos;
            comites[x].availability = filteredAvailability;
        }
    }
    const comitesLabel = document.getElementById("comitesLabel");
    const loadingGif = document.getElementById("loadingGif");
    loadingGif.classList.add("hidden");

    comitesLabel.textContent = "Comités";
    comitesDiv.innerHTML = `
<div id="faoDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="faoDropdownText" class="dropdownText">FAO</p>
        <button id="faoDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="faoGroup" class="hidden">
        <div>
            <h2>Básico Agencia</h2>
        </div>
        <div class="miniForm" id="miniFormfao">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="faoDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="faoMore" class="delegateButton">+</button>
                    <button type="button" id="faoLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="faoQuantity" name="Cantidad para FAO"></textarea>
        <textarea class="hidden" readonly id="groupedfaoData" name="Delegados para FAO"></textarea>
        <textarea class="hidden" readonly id="groupedfaoCargos" name="Cargos para FAO"></textarea>
        <!-- Something is added here! -->
        <div id="faoCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="faoBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="csDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="csDropdownText" class="dropdownText">CONSEJO DE SEGURIDAD</p>
        <button id="csDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="csGroup" class="hidden">
        <div>
            <h2>Diversificado Individual</h2>
        </div>
        <div class="miniForm" id="miniFormcs">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="csDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="csMore" class="delegateButton">+</button>
                    <button type="button" id="csLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="csQuantity" name="Cantidad para CS"></textarea>
        <textarea class="hidden" readonly id="groupedcsData" name="Delegados para CS"></textarea>
        <textarea class="hidden" readonly id="groupedcsCargos" name="Cargos para CS"></textarea>
        <!-- Something is added here! -->
        <div id="csCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="csBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="corteDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="corteDropdownText" class="dropdownText">TRIBUNAL</p>
        <button id="corteDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="corteGroup" class="hidden">
        <div>
            <h2>Diversificado Individual</h2>
        </div>
        <div class="miniForm" id="miniFormcorte">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="corteDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="corteMore" class="delegateButton">+</button>
                    <button type="button" id="corteLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="corteQuantity" name="Cantidad para Corte"></textarea>
        <textarea class="hidden" readonly id="groupedcorteData" name="Delegados para Corte"></textarea>
        <textarea class="hidden" readonly id="groupedcorteCargos" name="Cargos para Corte"></textarea>
        <!-- Something is added here! -->
        <div id="corteCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="corteBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="prensaDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="prensaDropdownText" class="dropdownText">PRENSA</p>
        <button id="prensaDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="prensaGroup" class="hidden">
        <div>
            <h2>Mixto Individual</h2>
        </div>
        <div class="miniForm" id="miniFormprensa">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="prensaDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="prensaMore" class="delegateButton">+</button>
                    <button type="button" id="prensaLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="prensaQuantity" name="Cantidad para Prensa"></textarea>
        <textarea class="hidden" readonly id="groupedprensaData" name="Delegados para Prensa"></textarea>
        <textarea class="hidden" readonly id="groupedprensaCargos" name="Cargos para Prensa"></textarea>
        <!-- Something is added here! -->
        <div id="prensaCargos">
            <h2></h2>
            <div class="flexBox">
                <div id="prensaBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="adhocDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="adhocDropdownText" class="dropdownText">AD-HOC</p>
        <button id="adhocDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="adhocGroup" class="hidden">
        <div>
            <h2>Mixto Agencia</h2>
        </div>
        <div class="miniForm" id="miniFormadhoc">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="adhocDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="adhocMore" class="delegateButton">+</button>
                    <button type="button" id="adhocLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="adhocQuantity" name="Cantidad para AD-HOC"></textarea>
        <textarea class="hidden" readonly id="groupedadhocData" name="Delegados para AD-HOC"></textarea>
        <textarea class="hidden" readonly id="groupedadhocCargos" name="Cargos para AD-HOC"></textarea>
        <!-- Something is added here! -->
        <div id="adhocCargos">
            <h2></h2>
            <div class="flexBox">
                <div id="adhocBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="amsDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="amsDropdownText" class="dropdownText">AMS</p>
        <button id="amsDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="amsGroup" class="hidden">
        <div>
            <h2>Mixto Agencia</h2>
        </div>
        <div class="miniForm" id="miniFormams">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="amsDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="amsMore" class="delegateButton">+</button>
                    <button type="button" id="amsLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="amsQuantity" name="Cantidad para AMS"></textarea>
        <textarea class="hidden" readonly id="groupedamsData" name="Delegados para AMS"></textarea>
        <textarea class="hidden" readonly id="groupedamsCargos" name="Cargos para AMS"></textarea>
        <!-- Something is added here! -->
        <div id="amsCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="amsBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="unescoDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="unescoDropdownText" class="dropdownText">UNESCO</p>
        <button id="unescoDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="unescoGroup" class="hidden">
        <div>
            <h2>Básico Individual</h2>
        </div>
        <div class="miniForm" id="miniFormunesco">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="unescoDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="unescoMore" class="delegateButton">+</button>
                    <button type="button" id="unescoLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="unescoQuantity" name="Cantidad para UNESCO"></textarea>
        <textarea class="hidden" readonly id="groupedunescoData" name="Delegados para UNESCO"></textarea>
        <textarea class="hidden" readonly id="groupedunescoCargos" name="Cargos para UNESCO"></textarea>
        <!-- Something is added here! -->
        <div id="unescoCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="unescoBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="otanDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="otanDropdownText" class="dropdownText">OTAN</p>
        <button id="otanDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="otanGroup" class="hidden">
        <div>
            <h2>Universitario/Egresados Individual</h2>
        </div>
        <div class="miniForm" id="miniFormotan">
            <div>
                <label>Cantidad de Delegados</label>
                <br>
                <h2 id="otanDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="otanMore" class="delegateButton">+</button>
                    <button type="button" id="otanLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="otanQuantity" name="Cantidad para OTAN"></textarea>
        <textarea class="hidden" readonly id="groupedotanData" name="Delegados para OTAN"></textarea>
        <textarea class="hidden" readonly id="groupedotanCargos" name="Cargos para OTAN"></textarea>
        <!-- Something is added here! -->
        <div id="otanCargos">
            <h2>Cargos</h2>
            <div class="flexBox">
                <div id="otanBox" class="cargosBox">
                </div>
            </div>
        </div>
    </div>
</div>
<br>
<div id="observadoresDiv">
    <div class="dropdownFormTitle">
        <div class="placeholder"></div>
        <p id="observadoresDropdownText" class="dropdownText">OBSERVADORES</p>
        <button id="observadoresDropdownButton" type="button" class="dropdownButton"></button>
    </div>
    <div id="observadoresGroup" class="hidden">
        <div>
        </div>
        <div class="miniForm" id="miniFormobservadores">
            <div>
                <label>Cantidad de Observadores</label>
                <br>
                <h2 id="observadoresDelegateNumberOutput">0</h2>
                <div style="display: flex; justify-content:space-evenly;">
                    <button type="button" id="observadoresMore" class="delegateButton">+</button>
                    <button type="button" id="observadoresLess" class="delegateButton">-</button>
                </div>
            </div>
        </div>
        <br>
        <textarea class="hidden" readonly id="observadoresQuantity" name="Cantidad de Observadores"></textarea>
        <textarea class="hidden" readonly id="groupedobservadoresData" name="Nombres de Observadores"></textarea>
        <!-- Something is added here! -->
        <div id="observadoresCargos">
        </div>
    </div>
</div>
`

    for (const x in comites) {
        let allComites = comites[x];
        let prefix = allComites.prefix;
        allComites.elements = [];
        allComites.elements.cargos = document.getElementById(`${prefix}Cargos`);
        allComites.elements.button = document.getElementById(`${prefix}DropdownButton`);
        allComites.elements.group = document.getElementById(`${prefix}Group`);
        allComites.elements.output = document.getElementById(`${prefix}DelegateNumberOutput`);
        allComites.elements.miniForm = document.getElementById(`miniForm${prefix}`);
        allComites.elements.groupedNames = document.getElementById(`grouped${prefix}Data`);
        allComites.elements.groupedCargos = document.getElementById(`grouped${prefix}Cargos`);
        allComites.elements.moreButton = document.getElementById(`${prefix}More`);
        allComites.elements.lessButton = document.getElementById(`${prefix}Less`);
        allComites.elements.box = document.getElementById(`${prefix}Box`);
        allComites.elements.quantity = document.getElementById(`${prefix}Quantity`);
        allComites.elements.dropdownText = document.getElementById(`${prefix}DropdownText`);
    }

    for (const x in comites) {
        let allComites = comites[x];
        if (x == "observadores") {
            continue;
        }
        else {
            let comiteCupos = allComites.availability.filter(str => str !== "Ocupado");
            if (comiteCupos.length == 0) {
                let text = allComites.elements.dropdownText.textContent;
                allComites.elements.dropdownText.innerHTML = `<span>${text} </span><p style="color: red">LLENO</p>`;
            }
        }
    }

    // More Button Function
    for (const x in comites) {
        comites[x].elements.moreButton.addEventListener("click", function () {
            priceUpdater();
            let comite = comites[x];
            let elemento = comite.elements;
            if ((comite.delegateCount == 2) && (comite.id == "FAO" || comite.id == "AD-HOC" || comite.id == "AMS")) {
                return 0;
            }
            if ((comite.delegateCount == 1) && (formType.value == "Independiente")) {
                return 0;
            }
            else {
                comite.delegateCount++;
                elemento.output.innerText = comite.delegateCount;
                UniversialAddDelegate(elemento.group, elemento.cargos, comite.delegateCount, comite.delegateInputList, comite.id, comite, comite.cargoInputList);
                updateEvents();
            }
        });
    }

    // Less Button Function
    for (const x in comites) {
        comites[x].elements.lessButton.addEventListener("click", function () {
            let comite = comites[x];
            let elemento = comite.elements;
            if (comite.delegateCount > 0) {
                comite.delegateCount--;
                elemento.output.innerText = comite.delegateCount;
                UniversalRemoveDelegate(elemento.group, comite.delegateInputList);
                priceUpdater();
                updateEvents();
            }
        });
    }

    // Dropdown Button Function
    for (const x in comites) {
        let comite = comites[x];
        let elemento = comite.elements;
        elemento.button.addEventListener("click", function () {
            elemento.group.classList.toggle("hidden");
        });
    }

    function updateCargos() {
        for (const x in comites) {
            if (x == 'observadores' || x == 'adhoc' || x == 'prensa') {
                continue;
            }
            comites[x].elements.box.innerHTML = "";
            for (let y = 0; y < comites[x].cargos.length; y++) {

                const cargo = document.createElement('p');
                const availability = document.createElement('p');

                cargo.textContent = comites[x].cargos[y];
                availability.textContent = comites[x].availability[y];

                comites[x].elements.box.appendChild(cargo);
                comites[x].elements.box.appendChild(availability);

                if (availability.textContent === 'Libre') {
                    availability.style = "color: green;";
                }
                if (availability.textContent === 'Ocupado') {
                    availability.style = "color: red;";
                }
            }
        }
    }
    updateCargos();

    function UniversialAddDelegate(group, cargos, delegates, delegateInputElement, id, comite, cargoInputList) {
        const delegateDiv = document.createElement('div');
        const delegateLabel = document.createElement('label');
        const lineBreak = document.createElement("br");
        const delegateInput = document.createElement('input');
        const cargoLabel = document.createElement('label');
        const lineBreak2 = document.createElement("br");
        const lineBreak3 = document.createElement("br");
        const lineBreak4 = document.createElement("br");

        group.insertBefore(delegateDiv, cargos);
        delegateDiv.appendChild(delegateLabel);
        delegateDiv.appendChild(lineBreak);
        delegateDiv.appendChild(delegateInput);
        delegateDiv.appendChild(lineBreak2);
        delegateDiv.appendChild(cargoLabel);
        delegateDiv.appendChild(lineBreak3);
        let cargoInput = document.createElement('select');
        delegateDiv.appendChild(cargoInput);

        if (id == "Prensa") {
            cargoInput.remove();
            cargoInput = document.createElement('input');
            cargoInput.required = true;
            delegateDiv.appendChild(cargoInput);
        }
        if (id == "AD-HOC") {
            cargoInput.remove();
            cargoLabel.remove();
        }

        delegateDiv.appendChild(lineBreak4);

        if (id == "observador") {
            cargoInput.remove();
            cargoLabel.remove();
            delegateLabel.innerText = `Nombre de Observador ${delegates}`;
            delegateInput.type = "text";
            delegateInput.id = `delegateFor${id}${delegates}`;
            delegateInput.required = true;
            delegateDiv.id = `delegateDiv${delegates}`;
            delegateInputElement.push(delegateInput);
            return 0;
        }

        else {
            for (let x = 0; x < comite.cargos.length; x++) {
                if (comite.availability[x] == "Ocupado") {
                    continue;
                }

                else {
                    const option = document.createElement('option');
                    option.textContent = comite.cargos[x];
                    cargoInput.appendChild(option);
                }
            }
        }


        delegateLabel.innerText = `Nombre del Delegado ${delegates} para ${id}`;
        if (id == "FAO" || id == "OTAN" || id == "Consejo de Seguridad" || id == "UNESCO" || id == "AMS") {
            cargoLabel.innerText = `País para Delegado ${delegates}`;
        }
        if (id == "Tribunal") {
            cargoLabel.innerText = `Personaje para Delegado ${delegates}`;
        }
        if (id == "Prensa") {
            cargoLabel.innerText = `Medio de comunicación del Delegado ${delegates}`;
        }
        else {
            cargoLabel.innerText = `Cargo para Delegado ${delegates}`;
        }

        delegateInput.type = "text";
        delegateInput.id = `delegateFor${comite.prefix}${delegates}`;
        delegateInput.required = true;

        cargoInput.type = "text";
        cargoInput.id = `cargoFor${comite.prefix}${delegates}`;
        cargoInput.required = true;

        delegateDiv.id = `delegateDiv${delegates}`;
        delegateInputElement.push(delegateInput);
        cargoInputList.push(cargoInput);

    }

    function UniversalRemoveDelegate(group, delegateInputElement) {
        let lastDiv = group.lastElementChild;
        let penultimateDiv = lastDiv.previousElementSibling;
        delegateInputElement.pop();
        penultimateDiv.remove();
    }

}



document.addEventListener('DOMContentLoaded', getSheet2Stuff);





function facultyEventUpdate() {
    for (let x = 0; x < faculties.nameInputList.length; x++) {
        faculties.nameInputList[x].addEventListener("input", priceUpdater);
        faculties.numberInputList[x].addEventListener("input", priceUpdater);
    }
}



const dupeError = document.getElementById("dupeError");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    groupAllInputs();
    // Gather form data
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Apps Script as it doesn't send CORS headers
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data).toString(), // Send data as URL-encoded form data
        });

        // The 'no-cors' mode means you won't be able to read the response status directly (e.g., response.ok)
        // You'll generally assume success if the fetch operation completes without an error.
        // For debugging, you can check your Google Sheet.

        console.log("Form data sent to Google Sheet.");

        window.location.href = 'thankyou.html';

    } catch (error) {
        console.error("Error submitting form:", error);
        // Optionally, display an error message to the user
        alert("Hubo un error al enviar tu inscripción. Por favor, inténtalo de nuevo.");
    }
});

const cantidadCuposOutput = document.getElementById('cantidadCuposOutput');
const totalOutput = document.getElementById("totalOutput");
const priceSentToSheet = document.getElementById("priceSentToSheet");



// Price update
function priceUpdater() {
    var inputsNotInBlank = 0;
    cantidadCuposOutput.value = inputsNotInBlank + faculties.count;
    priceSentToSheet.value = ((inputsNotInBlank + faculties.count) * 5) + "€";
    totalOutput.innerText = `Total: ${priceSentToSheet.value}`
    for (const x in comites) {
        const comite = comites[x];
        for (let v = 0; v < comite.delegateInputList.length; v++) {
            if (comite.delegateInputList[v].value != "") {
                inputsNotInBlank++;
            }
        }
    }
    cantidadCuposOutput.value = inputsNotInBlank + faculties.count;
    priceSentToSheet.value = ((inputsNotInBlank + faculties.count) * 5) + "€";
    totalOutput.innerText = `Total: ${priceSentToSheet.value}`
}

// Give the event to the inputs
function updateEvents() {
    for (const x in comites) {
        const comite = comites[x];
        for (let v = 0; v < comite.delegateInputList.length; v++) {
            comite.delegateInputList[v].addEventListener("input", priceUpdater);
        }
    }
}



const faculties = {
    count: 1,
    nameInputList: [],
    numberInputList: [],
    elements: {
        moreButton: document.getElementById("facultyMore"),
        lessButton: document.getElementById("facultyLess"),
        groupedNames: document.getElementById("fname"),
        groupedNumbers: document.getElementById("fcontact"),
        output: document.getElementById("facultyNumberOutput"),
        miniForm: document.getElementById("facultyForm"),
        div: document.getElementById("facultyDiv"),
        firstName: document.getElementById("firstFacultyName"),
        firstNumber: document.getElementById("firstFacultyNumber")
    }
}


function groupAllInputs() {
    for (const x in comites) {
        let allComites = comites[x];

        allComites.elements.quantity.value = allComites.elements.output.textContent;

        let allNamesGroupedElement = allComites.elements.groupedNames;
        allNamesGroupedElement.value = "";
        for (let i = 0; i < allComites.delegateInputList.length; i++) {
            allNamesGroupedElement.value = allNamesGroupedElement.value + allComites.delegateInputList[i].value + "\n";
        }
        const text = allNamesGroupedElement.value;
        const lines = text.split('\n');
        const filteredArray = lines.filter(str => str !== "");
        const cleanedText = filteredArray.join('\n');
        allNamesGroupedElement.value = cleanedText;

        if (x == 'observadores') {
            continue;
        }
        else {
            let allCargosGroupedElement = allComites.elements.groupedCargos;
            allCargosGroupedElement.value = "";

            for (let i = 0; i < allComites.delegateInputList.length; i++) {
                allCargosGroupedElement.value = allCargosGroupedElement.value + allComites.cargoInputList[i].value + "\n";
            }
            const text2 = allCargosGroupedElement.value;
            const lines2 = text2.split('\n');
            const filteredArray2 = lines2.filter(str => str !== "");
            const cleanedText2 = filteredArray2.join('\n');
            allCargosGroupedElement.value = cleanedText2;
        }

    }
    let allNamesGroupedElement = faculties.elements.groupedNames;
    let allNumbersGroupedElement = faculties.elements.groupedNumbers;
    allNamesGroupedElement.value = "";
    allNumbersGroupedElement.value = "";
    for (let y = 0; y < faculties.nameInputList.length; y++) {
        allNamesGroupedElement.value = allNamesGroupedElement.value + "\n" + faculties.nameInputList[y].value;
        allNumbersGroupedElement.value = allNumbersGroupedElement.value + "\n" + faculties.numberInputList[y].value;
    }
    const text3 = allNamesGroupedElement.value;
    const lines3 = text3.split('\n');
    const filteredArray3 = lines3.filter(str => str !== "");
    const cleanedText3 = filteredArray3.join('\n');
    allNamesGroupedElement.value = cleanedText3;

    const text4 = allNumbersGroupedElement.value;
    const lines4 = text4.split('\n');
    const filteredArray4 = lines4.filter(str => str !== "");
    const cleanedText4 = filteredArray4.join('\n');
    allNumbersGroupedElement.value = cleanedText4;



}

faculties.nameInputList.push(faculties.elements.firstName);
faculties.numberInputList.push(faculties.elements.firstNumber);

facultyEventUpdate();

faculties.elements.moreButton.addEventListener("click", function () {
    let div = faculties.elements.div;
    faculties.count++;
    faculties.elements.output.innerText = `${faculties.count}`;

    const firstBreak = document.createElement("br");
    const newDiv = document.createElement("div");
    const newNameLabel = document.createElement("label");
    const newNameInput = document.createElement("input");
    const secondBreak = document.createElement("br");
    const newNumberLabel = document.createElement("label");
    const newNumberInput = document.createElement("input");

    newNameLabel.innerText = `Nombre de Faculty ${faculties.count}`
    newNumberLabel.innerText = `Contacto de Faculty ${faculties.count}`

    newNameInput.type = "text";
    newNumberInput.type = "text";

    newNameInput.required = true;
    newNumberInput.required = true;

    newNameInput.classList.add("largeTextInput");
    newNumberInput.classList.add("largeTextInput");

    div.appendChild(newDiv);
    newDiv.appendChild(firstBreak);
    newDiv.appendChild(newNameLabel);
    newDiv.appendChild(newNameInput);
    newDiv.appendChild(secondBreak);
    newDiv.appendChild(newNumberLabel);
    newDiv.appendChild(newNumberInput);

    faculties.nameInputList.push(newNameInput);
    faculties.numberInputList.push(newNumberInput);


    facultyEventUpdate();
});



faculties.elements.lessButton.addEventListener("click", function () {
    if (faculties.count > 1) {
        let div = faculties.elements.div;
        faculties.count--;
        faculties.elements.output.innerText = `${faculties.count}`;
        div.lastChild.remove();
        faculties.nameInputList.pop();
        faculties.numberInputList.pop();

    }
    facultyEventUpdate();
})

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const pwWindow = document.getElementById("pagoMovilWindow")

var paymentButtons = [option1, option2, option3];

for (let x = 0; x < paymentButtons.length; x++) {
    paymentButtons[x].addEventListener("change", function () {
        for (let y = 0; y < paymentButtons.length; y++) {
            if (paymentButtons[y].checked === false) {
                paymentButtons[y].classList.add("buttonOff");
                paymentButtons[y].classList.remove("buttonOn");
            }
            if (paymentButtons[y].checked === true) {
                paymentButtons[y].classList.remove("buttonOff");
                paymentButtons[y].classList.add("buttonOn");
            }
            if (option1.checked === true) {
                pwWindow.classList.remove("hidden");
            }
            if (option1.checked === false) {
                pwWindow.classList.add("hidden");
            }
        }
    });
}

const formType = document.getElementById("formType");
const dname = document.getElementById("dname");
const labelDname = document.getElementById("labelDname");
const formTypeHidden = document.getElementById("formTypeHidden");
const avisoDelegacion = document.getElementById("avisoDelegacion");

formType.addEventListener("input", function () {
    if (formType.value == "Independiente") {
        faculties.elements.miniForm.classList.add("hidden");
        avisoDelegacion.classList.add("hidden");
        dname.style = "display: none;";
        labelDname.style = "display: none;";
        faculties.elements.groupedNames.required = false;
        faculties.elements.groupedNames.required = false;
        faculties.count = 0;
        faculties.elements.firstName.required = false;
        faculties.elements.firstNumber.required = false;
        dname.required = false;
        formTypeHidden.value = "independiente";
        priceUpdater();
    }
    else {
        faculties.elements.miniForm.classList.remove("hidden");
        avisoDelegacion.classList.remove("hidden");
        faculties.elements.groupedNames.required = true;
        faculties.elements.groupedNumbers.required = true;
        faculties.elements.firstName.required = true;
        faculties.elements.firstNumber.required = true;
        dname.style = "display: block;";
        labelDname.style = "display: block;";
        dname.required = true;
        formTypeHidden.value = "delegación";
        priceUpdater();
    }
});