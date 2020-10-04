let uploadedContent;
let currentPosition;
let dirts;
let directions;
let dirtsCollected = 0;
let wallHits = 0
let currentStep = 0;

document.getElementById('uploadFileBtn').onchange = (evt => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        uploadedContent = JSON.parse(event.target.result);
        initVariables(uploadedContent);
        drawTable();
    };

    reader.readAsText(file);
});

function initVariables(rawInput) {
    currentPosition = rawInput.initialRoombaLocation;
    dirts = rawInput.dirtLocations;
    directions = rawInput.drivingInstructions;
    roomSize = rawInput.roomDimensions
}

function drawTable() {
    insertTableRow();

    directions.forEach(direction => {
        switch (direction) {
            case 'N':
                if(currentPosition[1] + 1 < roomSize[1]) {
                    currentPosition[1] += 1;
                    collectDirt();
                } else {
                    hitWall();
                }

                insertTableRow();

                break;
            case 'S':
                if(currentPosition[1] - 1 > -1) {
                    currentPosition[1] -= 1;
                    collectDirt();
                } else {
                    hitWall();
                }

                insertTableRow();

                break;
            case 'W':
                if(currentPosition[0] - 1 > -1) {
                    currentPosition[0] -= 1;
                    collectDirt();
                } else {
                    hitWall();
                }

                insertTableRow();

                break;
            case 'E':
                if(currentPosition[0] + 1 < roomSize[0]) {
                    currentPosition[0] += 1;
                    collectDirt();
                } else {
                    hitWall();
                }

                insertTableRow();

                break;
            default:
                break;
        }
    });

    printResult();
}

function collectDirt() {
    if(dirts.some(dirt => dirt[0] === currentPosition[0] && dirt[1] === currentPosition[1])) {
        ++dirtsCollected;
    }
}

function hitWall() {
    ++wallHits;
}

function insertTableRow() {
    ++currentStep;
    const table = document.getElementById('resultTable');
    const row = table.insertRow(-1);
    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);
    const cell3 = row.insertCell(3);
    const cell4 = row.insertCell(4);
    cell0.innerHTML = currentStep;
    cell1.innerHTML = `${currentPosition[0]}, ${currentPosition[1]}`;
    cell2.innerHTML = directions[currentStep - 2] || '';
    cell3.innerHTML = dirtsCollected;
    cell4.innerHTML = wallHits;
}

function printResult() {
    const parentDiv = document.createElement('div');
    const childDiv0 = document.createElement('div');
    const childDiv1 = document.createElement('div');
    const childDiv2 = document.createElement('div');
    const childDiv3 = document.createElement('div');

    childDiv0.innerHTML = `Final Position: ${currentPosition[0]}, ${currentPosition[1]}`;
    childDiv1.innerHTML = `Total Dirt Collection: ${dirtsCollected}`
    childDiv2.innerHTML = `Total Distance Traveled: ${currentStep}`
    childDiv3.innerHTML = `Total Walls Hit: ${wallHits}`

    parentDiv.appendChild(childDiv0);
    parentDiv.appendChild(childDiv1);
    parentDiv.appendChild(childDiv2);
    parentDiv.appendChild(childDiv3);

    const body = document.getElementsByTagName('body');
    body[0].appendChild(parentDiv);
}
