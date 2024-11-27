import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://empleadosback.vercel.app/api/empleados/';

  constructor(private http: HttpClient) {}

  addEmployee(employee: any): Observable<any> {
    const transformedEmployee = {
      username: employee.nombre_usuario,
      position: employee.puesto,
      workplace: employee.lugar_trabajo,
      value: Number(employee.valor)
    };

   
    return this.http.post(this.apiUrl, transformedEmployee).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';

    console.log('Error completo:', error);

    if (!navigator.onLine) {
      errorMessage = 'No hay conexión a internet';
    } else if (error.status === 0) {
      errorMessage = `No se puede conectar al servidor. 
        URL intentada: ${error.url}
        Estado: ${error.statusText}`;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status}
        Mensaje: ${error.error?.message || error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}