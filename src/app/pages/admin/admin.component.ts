import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  productForm: FormGroup;
  products: any[] = []; 

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required], // Ensure it's initialized as null
    });
  }

  submit(): void {
    if (this.productForm.valid) {
      const fileInput = this.productForm.get('image')?.value; // Get the file object
      if (fileInput) {
        const file = fileInput[0]; // The file selected by the user (FileList)

        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string; // Get Base64 string

          // Create a product object with the image converted to Base64
          const product = {
            ...this.productForm.value,
            image: base64Image,  // Save the Base64 string
          };

          // Retrieve existing products from localStorage and add the new product
          this.loadProductsFromLocalStorage();
          this.products.push(product);
          localStorage.setItem('products', JSON.stringify(this.products)); // Save to localStorage

          alert('Product added successfully!');
          this.productForm.reset();
        };

        reader.onerror = () => {
          alert('Failed to read the file');
        };

        reader.readAsDataURL(file); // Convert the image to Base64
      } else {
        alert('Please select an image');
      }
    }
  }

  loadProductsFromLocalStorage(): void {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    // Check if the selected file is an image
    if (file && file.type.startsWith('image/')) {
      // Update the form control with the selected file
      this.productForm.patchValue({ image: event.target.files }); // Pass the FileList directly
      this.productForm.get('image')?.updateValueAndValidity();
    } else {
      alert('Invalid file selected. Please upload a valid image file.');
      this.productForm.patchValue({ image: null }); // Reset the form control if invalid file
    }
  }

}
