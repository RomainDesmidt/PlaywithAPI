import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '../location';

export interface OldLocationArray {
  fields: { 
    adresse: string,
    geo_shape: {
      coordinates: [],
    }
  }
}

export interface OldLocationObject {
  records: OldLocationArray[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiGardenService {

  constructor(private httpClient: HttpClient) { }

  GetGardenList(): Observable<Location[]> {
    const url = "https://data.tours-metropole.fr/api/records/1.0/search/?dataset=espaces-verts-tours-metropole-val-de-loire&q=&facet=commune&facet=libelle&facet=structure&facet=adresse&facet=aire_en_m";
    return this.httpClient.get<any>(url).pipe(
      map((response: OldLocationObject) : Location[] => {
        const locations: OldLocationArray[] = response.records;
        let data: Location[] = []
        for(let location of locations) {
          let locationContainer = new Location(location.fields.adresse, location.fields.geo_shape.coordinates);
          data.push(locationContainer)
        }
        return data;
      })
    );
  }


}
