import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../location';

interface myArray {
  address: string;
  shape: [];
}

@Injectable({
  providedIn: 'root'
})
export class ApiGardenService {

  constructor(private httpClient: HttpClient) { }

  locations: any

  GetGardenList(): Observable<any> {
    const url = "https://data.tours-metropole.fr/api/records/1.0/search/?dataset=espaces-verts-tours-metropole-val-de-loire&q=&facet=commune&facet=libelle&facet=structure&facet=adresse&facet=aire_en_m";
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        const iterator = response.records;
        let data = []
        for(let location of iterator) {
          let mylocation = new Location(location.fields.adresse, location.fields.geo_shape.coordinates);
          data.push(mylocation)
        }
        return data;
      })
    );
  }


}
