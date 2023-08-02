import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Unicorn } from '../shared/models/unicorn';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string = environment.apiUrl
  

  constructor(private http: HttpClient) { }

  getUnicornDetails(): Observable<Unicorn[]>{
    return this.http.get<Unicorn[]>(this.baseUrl + 'unicorns');
  }
}
