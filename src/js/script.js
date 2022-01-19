class Table {
       
    static _api = [];
    

    static tableGenerator() {
        const table = document.createElement('table');
        table.classList.add('table');

        const tr = document.createElement('tr');

        const positionTh = document.createElement('th');
        positionTh.classList.add('position');

        const positionButton = document.createElement('button');
        positionButton.id = 'positionButton';
        positionButton.innerHTML = 'Posição <img src="src/img/setaBaixo.png">';

        const countryTh = document.createElement('th');
        countryTh.innerText = 'País';
        countryTh.classList.add('country');

        const goldTh = document.createElement('th');
        goldTh.classList.add('gold');

        const goldButton = document.createElement('button');
        goldButton.id = 'goldButton';
        goldButton.innerHTML = 'Ouro <img src="src/img/setaBaixo.png">';

        const silverTh = document.createElement('th');
        silverTh.classList.add('silver');

        const silverButton = document.createElement('button');
        silverButton.id = 'silverButton';
        silverButton.innerHTML = 'Prata <img src="src/img/setaBaixo.png">';

        const bronzeTh = document.createElement('th');
        bronzeTh.classList.add('bronze');

        const bronzeButton = document.createElement('button');
        bronzeButton.id = 'bronzeButton';
        bronzeButton.innerHTML = 'Bronze <img src="src/img/setaBaixo.png">';

        const totalTh = document.createElement('th');
        totalTh.innerText = 'Total';
        totalTh.classList.add('total');

        const main = document.querySelector('.container');

        positionTh.appendChild(positionButton);
        goldTh.appendChild(goldButton);
        silverTh.appendChild(silverButton);
        bronzeTh.appendChild(bronzeButton);
        tr.appendChild(positionTh);
        tr.appendChild(countryTh);
        tr.appendChild(goldTh);
        tr.appendChild(silverTh);
        tr.appendChild(bronzeTh);
        tr.appendChild(totalTh);
        table.appendChild(tr);
        main.appendChild(table)
    }

    
    static async dataApi() {
        Table._api = await fetch('https://kenzie-olympics.herokuapp.com/paises')
        .then(response => response.json());

        Table._api = Table.countryPositionComputer();
    }

    static medalsTableGenerator(value, index, invert = false) {

        if(invert === false) {
            const tr = document.createElement('tr');
            tr.classList.add('countryTr');

            const positionTd = document.createElement('td');
            positionTd.innerText = `${index+1}°`;

            const countryTd = document.createElement('td');
            countryTd.innerText = `${value.country}`;
            countryTd.classList.add('countryTd');

            const countryImg = document.createElement('img');
            countryImg.src = `${value.flag_url}`;
            countryImg.alt = `Bandeira do(a) ${value.country}`;

            const goldTd = document.createElement('td');
            goldTd.innerText = `${value.medal_gold}`;

            const silverTd = document.createElement('td');
            silverTd.innerText = `${value.medal_silver}`;

            const bronzeTd = document.createElement('td');
            bronzeTd.innerText = `${value.medal_bronze}`;

            const totalTd = document.createElement('td');
            totalTd.innerText = `${value.totalMedals}`;

            tr.appendChild(positionTd);
            countryTd.appendChild(countryImg);
            tr.appendChild(countryTd);
            tr.appendChild(goldTd);
            tr.appendChild(silverTd);
            tr.appendChild(bronzeTd);
            tr.appendChild(totalTd);
            table.appendChild(tr);
        } else {
            const tr = document.createElement('tr');
            tr.classList.add('countryTr');

            const positionTd = document.createElement('td');
            positionTd.innerText = `${Table._api.length-index}°`;

            const countryTd = document.createElement('td');
            countryTd.innerText = `${value.country}`;
            countryTd.classList.add('countryTd');

            const countryImg = document.createElement('img');
            countryImg.src = `${value.flag_url}`;
            countryImg.alt = `Bandeira do(a) ${value.country}`;

            const goldTd = document.createElement('td');
            goldTd.innerText = `${value.medal_gold}`;

            const silverTd = document.createElement('td');
            silverTd.innerText = `${value.medal_silver}`;

            const bronzeTd = document.createElement('td');
            bronzeTd.innerText = `${value.medal_bronze}`;

            const totalTd = document.createElement('td');
            totalTd.innerText = `${value.totalMedals}`;

            tr.appendChild(positionTd);
            countryTd.appendChild(countryImg);
            tr.appendChild(countryTd);
            tr.appendChild(goldTd);
            tr.appendChild(silverTd);
            tr.appendChild(bronzeTd);
            tr.appendChild(totalTd);
            table.appendChild(tr);
        }
        
    }

    static countryPositionComputer() {
        let total = 0;
        for(let i = 0; i < Table._api.length; i++) {
            total = Table._api[i].medal_gold + Table._api[i].medal_silver + Table._api[i].medal_bronze
            Table._api[i].totalMedals = total;
        }
        Table._api.sort((a,b) => {
            if(a.totalMedals === b.totalMedals && a.medal_gold > b.medal_gold) {
                return -1;
            } else if(a.totalMedals === b.totalMedals && a.medal_gold < b.medal_gold) {
                return 1;
            } else {
                if(a.totalMedals > b.totalMedals) {
                    return -1
                } else if(a.totalMedals < b.totalMedals) {
                    return 1
                } else {
                    return 0;
                }
            }
        });
        return Table._api;
    }

    static showAllCountries() {
        Table._api.forEach((item, index) => {
            Table.medalsTableGenerator(item, index);
        });
    }
}

