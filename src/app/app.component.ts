import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from './dialoge/dialoge.component';
import { ApiService } from './services/api.service';
import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'product';

  displayedColumns: string[] = ['id' ,'productName', 'Category', 'Freshness', 'Date', 'price', 'comment', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialoge: MatDialog , private api : ApiService){}

  ngOnInit(): void {
   this.getAllProduct();
  }

  openDialog() {
    this.dialoge.open(DialogeComponent, {
      width : '30%'
    }).afterClosed().subscribe(val=>{
      if (val == 'save'){
        this.getAllProduct();
      }
    });
  }

  getAllProduct(){
    this.api.getProduct()
    .subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(data1 : any){
    this.dialoge.open(DialogeComponent, {
      width: '30%',
      data: data1
    }).afterClosed().subscribe(val=>{
      if (val == 'update'){
        this.getAllProduct();
      }
    });
  }
  
  deleteProduct(id:any){
    this.api.deleteProduct(id);
    // this.getAllProduct();
  }
}

