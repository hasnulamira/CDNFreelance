import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpClient: HttpClient) { }

  async GetAllUser(PageNum: any, PageSize: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `https://hasnul-freelancecdn.azurewebsites.net/api/Users/GetAllUser?PageNum=${PageNum}&PageSize=${PageSize}`

      let headers = new HttpHeaders(
        {
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
        }
      );

      this.httpClient.get<Data>(url, { headers: headers })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }
  async GetUser(UserID:any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `https://hasnul-freelancecdn.azurewebsites.net/api/Users/GetUser?ID=${UserID}`

      let headers = new HttpHeaders(
        {
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
        }
      );

      this.httpClient.get<Data>(url, { headers: headers })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }
  async UpdateUser(UserID:any,Params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `https://hasnul-freelancecdn.azurewebsites.net/api/Users/UpdateUser?ID=${UserID}`
      const body = Params;
      let headers = new HttpHeaders(
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, HEAD",
        }
      );

      this.httpClient.put<Data>(url, body, { headers: headers })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }
  async DeleteUser(UserID:any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `https://hasnul-freelancecdn.azurewebsites.net/api/Users/DeleteUser?ID=${UserID}`
      let headers = new HttpHeaders(
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, HEAD, DELETE",
        }
      );

      this.httpClient.delete<Data>(url, { headers: headers })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }
  async RegisterUser(Params:any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = `https://hasnul-freelancecdn.azurewebsites.net/api/Users/RegisterUser`
      const body = Params;
      let headers = new HttpHeaders(
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, HEAD, DELETE",
        }
      );

      this.httpClient.post<Data>(url, body, { headers: headers })
        .subscribe({
          next: (data) => resolve(data),
          error: (err) => reject(err),
        });
    });
  }
}
