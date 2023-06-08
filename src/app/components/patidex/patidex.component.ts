import { Component, OnInit } from '@angular/core';
import { ApiGardenService } from 'src/app/services/api-gardens.service';
import { Location } from 'src/app/location';

@Component({
  selector: 'app-patidex',
  templateUrl: './patidex.component.html',
  styleUrls: ['./patidex.component.scss']
})
export class PatidexComponent implements OnInit {

  constructor(private apiGardenService: ApiGardenService) { }

  locations?: Location[];
  status: string = "loading";

  getLocations(): void {
    this.apiGardenService.GetGardenList().subscribe({
      next: (modifiedResponse: Location[]) => {
        console.log(modifiedResponse)
        this.locations = modifiedResponse
        this.status = 'ready'
      },
      error: (error: string) => {
        console.error(error)
      }
    });  
  }


  ngOnInit(): void {
    this.getLocations();
  }
}
