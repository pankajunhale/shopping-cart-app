import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_URL } from '../../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected baseServiceUrl: string;
  constructor() {
    this.baseServiceUrl = environment.API_BASE_URL;
  }


}
