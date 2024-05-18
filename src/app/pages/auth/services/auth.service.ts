import { Injectable } from '@angular/core';
import { SignInRequestDto } from '../dto/sign-in';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../common/constants';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseServiceUrl: string;
  constructor(private readonly httpService: HttpClient) {
    this.baseServiceUrl = environment.API_BASE_URL;
  }

  public validateLogin(dto: SignInRequestDto): Observable<any> {
    return this.httpService.post(`${this.baseServiceUrl}/${API_URL.LOGIN}`, dto);
  }
}
