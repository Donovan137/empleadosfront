import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://empleadosback.vercel.app/api/employees';

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

    if (!navigator.onLine) {
      errorMessage = 'No hay conexión a internet';
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar al servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:3000';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status}\nMensaje: ${error.error?.message || error.message}`;
    }

    return throwError(() => errorMessage);
  }
}