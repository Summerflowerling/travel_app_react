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
const app: Application = express();
app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//const cors = require('cors');
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  //res.sendFile('dist/index.tsx');
  //res.sendFile(path.resolve('src/index.tsx'));
  res.send("Hello")
});
app.listen(8085, () => { console.log('server running on 8085' )});

type GeoData = {
  geonames: GeonamesEntity[];
};

type GeonamesEntity = {
  lng: string;
  lat: string;
};

type WeatherbitData = {
  weather: WeatherbitEnity[];
};

type WeatherbitEnity = {
  icon: string;
  code: number;
  description: string;
};

type PixabayData = {
  hits: hitsEntity[];
};

type hitsEntity = {
  largeImageURL: string;
};

const isGeoData = (data: any): data is GeoData => {
  return 'geonames' in data;
};

const isWeatherBitData = (data: any): data is WeatherbitData => {
  return 'weather' in data;
};

const isPixaBayData = (data: any): data is PixabayData => {
  return 'hits' in data;
};

app.post('/getGeoname', async (req: Request, res: Response) => {
  // const API_URL = `http://api.geonames.org/searchJSON?q=${req.body.location}&maxRows=1&username=iku124`;
  const API_URL = `http://api.geonames.org/searchJSON?q="paris"&maxRows=1&username=iku124`;
  const myPromise = await fetch(API_URL);
  let weatherbitRes;
  let weatherbitPromiseObjType;
  let pixabayRes;

  try {
    if (myPromise) {
      const myData = await myPromise.json();
      if (isGeoData(myData)) {
        try {
          const lng = myData.geonames[0].lng;
          const lat = myData.geonames[0].lat;
          const weatherbit = await fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=7&key=25236c54b21347c5acba0d34020a5c84`,
          );
          weatherbitRes = weatherbit;

          if (weatherbitRes) {
            const weatherbitPromise = await weatherbitRes.json();
            if (isWeatherBitData(weatherbitPromise)) {
              weatherbitPromiseObjType = weatherbitPromise;
            }

            const pixabay = await fetch(
              `https://pixabay.com/api/?key=4772361-58a041a9c4a31b16cbe90fbc1&q=${req.body.location}&image_type=photo&editors_choice=true&category=travel`,
            );
            pixabayRes = pixabay;
          }

          if (pixabayRes) {
            const pixabayPrimose = await pixabayRes.json();
            if (isPixaBayData(pixabayPrimose)) {
              res.send([weatherbitPromiseObjType, pixabayPrimose.hits[0].largeImageURL]);
              console.log('pixabayPromise', pixabayPrimose.hits[0]);
            }
          }
        } catch (error) {
          res.send([weatherbitPromiseObjType, '/img/backup.png']);
          console.log('Something wrong when fetching the photo', error);
        }
      }
    }
  } catch (error) {
    alert('Make sure you enter a country or city name');
    return;
  }
});

module.exports = app;
