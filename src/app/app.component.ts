import { Component, OnInit } from '@angular/core';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'crud-app';
  unicornDetails:[]=[];

  constructor(private profileService:ProfileService){}
  
  
  ngOnInit(): void {
    
    this.profileService.getUnicornDetails().subscribe((data:any)=>{
     this.unicornDetails =data
    })
  }


}
