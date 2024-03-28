// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ImageScannerApiService {

//   private apiUrl = 'https://ai.smartpaperapi.com/scan/form/image';
//   private apiKey = '10b3213a34ef-46b5-829e-56768d30a6fb'; 

//   constructor(private http : HttpClient) { }
  
//   sendData(imageBytes: ArrayBuffer): Observable<any> {
//     const formData = new FormData();
//     const formName = 'api_form_v1';

//     const formImage = new Blob([imageBytes], { type: 'image/jpeg' });
//     formData.append('formName', formName);
//     formData.append('formImage', formImage);
//     formData.append('metadata', '{}'); // string[optional], returned back as is when used
//     formData.append('realTimeRespType', 'simpleKeyValue');

//     return this.http.post(this.apiUrl, formData, {
//       headers: {
//         'x-api-key': this.apiKey, 
//       },
//     });
//   } 
// }

/////////////////////////////////////////////
//this code is taking compressed image and sending it to server..to http post for gettting json format

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageScannerApiService {
  private apiUrl = 'https://ai.smartpaperapi.com/scan/form/image';
  private apiKey = '10b3213a34ef-46b5-829e-56768d30a6fb';

  constructor(private http: HttpClient) {}

  sendData(compressedBase64: string): Observable<any> {
    // Convert the base64 string back to a Uint8Array
    const byteCharacters = atob(compressedBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
  
    const formData = new FormData();
    const formName = 'api_form_v1';
  
    formData.append('formName', formName);
    formData.append('formImage', new Blob([byteArray], { type: 'image/jpeg' }), 'compressed_image.jpg');
    formData.append('metadata', '{}');
    formData.append('realTimeRespType', 'simpleKeyValue');
  
    //console.log('Before sendData:', compressedBase64);
    return this.http.post(this.apiUrl, formData, {
      headers: {
        'x-api-key': this.apiKey,
      },
    });
  }
  
  
}
