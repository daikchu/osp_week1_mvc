import { Injectable } from '@angular/core';
import { FileResponse } from '../book/entities/interfaces/file-response.interface';
import {EntityService, QueryOption} from '../book/entities/entity.service'
// import { EntityService, QueryOption } from '';

// tslint:disable-next-line:import-blacklist
import { Subject, BehaviorSubject } from 'rxjs';
import { FILE_API } from '../api.constainces';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class FileResponseService extends EntityService<FileResponse>   {
  fileResponse$: Subject<any> = new BehaviorSubject(null);
  baseUrl = FILE_API.BASE;
  private uploadUrl = FILE_API.UPLOAD;
  private downloadUrl = FILE_API.DOWNLOAD;
  private getUrl = FILE_API.GET;
  private exportNode = FILE_API.EXPORT_NODE;
  private exportMaterialUrl = FILE_API.EXPORT_MATERIAL_SPART;
  private exportHandoverDocsUrl = FILE_API.EXPORT_HANDOVER_DOCS;

  constructor() {
    super();
  }

  public upload(formData): Observable<any> {
    return this.http.post(this.uploadUrl, formData)
      .do(this.onResponse.bind(this))
      .map(this.extractResponse.bind(this))
      .catch(error => this.handleError(error));
  }

  public getFileUrl(path: string): string {
    return `${this.getUrl}/${path}`;
  }

//   public download(filePath): Observable<any> {
//     const url = `${this.downloadUrl}?path=${filePath}`;
//     return this.http.get(url, { responseType: 'blob' })
//       .map(res => {
//         return new Blob([res], { type: 'application/pdf' })
//       })
//       .catch(error => this.handleError(error));
//   }

//   public downloadImg(filePath): Observable<any> {
//     const url = `${this.downloadUrl}?path=${filePath}`;
//     return this.http.get(url, { responseType: 'blob' })
//       .map(res => {
//         return new Blob([res], { type: 'image/png' })
//       })
//       .catch(error => this.handleError(error));
//   }

//   public exportMaterialSpart(object, query, mtWarehouseId) {
//     console.log(object.type)
//     const params: any = {
//       searchValue: object.value || '',
//       jhiType: object.type == null ? '' : object.type,
//       mtNodeTypeId: object.mtNodeTypeId == null ? '' : object.mtNodeTypeId,
//       mtVendorId: object.mtVendorId || '',
//       workStatus: object.workStatus == null ? '' : object.workStatus,
//       mtPersonalId: object.mtPersonalId || '',
//       mtWarehouseId: mtWarehouseId || '',
//       sort: query.sort,
//       page: query.page,
//       size: query.size,
//     }
//     console.log('param: ', params);
//     return this.exportExcel(this.exportMaterialUrl, params);
//   }

//   public exportHandoverDocs(object, mtWarehouseId, query) {
//     console.log(object.type)
//     const params = {
//       fromDate: object.fromDate || '',
//       toDate: object.toDate || '',
//       mtWarehouseId: mtWarehouseId || '',
//       sort: query.sort,
//       page: query.page,
//       size: query.size,
//     }
//     console.log('param: ', params);
//     return this.exportExcel(this.exportHandoverDocsUrl, params);
//   }

//   public export(nodeId): Observable<any> {
//     const url = `${this.exportNode}?nodeId=` + nodeId;
//     return this.queryData(url);
//   }

//   private queryData(url): Observable<any> {
//     return this.http.get(url, { responseType: 'blob', observe: 'response' })
//       .do(this.onResponse.bind(this))
//       .map(this.extractResponse.bind(this))
//       .map(this.convertListResponse.bind(this))
//       .catch(error => this.handleError(error));
//   }

  saveFile(blob, fileName) {
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
