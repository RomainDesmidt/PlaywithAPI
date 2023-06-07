import { Component, OnInit } from '@angular/core';
import { ApiGardenService } from 'src/app/services/api-gardens.service';

@Component({
  selector: 'app-patidex',
  templateUrl: './patidex.component.html',
  styleUrls: ['./patidex.component.scss']
})
export class PatidexComponent implements OnInit {

  constructor(private apiGardenService: ApiGardenService) { }

  locations: any
  status = "loading"

  getLocations() {
    this.apiGardenService.GetGardenList().subscribe({
      next: modifiedResponse => {
        console.log(modifiedResponse)
        this.locations = modifiedResponse
        this.status = 'ready'
      },
      error: error => {
        console.error(error)
      }
    });  
  }


  ngOnInit(): void {
    this.getLocations();
  }
}
