// // import { Injectable } from '@angular/core';
// // @Injectable()
// export class PagerService {
//   getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
//       // calculate total pages
//       let totalPages = Math.ceil(totalItems / pageSize);

//       // ensure current page isn't out of range
//       if (currentPage < 1) { 
//           currentPage = 1; 
//       } else if (currentPage > totalPages) { 
//           currentPage = totalPages; 
//       }
       
//       let startPage: number, endPage: number;
//       if (totalPages <= 10) {
//           // less than 10 total pages so show all 
//           startPage = 1;
//           endPage = totalPages;
//       } else {
//           // more than 10 total pages so calculate start and end pages
//           if (currentPage <= 6) {
//               startPage = 1;
//               endPage = 10;
//           } else if (currentPage + 4 >= totalPages) {
//               startPage = totalPages - 9;
//               endPage = totalPages;
//           } else {
//               startPage = currentPage - 5;
//               endPage = currentPage + 4;
//           }
//       }

//       // calculate start and end item indexes
//       let startIndex = (currentPage - 1) * pageSize;
//       let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

//       // create an array of pages to ng-repeat in the pager control
//       let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

//       // return object with all pager properties required by the view
//       return {
//           totalItems: totalItems,
//           currentPage: currentPage,
//           pageSize: pageSize,
//           totalPages: totalPages,
//           startPage: startPage,
//           endPage: endPage,
//           startIndex: startIndex,
//           endIndex: endIndex,
//           pages: pages
//       };
//   }
// }


import { Injectable } from '@angular/core';
import { range as LD_range } from 'lodash';

@Injectable()
export class PaginationService {

  constructor() { }

  getPager(currentPage?: number, pageSize?: number, totalItem?: number) {
    let startPage: number, endPage: number, totalPage: number;
    const pageInt = Math.floor(totalItem / pageSize);
    if (isNaN(pageInt)) {
      return {
        pages: null
      }
    }
    const temp = totalItem % pageSize;
    if (temp === 0) {
      totalPage = pageInt;
    } else {
      totalPage = pageInt + 1;
    }
    if (totalPage <= 5) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPage;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPage) {
        startPage = totalPage - 4;
        endPage = totalPage;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 3;
      }
    }
    // create an array of pages to ng-repeat in the pager control
    const pages = LD_range(startPage, endPage + 1);
    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPage,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }
}
