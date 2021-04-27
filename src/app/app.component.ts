import { Component } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';

import Static from 'ol/source/ImageStatic';
import ImageLayer from 'ol/layer/Image';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ol-demo';
  fileToUpload: File = null;
  map: Map;

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        //[8905762.05329715, 23.05958418288012]
        center: fromLonLat([15, 8]),
        zoom: 3,
      }),
    });

    let imageSource = new Static({
      attribution: '<b>Image</b>',
      url: 'assets/download.jpg',
      imageExtent: [
        9046809.76375351,
        2392065.5622441433,
        9246528.513419153,
        2557183.914489642,
      ],
    });

    let imageLayer = new ImageLayer({
      source: imageSource,
    });

    this.map.addLayer(imageLayer);

    /*  setInterval(() => {
      // console.log(this.map.getView().getCenter());
      //console.log(this.map.getView().calculateExtent());
    }, 5000); */
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    alert('hi');
  }

  changefile() {
    //console.log('hiiiiiiiii');

    var inputJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [75.5859375, 20.632784250388028],
                [81.5185546875, 20.632784250388028],
                [81.5185546875, 25.799891182088334],
                [75.5859375, 25.799891182088334],
                [75.5859375, 20.632784250388028],
              ],
            ],
          },
        },
      ],
    };

    let vectorSource = new VectorSource({
      format: new GeoJSON(),
      features: new GeoJSON().readFeatures(inputJson),
    });

    let vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map.addLayer(vectorLayer);
    console.log('done.....');
  }

  dropHandler(event) {
    console.log('droppppppp');
  }
}
