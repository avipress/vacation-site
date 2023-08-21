import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.css']
})
export class AddVacationComponent implements OnInit {
  newVacationForm: FormGroup;
  newVacationData: any;
  selectedImage: File; // Property to store the selected image file
  imagePreview: string | ArrayBuffer | null = null; // Initialize to null
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.newVacationForm = this.formBuilder.group({
      destination: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', [Validators.required, this.futureDateValidator]], // Use custom validator for future dates
      end_date: ['', [Validators.required, this.futureDateValidator]], // Use custom validator for future dates
      price: ['', [Validators.required, this.priceValidator]],
      image_url: [''], // No need to initialize the image_url control here
    });
  }

  priceValidator(control: AbstractControl): { [key: string]: any } | null {
    const price = control.value;
    if (price < 0 || price > 10000) {
      return { invalidPrice: true };
    }
    return null;
  }


  onImageSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    const file = event.target.files[0]; // Get the selected file
    this.selectedImage = file; // Store the selected file in the component property

    // Create a FileReader to read the image file and generate a data URL for preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string; // Store the data URL in the component property
    };
    reader.readAsDataURL(this.selectedImage); // Read the file as data URL
    console.log(this.selectedImage.name)
    console.log(this.selectedImage)

  }


  futureDateValidator(control: FormControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      return { pastDate: true, message: 'Please select a future date.' };
    }
    return null;
  }
  
  onDragOver(event: any): void {
    event.preventDefault();
  }

  onDrop(event: any): void {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.handleImagePreview({ target: { files: [file] } });
  }
  triggerImageUpload(): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click();
  }
  handleImagePreview(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected File:', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedImage = file;
      }
    }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
    const formData = new FormData();
    formData.append('photo', this.selectedFile);
    
    this.http
      .post('http://localhost:4000/api/vac/addImg', formData)
      .subscribe((response) => {
        console.log(response);
      });
  }
  
  addVacation(): void {
    if (this.newVacationForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('destination', this.newVacationForm.value.destination);
    formData.append('description', this.newVacationForm.value.description);
    formData.append('start_date', this.newVacationForm.value.start_date);
    formData.append('end_date', this.newVacationForm.value.end_date);
    formData.append('price', this.newVacationForm.value.price);
  
    // Check if there is a selected image before appending it to the formData
    if (this.selectedImage) {
      formData.append('image_url', this.selectedImage.name);
    }
  
    // Set headers to allow file upload
    const headers = new HttpHeaders();
    // Note: HttpHeaders is immutable, so you should use `set` method to update headers
    headers.set('Content-Type', 'multipart/form-data');
    console.log(formData)
    this.http.post('http://localhost:4000/api/vac/addVac', formData, { headers }).subscribe(
      (res) => {
        alert('Vacation added successfully');
        console.log('Vacation added successfully');
        console.log(res);
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Failed to add vacation', error);
      }
    );
  }
}

