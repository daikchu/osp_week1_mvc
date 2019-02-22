import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { Router } from '@angular/router';

import { PaginationService } from '../pagination/pagination.service';
// import { PagerService } from './service/index';

@Component({
    selector: 'book-list',
    templateUrl: './bookList.component.html',
    styleUrls: ['./bookList.component.css']
})

export class BookListComponent implements OnInit{
     /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;
  // paged items
  pagedItems: any[];


    book = new Book();
    statusMessage: string;
    books: Book[];
    constructor(private _bookService: BookService,
                private _router: Router,
                 private pagerService: PaginationService
                ){}
    
    ngOnInit(): void {
        console.log("calling ngOnInit()::::");
        this.getBooks();
    }

    getBooks(): void{
        console.log("Inside getBooks():::::")

        const query = {
          size: this.pageSize, 
          page: this.currentPage
        };
        const queryAll = {
          size: this.pageSize,
          page: this.currentPage,
          //  sort: 'dateCreated,desc', 
        }
        this._bookService.findAllBook({...queryAll}).subscribe(res => {
            this.processToShow(res);
        })

        // this._bookService.getAllBooks()
        //     .subscribe((bookData) => this.books = bookData,
        //     (error) =>{
        //         console.log(error);
        //         this.statusMessage = "Problem with service. Please try again later!";
        //     }
        // );
        console.log("end of getBooks():::::");
    }

    processToShow(res) {
      console.log('res for get all = ', res);
       this.pager = this.pagerService.getPager(this.currentPage, this.pageSize, res.totalElements);
        this.books = res.content;
       this.totalItems = res.totalElements;
      }

      setPage (number) {
        console.log('Number', number);
        this.currentPage = number;
        this.getBooks();
      }


    //dai
    create () {
        this._router.navigate(['book/create']);
      }
}