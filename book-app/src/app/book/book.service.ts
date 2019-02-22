import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Book } from './book';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { AppInjector } from '@app/app.injector';

export interface QueryOption {
    limit?: number;
    page?: number;
    size?: number;
    pageNumber?: number;
    sort?: string;
  }

@Injectable()
export class BookService{
    
    protected http: HttpClient
    constructor(
        private _httpService: Http){
            // this.http = AppInjector.get(HttpClient);
        }
  
    
  public findAllBook( option: QueryOption): Observable<any> {
    const url = "http://localhost:8080/sach/all";
    return this._httpService.get(url, this.buildQueryRequestOption(option))
    // return this._httpService.get<any>(url, this.buildQueryRequestOption(option))
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }

  protected buildQueryRequestOption(option: QueryOption): any {
    return {
      params: option
    };
  }

  protected onResponse(res: any) {
    return res;
  }



  protected extractResponse(res: any): any {
    return res;
  }

  protected buildQueryOption(option: QueryOption): HttpParams {
    return new HttpParams();
  }

  protected buildRequestEntity(data: Book): Book {
    return data;
  }

  protected convertSingleResponse(res: Book): Book {
    return res;
  }

  protected convertListResponse(res: Book[]): Book[] {
    return res;
  }

  //
    getAllBooks(): Observable<Book[]>{
        return this._httpService.get("http://localhost:8080/sach/all")
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    getBookById(id: number): Observable<Book>{
        return this._httpService.get("http://localhost:8080/sach/one/"+id)
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    addBook(book: Book){
        let body = JSON.parse(JSON.stringify(book));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(book.id){    
            return this._httpService.put("http://localhost:8080/sach/update/"+book.id, body, options);
        }else{
            return this._httpService.post("http://localhost:8080/sach/create/", body, options);
        }
    }

    deleteBook(id: number){
        return this._httpService.delete("http://localhost:8080/sach/delete/"+id);
    }

    private handleError(error: Response){
        return Observable.throw(error);
    }
}