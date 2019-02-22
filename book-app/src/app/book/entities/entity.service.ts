// import { AppInjector } from '@app/app.injector';
import { Observable } from 'rxjs/Observable';
import { Entity } from './interfaces/entity.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface QueryOption {
  limit?: number;
  page?: number;
  size?: number;
  sort?: string | string[];
  pageNumber?: number;
  searchValues?: string;
  searchValue?: string;
  fromDate?: string,
  toDate?: string,
}

export const defaultQueryOption: QueryOption = {
  // limit: 10
}

export class EntityService<T extends Entity> {
  protected http: HttpClient;
  protected baseUrl: string
  private BASE_URL;
  oldQuery = {
    searchValue: null,
    page: 0
  };

  constructor() {
    // this.http = AppInjector.get(HttpClient);
  }

  public find(id: number | string): Observable<T> {
    const url = this.buildFindingUrl(id);
    return this.http.get<T>(url)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertSingleResponse.bind(this))
      .catch(error => this.handleError(error));
  }
  public searchApi(searchValue: string, option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = this.buildSearchUrl(searchValue);
    return this.http.get<any>(url, reqOptions)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }
  public searchApiV2(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = this.buildSearchUrlV2();
    return this.http.get<any>(url, reqOptions)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public getByUrl(url): Observable<any> {
    return this.http.get(url)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public findAll(): Observable<any> {
    const option = this.buildFindAllOption();
    return this.query(option);
  }

  public query(option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    const url = this.buildQueryUrl(option);
    return this.http.get<T>(url, reqOptions)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public queryByUrlCustom(url: string, option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    return this.http.get<T>(url, reqOptions)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public delete(id: number): Observable<any> {
    const url = this.buildDeleteUrl(id);
    return this.http.delete(url)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => {
        return Observable.of({ ok: true });
      });
  }

  public deleteResponseType(id: number): Observable<any> {
    const url = this.buildDeleteUrl(id);
    return this.http.delete(url, { responseType: 'text' })
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public queryDeleteListByUrlCustom(url: string, option: QueryOption): Observable<any> {
    const reqOptions = this.buildQueryRequestOption(option);
    return this.http.delete<T>(url, reqOptions)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .map(this.convertListResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public create(data: T): Observable<T> {
    const url = this.buildCreateUrl(data);
    const option = this.buildCreateOption(data);
    return this.http.post<T>(url, option)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public update(data: T): Observable<T> {
    const url = this.buildUpdateUrl(data);
    const option = this.buildUpdateOption(data);
    return this.http.put<T>(url, option)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public exportExcel(urlUpdate: string, option?): Observable<any> {
    if (!option) {
      option = {};
    }
    const params = new HttpParams({
      fromObject: option
    });
    const reqOptions = this.buildQueryOption(option);
    const url = this.buildExportUrl(urlUpdate);
    return this.http.get(url, { responseType: 'blob', observe: 'response', params: params })
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public resetOldQuery() {
    this.oldQuery = {
      searchValue: null,
      page: 0
    };
  }

  protected buildCreateUrl(data: T): string {
    return this.baseUrl;
  }
  protected buildSearchUrl(searchValue: string) {
    return `${this.baseUrl}/search/${searchValue}`;
  }
  protected buildSearchUrlV2() {
    return `${this.baseUrl}/search`;
  }

  protected buildCreateOption(data: T): T {
    return data;
  }

  protected buildUpdateUrl(data: T): string {
    return this.baseUrl;
  }

  protected buildUpdateOption(data: T): T {
    return data;
  }

  private buildExportUrl(urlUpdate: string): string {
    const url = urlUpdate;
    return `${url}`;
  }

  public patch(): Observable<T> {
    throw new Error('patial update is not implemented yet.');
  }

  protected buildFindingUrl(id: number | string): string {
    return `${this.baseUrl}/${id}`;
  }

  protected buildFindAllOption(): QueryOption {
    return defaultQueryOption;
  }

  protected buildQueryUrl(option: QueryOption): string {
    return this.baseUrl;
  }

  private buildDeleteUrl(id: number): string {
    return this.buildFindingUrl(id);
  }

  protected buildQueryRequestOption(option: QueryOption): any {
    return {
      params: option
    };
  }

  protected buildHttpParams(option: QueryOption): HttpParams {

    let params = new HttpParams();
    Object.keys(option).forEach(key => {
      if (!Array.isArray(option[key])) {
        params = params.append(key, option[key] ? `${option[key]}` : '')
      }
    })

    const sort = option.sort;
    if (Array.isArray(sort)) {
      sort.forEach(s => params = params.append('sort', `${s}`));
    }

    console.log(params);

    return params;
  }

  protected convertSingleResponse(res: T): T {
    return res;
  }

  protected convertListResponse(res: T[]): T[] {
    return res;
  }

  protected onResponse(res: any) {
    return res;
  }

  protected handleError(error: Error): Observable<any> {
    return Observable.throw(error)
  }

  protected extractResponse(res: any): any {
    return res;
  }

  protected buildQueryOption(option: QueryOption): HttpParams {
    return new HttpParams();
  }

  protected buildRequestEntity(data: T): T {
    return data;
  }
}
