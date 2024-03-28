//here select img and send to server,compressed code is written not used before sending to httppost./server

// import { Component } from '@angular/core';
// import { ImageScannerApiService } from './image-scanner-api.service';
// import { NgxImageCompressService } from 'ngx-image-compress';//to compress image,library from angular

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html'
// })
// export class AppComponent {
//   title = 'app';
//   selectedImage: File | null = null;


//   constructor(
//     private imgScannerApi: ImageScannerApiService,
//     private imageCompress: NgxImageCompressService
//   ) {}

//   onFileSelected(event: any) {
//     const files = event.target.files;
//     this.selectedImage = files && files.length > 0 ? files[0] :  null;

//      // Log the original size of the image in KB
//     if (this.selectedImage) {
//       const originalSizeInBytes = this.selectedImage.size;
//       const originalSizeInKB = originalSizeInBytes / 1024;
//       console.log('Original Image Size:', originalSizeInKB.toFixed(2), 'KB');
//     }
//     // call here,if you want to compress the image here before uploading
//     this.compressImage();
//   }

//   //function to compress image
//   compressImage(): void {
//     if (this.selectedImage) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result as string;
//         this.imageCompress
//           .compressFile(base64String, -1, 60, 60)
//           .then((compressedBase64: string) => {
//             //below 4 lines code only to check size of img after compress
//             const compressedSizeInBytes = compressedBase64.length;
//             const compressedSizeInKB = compressedSizeInBytes / 1024;
//             console.log('Compressed Image Size:', compressedSizeInKB.toFixed(2), 'KB');
//            // console.log('Compressed Image:', compressedBase64);
//           })
//           .catch((error) => {
//             console.error('Image Compression Error:', error);
//           });
//       };
//       reader.readAsDataURL(this.selectedImage);
//     }
//   }

//   onUpload(): void {
//     if (this.selectedImage) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageBytes = reader.result as ArrayBuffer;
        
//         this.imgScannerApi.sendData(imageBytes).subscribe({
//           next: (response) =>{
//             console.log('API Response:', response);
//           },
//          error : (error) => {
//             console.error('API Error:', error);
//           },
//         });
//       };
//       reader.readAsArrayBuffer(this.selectedImage);
//     }
//   }
// }

//////////////////////////////////////////////////
//this code is for 1st-select img,here compressed and upload function is combined, send it to service for http post.
//here getting api response before click on upload function

// import { Component } from '@angular/core';
// import { ImageScannerApiService } from './image-scanner-api.service';
// import { NgxImageCompressService } from 'ngx-image-compress';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html'
// })
// export class AppComponent {
//   title = 'app';
//   selectedImage: File | null = null;

//   constructor(
//     private imgScannerApi: ImageScannerApiService,
//     private imageCompress: NgxImageCompressService
//   ) {}

//   onFileSelected(event: any) {
//     const files = event.target.files;
//     this.selectedImage = files && files.length > 0 ? files[0] : null;

//     if (this.selectedImage) {
//       const originalSizeInBytes = this.selectedImage.size;
//       const originalSizeInKB = originalSizeInBytes / 1024;
//       console.log('Original Image Size:', originalSizeInKB.toFixed(2), 'KB');

//       this.compressAndUpload();
//     }
//   }

//   compressAndUpload(): void {
//     if (this.selectedImage) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result as string;
//         this.imageCompress
//           .compressFile(base64String, -1, 60, 60)
//           .then((compressedBase64: string) => {
//             // Now you can use compressedBase64 as a base64 string
//             const compressedSizeInBytes = compressedBase64.length;
//            // console.log('Compressed Image Size:', compressedSizeInBytes);
//             const compressedSizeInKB = compressedSizeInBytes / 1024;
//             console.log('Compressed Image Size:', compressedSizeInKB.toFixed(2), 'KB');
  
//             // Call your API service here to send the compressed image
//             this.imgScannerApi.sendData(compressedBase64.split(',')[1]).subscribe({
//               next: (response) => {
//                 console.log('API Response:', response);
//               },
//               error: (error) => {
//                 console.error('API Error:', error);
//               },
//             });
//           })
//           .catch((error) => {
//             console.error('Image Compression Error:', error);
//           });
//       };
//       reader.readAsDataURL(this.selectedImage);
//     }
//   }
  
// }

//////////////////////////////////////////////////////////////////
//seperate compress function and upload function
import { Component } from '@angular/core';
import { ImageScannerApiService } from './image-scanner-api.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  selectedImage: File | null = null;
  compressedBase64: string | null = null;

  constructor(
    private imgScannerApi: ImageScannerApiService,
    private imageCompress: NgxImageCompressService
  ) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedImage = files && files.length > 0 ? files[0] : null;

    if (this.selectedImage) {
      const originalSizeInBytes = this.selectedImage.size;
      const originalSizeInKB = originalSizeInBytes / 1024;
      console.log('Original Image Size:', originalSizeInKB.toFixed(2), 'KB');
      this.compressImage();
    }
  }

  compressImage(): void {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imageCompress
          .compressFile(base64String, -1, 60, 60)
          .then((compressedBase64: string) => {
            const compressedSizeInBytes = compressedBase64.length;
            const compressedSizeInKB = compressedSizeInBytes / 1024;
            console.log('Compressed Image Size:', compressedSizeInKB.toFixed(2), 'KB');
            this.compressedBase64 = compressedBase64;
          })
          .catch((error) => {
            console.error('Image Compression Error:', error);
          });
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onUpload(): void {
    if (this.compressedBase64) {
      console.log('Sending Compressed Image Size:', this.compressedBase64.length / 1024, 'KB');
      this.imgScannerApi.sendData(this.compressedBase64.split(',')[1]).subscribe({
        next: (response) => {
          console.log('API Response:', response);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
    }
  }
}
