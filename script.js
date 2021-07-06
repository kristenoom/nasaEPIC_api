const baseURL = 'https://api.nasa.gov/EPIC/api/natural/';
const baseURL2 = 'https://epic.gsfc.nasa.gov/api';
const key = 'zTjrFVIwtBVIENb3dJpESWDWbhRFFWa4m3AbPyO1';

const card = document.querySelector('.card');
const cardBody = document.querySelector('.card-body');
const moreInfoBtn = document.querySelector('.btn');
const modalTitle = document.querySelector('.modal-title');
const modalBody = document.querySelector('.modal-body');

let currentDate = new Date();
console.log(`Today's Date: ${currentDate}`);
let yesterday = currentDate.setDate(currentDate.getDate() - 1);
console.log(`Yesterday's Date: ${yesterday}`);

const year = currentDate.getFullYear();

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let month = currentDate.getMonth();

const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31'
];
let monthDay = yesterday;


let date = year + '/' + months[month] + '/' + days[monthDay];

// const date = `${year}/${mm}/${dd}`;
console.log(`Yesterday's Date: ${date}`);


fetch(baseURL + '?api_key=' + key)
    .then(response => response.json())
    .then(json => displayContext(json));

    function displayContext(spaceObject) {
        console.log(spaceObject); //console.log API array

        let title = document.createElement('h1');
        title.className = 'card-title';
        title.innerText = spaceObject[0].caption;
        title.style = 'font-family: stardate;';
        title.style.textTransform = 'uppercase';
        console.log(spaceObject[0].caption);

        let date = document.createElement('p');
        date.className = 'card-text';
        date.innerText = spaceObject[0].date;
        date.style.fontFamily = 'bank-gothic';
        console.log(spaceObject[0].date);

        let expl = document.createElement('p');
        expl.innerHTML = `<strong>Geographical Coordinates of Image</strong><br>Latitude: ${spaceObject[0].centroid_coordinates.lat}
        <br>Longitude: ${spaceObject[0].centroid_coordinates.lon}
        <br><strong>Position of the Satellite in Space</strong><br>X: ${spaceObject[0].dscovr_j2000_position.x}, Y: ${spaceObject[0].dscovr_j2000_position.y}, Z: ${spaceObject[0].dscovr_j2000_position.z}
        <br><strong>Position of the Moon in Space</strong><br>X: ${spaceObject[0].lunar_j2000_position.x}, Y: ${spaceObject[0].lunar_j2000_position.y}, Z: ${spaceObject[0].lunar_j2000_position.z}
        <br><strong>Position of the Sun in Space</strong><br>X: ${spaceObject[0].sun_j2000_position.x}, Y: ${spaceObject[0].sun_j2000_position.y}, Z: ${spaceObject[0].sun_j2000_position.z}
        <br><strong>Satellite Attitude</strong><br>Q0: ${spaceObject[0].attitude_quaternions.q0}, Q1: ${spaceObject[0].attitude_quaternions.q1},<br>Q2: ${spaceObject[0].attitude_quaternions.q0}, Q3: ${spaceObject[0].attitude_quaternions.q3}`;
        expl.style.fontFamily = 'sans-serif';

        moreInfoBtn.style.fontFamily = 'bank-gothic';

        modalTitle.innerText = spaceObject[0].caption;
        modalTitle.style.fontFamily = 'stardate';
        // modalTitle.style.textTransform = 'uppercase';
        modalTitle.style.fontSize = '36px';

        
        cardBody.insertBefore(title, moreInfoBtn);
        cardBody.insertBefore(date, moreInfoBtn);
        modalBody.appendChild(expl);
    }

fetch(baseURL + '?api_key=' + key)
    .then(response => response.json())
    .then(json => displayImage(json));

function displayImage(spaceImage) {
    let img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = `${baseURL2}/natural/date/${date}/png/${spaceImage[0].image}.png`;
        console.log(`Image file: ${baseURL2}/archive/natural/${date}/png/${spaceImage[0].image}.png`); //console.log image filename + .jpg
    
    card.insertBefore(img, cardBody);
}

//date
//explanation
//hdurl
//media_type
//service_version
//title
//url