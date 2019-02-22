import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookService} from './book.service';
import {Book} from './book';
import { PaginationService } from '../pagination/pagination.service';
import {FileResponseService} from '../file/file-response.service'
import {} from './entities/interfaces/file-response.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
       /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

    books: Book[];
    statusMessage: string;
    book = new Book();
   
    constructor(private _bookService: BookService,
                private _router: Router,
                private pagerService: PaginationService,
                private fileResource: FileResponseService,
                private _httpService: Http
                ){}

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void{
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

    addBook(): void{
        this._bookService.addBook(this.book)
            .subscribe((response) => {console.log(response); 
                // this.getBooks();
                this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );   
    }

    private reset(){
        this.book.id = null;
        this.book.ten = null;
        this.book.mota = null;
    }

    deleteBook(id: number){
        console.log("Inside the deleteBook()::::Book id::::"+id);
        this._bookService.deleteBook(id)
            .subscribe((response) => {console.log(response); 
                // this.getBooks();
            },
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteBook():::::::");
    }

    getBook(id: number){
        this._bookService.getBookById(id)
            .subscribe((bookData) => {this.book = bookData; 
                // this.getBooks(); 
            }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();    
    }


    attachPlanStatus = {
        fileName: '',
        fileUrl: '',
        hasData: false
      };
    patchValue (data) {
        console.log('data update', data);
        
        if (data.attachPlan) {
          this.attachPlanStatus.fileName = data.attachPlan.split('/').pop();
          this.attachPlanStatus.fileUrl = data.attachPlan;
          this.attachPlanStatus.hasData = true;
        } else {
          this.attachPlanStatus.fileName = '';
          this.attachPlanStatus.fileUrl = '';
          this.attachPlanStatus.hasData = false;
        }
     
        this.book.file = this.attachPlanStatus.fileName;
      }

      attachPlanChanged (event) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          const file = fileList[0];
          const type = file.type;
          this.uploadAttachPlan(file);
         
        }
      }

      uploadAttachPlan (file) {
        // const location = `${UPLOAD_FOLDER.LOCATION_ROUTINE}`;
      //  const location = `${UPLOAD_FOLDER.LOCATION_ROUTINE}`;
        const formData = new FormData();
        formData.append('file', file, file.name);
       // formData.append('location', location);
        this.fileResource.upload(formData).subscribe(res => {
          console.log('upload success', res);
          this.attachPlanStatus.hasData = true;
          this.attachPlanStatus.fileName = res.fileName;
          this.attachPlanStatus.fileUrl = res.url;
    
        //  this.routineForm.controls.attachPlan.reset();
        //   this.routineForm.patchValue({
        //     attachPlan: this.attachPlanStatus.fileName
        //   });
        this.book.file = this.attachPlanStatus.fileName;
        });
      }



      fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            /** In Angular 5, including the header Content-Type can invalidate your request */
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
         //   let options = new RequestOptions({ headers: headers });
            this._httpService.post(`localhost:8080/file/uploadFile`, formData)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
    }



}