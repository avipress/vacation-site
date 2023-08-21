import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditVacationService } from 'src/app/Service/editVacation.service';

@Component({
  selector: 'app-edit-vac',
  templateUrl: './edit-vac.component.html',
  styleUrls: ['./edit-vac.component.css']
})
export class EditVacComponent implements OnInit {
  editVacationForm: FormGroup;
  editVacationData: any;
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null; // Add this property to hold the selected image
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private editVacationService: EditVacationService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.editVacationForm = this.formBuilder.group({
      id: [''],
      destination: [''],
      description: [''],
      start_date: [''],
      end_date: [''],
      price: ['', [Validators.required, this.priceValidator]],
      image_url: [''],
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getVacationById(id);
      }
    });
  }
  getVacationById(id: number): void {
    const apiUrl = `http://localhost:4000/api/vac/${id}`;
    this.http.get<any>(apiUrl).subscribe(
      (vacation) => {
        this.editVacationForm.patchValue({
          id: vacation.id,
          destination: vacation.destination,
          description: vacation.description,
          start_date: this.formatDate(vacation.start_date),
          end_date: this.formatDate(vacation.end_date),
          price: vacation.price,
          image_url: `http://localhost:4000/photos/${vacation.image_url}`, // Properly construct the image URL
        });
        // Set the image preview
        this.imagePreview = `http://localhost:4000/photos/${vacation.image_url}`;
      },
      (error) => {
        console.error(`Error occurred while retrieving vacation with ID ${id}:`, error);
      }
    );
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
  priceValidator(control: AbstractControl): { [key: string]: any } | null {
    const price = control.value;
    if (price < 0 || price > 10000) {
      return { invalidPrice: true };
    }
    return null;
  }

  private formatDate(date: string): string {
    // Check if the date is in dd.MM.yyyy format
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      const parts = date.split('.');
      const formattedDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      return formattedDate.toISOString().slice(0, 10);
    }

    // If the date is already in yyyy-MM-dd format, return it as is
    return date;
  }

  editVacation(): void {
    if (this.editVacationForm.invalid) {
      return;
    }
  
    this.editVacationData = {
      id: this.editVacationForm.value.id,
      destination: this.editVacationForm.value.destination,
      description: this.editVacationForm.value.description,
      start_date: this.formatDate(this.editVacationForm.value.start_date),
      end_date: this.formatDate(this.editVacationForm.value.end_date),
      price: this.editVacationForm.value.price,
      image_url: this.editVacationForm.value.image_url,
    };
  
    console.log(this.editVacationData);
  
    this.editVacationService.editVacation(this.editVacationData).subscribe(
      (res) => {
        alert('Vacation updated');
        console.log('Vacation updated');
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error('Failed to update vacation', error);
      }
    );
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
      this.selectedFile = file;
  
      // Extract the file name from the full path and set it as img_url
      const fileName = file.name;
      this.editVacationForm.patchValue({
        image_url: `${fileName}`,
      });
    } else {
      // If no image is selected, set selectedImage to null and clear the image_url field in the form
      this.selectedImage = null;
      this.editVacationForm.patchValue({
        image_url: '',
      });
    }
  }
  
  cancelChanges(): void {
    this.router.navigate(['/list']);
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
 
  

}
