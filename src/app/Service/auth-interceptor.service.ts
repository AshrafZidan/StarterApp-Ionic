import { Storage } from '@ionic/storage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          if (req.url.toString().indexOf('/login') !== -1 || req.url.toString().indexOf('/createnewUser') !== -1 ) {
              return next.handle(
                req.clone({})
              );
            }
          return next.handle(
                req.clone({
                  headers: req.headers.append('x-auth-token', JSON.parse(localStorage.getItem('user')).token )}));
    }
}

// import { Injectable } from '@angular/core';

// import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService implements HttpInterceptor {

//   constructor() { 
//       debugger;
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(
//       req.clone({
//         headers: req.headers.append('Authorization', 'Bearer THIS_IS_THE_ACCESS_TOKEN')
//       })
//     );
//   }

// }