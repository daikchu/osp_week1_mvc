import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'create-book',
  templateUrl: './create-book.component.html'
//   styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  public action: string = 'create';
  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

  callBackCreate() {
    this.back();
  }

}
