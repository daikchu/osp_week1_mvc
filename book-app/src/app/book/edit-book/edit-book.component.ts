import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookService } from '../book.service';

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html'
//   styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  public action: string = 'edit';
  public data: any;

  constructor(
    private bookService: BookService,
    private location: Location,
  ) { }

  ngOnInit() {
    // this.bookService.fiber$
    //   .subscribe(res => {
    //     this.data = res;
    //   });
  }

  back() {
    this.location.back();
  }

  callBackUpdate() {
    this.back();
  }

}