await Table.dataApi();
Table.tableGenerator();
const table = document.querySelector('.table');
Table.showAllCountries();

const searchButton = document.querySelector('.pesquisa__form__button');
const searchInput = document.querySelector('.pesquisa__form__input');
searchButton.addEventListener('click', (event) => {
    let tr = document.querySelectorAll('.countryTr');
    event.preventDefault();
    
    tr.forEach((item) => {
        item.remove();
    });
    
    for(let i = 0; i < Table._api.length; i++) {
        if(Table._api[i].country.toLowerCase().includes(searchInput.value.toLowerCase())) {
            Table.medalsTableGenerator(Table._api[i], i, false);
        }
    }
    searchInput.value = '';
});

let counterPosition = true;
let counterGoldPosition = true;
let counterSilverPosition = true;
let counterBronzePosition = true;
table.addEventListener('click', (event) => {
    const clickedButton = event.target;
    const second_api = [...Table._api];
    let positionTr = document.querySelectorAll('.countryTr');
    const positionButtonArrow = document.querySelector('#positionButton img');
    const goldButtonArrow = document.querySelector('#goldButton img');
    const silverButtonArrow = document.querySelector('#silverButton img');
    const bronzeButtonArrow = document.querySelector('#bronzeButton img');
    if(clickedButton.id === 'positionButton' && counterPosition === true) {
        let reverse_api = second_api.reverse();
        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            if(reverse_api[i].country.toLowerCase().includes(searchInput.value.toLowerCase())) {
                Table.medalsTableGenerator(reverse_api[i], i, true);
            }
        }

        counterPosition = false;
        positionButtonArrow.src = 'src/img/setaCima.png';

    } else if(clickedButton.id === 'positionButton' && counterPosition === false) {
        let reverse_api = second_api;
        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            if(reverse_api[i].country.toLowerCase().includes(searchInput.value.toLowerCase())) {
                Table.medalsTableGenerator(reverse_api[i], i, false);
            }
        }
        counterPosition = true;
        positionButtonArrow.src = 'src/img/setaBaixo.png';
    }

    if(clickedButton.id === 'goldButton' && counterGoldPosition === true) {
        let goldSort_api = second_api.sort(function (a, b) {
            return (a.medal_gold < b.medal_gold) ? 1 : ((b.medal_gold < a.medal_gold) ? -1 : 0);
        });

        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            Table.medalsTableGenerator(goldSort_api[i], i, false);
        }

        counterGoldPosition = false;
        goldButtonArrow.src = 'src/img/setaBaixo.png';

    } else if(clickedButton.id === 'goldButton' && counterGoldPosition === false){
        let goldSort_api = second_api.sort(function (a, b) {
            return (a.medal_gold > b.medal_gold) ? 1 : ((b.medal_gold > a.medal_gold) ? -1 : 0);
        });
        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            
            Table.medalsTableGenerator(goldSort_api[i], i, true);
    
        }
        counterGoldPosition = true;
        goldButtonArrow.src = 'src/img/setaCima.png';
    }
    
    if(clickedButton.id === 'silverButton' && counterSilverPosition === true) {
        let silverSort_api = second_api.sort(function (a, b) {
            return (a.medal_silver < b.medal_silver) ? 1 : ((b.medal_silver < a.medal_silver) ? -1 : 0);
        });

        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            Table.medalsTableGenerator(silverSort_api[i], i, false);
        }
        counterSilverPosition = false;
        silverButtonArrow.src = 'src/img/setaBaixo.png';

    } else if(clickedButton.id === 'silverButton' && counterSilverPosition === false) {
        let silverSort_api = second_api.sort(function (a, b) {
            return (a.medal_silver > b.medal_silver) ? 1 : ((b.medal_silver > a.medal_silver) ? -1 : 0);
        });
        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            Table.medalsTableGenerator(silverSort_api[i], i, true);
        }
        counterSilverPosition = true;
        silverButtonArrow.src = 'src/img/setaCima.png';
    }

    if(clickedButton.id === 'bronzeButton' && counterBronzePosition === true) {
        let bronzeSort_api = second_api.sort(function (a, b) {
            return (a.medal_bronze < b.medal_bronze) ? 1 : ((b.medal_bronze < a.medal_bronze) ? -1 : 0);
        });

        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            Table.medalsTableGenerator(bronzeSort_api[i], i, false);
        }
        counterBronzePosition = false;
        bronzeButtonArrow.src = 'src/img/setaBaixo.png';

    } else if(clickedButton.id === 'bronzeButton' && counterBronzePosition === false) {
        let bronzeSort_api = second_api.sort(function (a, b) {
            return (a.medal_bronze > b.medal_bronze) ? 1 : ((b.medal_bronze > a.medal_bronze) ? -1 : 0);
        });
        positionTr.forEach((item) => {
            item.remove();
        });
        
        for(let i = 0; i < Table._api.length; i++) {
            Table.medalsTableGenerator(bronzeSort_api[i], i, true);
        }
        counterBronzePosition = true;
        bronzeButtonArrow.src = 'src/img/setaCima.png';
    }
});