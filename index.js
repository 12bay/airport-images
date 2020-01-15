const download = require('download');
const {map, prop} = require('ramda');

const airports = require('./airports.json');

const airportCodeList = map(prop('code'), airports);

const sizes = [
  {
    key: 'original',
    size: 'original',
  },
  {
    key: 'large',
    size: '800,',
  },
  {
    key: 'medium',
    size: '400,',
  },
  {
    key: 'small',
    size: '200x200',
  },
];

const totalCount = airportCodeList.length * sizes.length;

let doneCount = 0;

for (const {key, size} of sizes) {
  const dist = `images/${key}`;

  for (const code of airportCodeList) {
    // THIS IS FREE SERVICE
    // YOU NEED PROVIDE ANOTHER SERVICE
    const url = `https://airportcod.es/images/card/${code.toLowerCase()}.jpg?size=${size}`;

    download(url, dist)
      .then(() => {
        doneCount++;
        console.log(`${doneCount}/${totalCount} process`);
      })
      .catch(error => {
        console.log(url);
      });
  }
}
