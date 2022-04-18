import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  postProduct(data: any){
    return this.http.post<any>("http://localhost:8000/productlist/" , data)
    .subscribe(res => console.log(res));
  }

  getProduct(){
      return this.http.get<any>("http://127.0.0.1:8000/productlist/");
  }

  updateProduct(data : any , id:any){
    return this.http.put<any>("http://127.0.0.1:8000/productlist/"+id+"/", data).subscribe(res=>console.log(res))
  }
  
  deleteProduct(id:any){
    return this.http.delete<any>("http://localhost:8000/productlist/"+id+"/").subscribe(res=>console.log(res))
  }
}
