/*Api URL*/
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response, Application } from 'express';
import express from 'express';
import fetch from 'node-fetch';
//const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?';
//const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
//const pixabayUrl = 'https://pixabay.com/api/?key=4772361-58a041a9c4a31b16cbe90fbc1&q=yellow+flowers&image_type=photo';
const app: express.Application = express();
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//const cors = require('cors');
app.use(cors());
app.listen(8080);

app.get('/', (req: Request, res: Response) => {
  //res.sendFile('dist/index.tsx');
  res.sendFile(path.resolve('src/index.tsx'))
});

type GeoData = {
  geonames: GeonamesEntity[];
}

type GeonamesEntity = {
  lng: string;
  lat: string;
}

type PixabayData = {
  hits: hitsEntity[];
}

type hitsEntity = {
  largeImageURL: string;
}

app.post('/getGeoname', async (req: Request, res: Response) => {
  const API_URL = `http://api.geonames.org/searchJSON?q=${req.body.location}&maxRows=1&username=iku124`;
  const myPromise = await fetch(API_URL);

  try {
    const myData: GeoData = await myPromise.json();
    const lng = myData.geonames[0].lng;
    const lat = myData.geonames[0].lat;
    const weatherbit = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=7&key=25236c54b21347c5acba0d34020a5c84`,
    );
    try {
      const weatherbitPromise = await weatherbit.json();
      console.log(weatherbitPromise);
      const pixabay = await fetch(
        `https://pixabay.com/api/?key=4772361-58a041a9c4a31b16cbe90fbc1&q=${req.body.location}&image_type=photo&editors_choice=true&category=travel`,
      );

      try {
        const pixabayPrimose: PixabayData = await pixabay.json();
        console.log(pixabayPrimose.hits[0]);
        res.send([weatherbitPromise, pixabayPrimose.hits[0].largeImageURL]);
      } catch (error) {
        res.send([weatherbitPromise, '/img/backup.png']);
        console.log('Something wrong when fetching the photo', error);
      }
    } catch (err) {
      console.log('Error in the second fetch', err);
    }
  } catch (error) {
    alert('Make sure you enter a country or city name');
    return;
  }
});

module.exports = app;

