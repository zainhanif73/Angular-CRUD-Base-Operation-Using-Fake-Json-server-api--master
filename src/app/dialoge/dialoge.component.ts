import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialoge',
  templateUrl: './dialoge.component.html',
  styleUrls: ['./dialoge.component.css']
})

export class DialogeComponent implements OnInit {

  productForm!: FormGroup;
  seasons = ["Brand New", "Second Hand", "Refurbished"]
  actionBtn:string ="Save"

  constructor(private formBuilder: FormBuilder, 
     private api:ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialoge: MatDialogRef<DialogeComponent>
  ){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        productName: [''],
        category : ['' ],
        freshness : ['' ],
        price : ['' ],
        comment : ['' ],
        date : ['' ],
      }
    )
    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if (this.editData){
      this.updateProduct();
    }
    else{
      if (this.productForm.valid){
        this.api.postProduct(this.productForm.value);
        this.productForm.reset();
        this.dialoge.close('saved');
      }
    }
  }

  updateProduct(){
    this.api.updateProduct(this.productForm.value , this.editData.id);
    this.productForm.reset();
    this.dialoge.close('update');
  }

  deleteProduct(id:any){
    this.api.deleteProduct(id);
  }
  
}
