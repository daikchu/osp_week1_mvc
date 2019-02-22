import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BookService } from './book/book.service';
import { BookComponent } from './book/book.component';
import { AppChildComponent } from './appchild.component';
import { BookListComponent } from './book/bookList.component';
import { PageNotFoundComponent } from './others/pageNotFound.component';
import { HomeComponent } from './book/home.component';
import {PaginationService} from './pagination/pagination.service';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {FileResponseService} from './file/file-response.service';



const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'addBook', component: BookComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [ 
    AppComponent, BookComponent, AppChildComponent, BookListComponent, HomeComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,  RouterModule.forRoot(appRoutes)
  ],
  providers: [BookService, PaginationService, HttpClient, FileResponseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
