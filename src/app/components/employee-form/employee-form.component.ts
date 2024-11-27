import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  template: `
    <div class="container">
      <h2>Formulario de Empleado</h2>
      
      <div *ngIf="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
      
      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
        <div class="form-group">
          <label for="nombre_usuario">Nombre de Usuario:</label>
          <input type="text" 
                 id="nombre_usuario" 
                 class="form-control" 
                 [(ngModel)]="employee.nombre_usuario" 
                 name="nombre_usuario" 
                 required
                 #nombre="ngModel">
          <div *ngIf="nombre.invalid && (nombre.dirty || nombre.touched) && !successMessage" class="text-danger">
            El nombre es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="puesto">Puesto:</label>
          <input type="text" 
                 id="puesto" 
                 class="form-control" 
                 [(ngModel)]="employee.puesto" 
                 name="puesto" 
                 required
                 #puesto="ngModel">
          <div *ngIf="puesto.invalid && (puesto.dirty || puesto.touched) && !successMessage" class="text-danger">
            El puesto es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="lugar_trabajo">Lugar de Trabajo:</label>
          <input type="text" 
                 id="lugar_trabajo" 
                 class="form-control" 
                 [(ngModel)]="employee.lugar_trabajo" 
                 name="lugar_trabajo" 
                 required
                 #lugar="ngModel">
          <div *ngIf="lugar.invalid && (lugar.dirty || lugar.touched) && !successMessage" class="text-danger">
            El lugar de trabajo es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="valor">Valor:</label>
          <input type="number" 
                 id="valor" 
                 class="form-control" 
                 [(ngModel)]="employee.valor" 
                 name="valor" 
                 required
                 #valor="ngModel">
          <div *ngIf="valor.invalid && (valor.dirty || valor.touched) && !successMessage" class="text-danger">
            El valor es requerido
          </div>
        </div>

        <button type="submit" 
                class="btn btn-primary" 
                [disabled]="!employeeForm.form.valid || isSubmitting">
          {{ isSubmitting ? 'Agregando...' : 'Agregar Empleado' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 20px auto; padding: 20px; }
    .form-group { margin-bottom: 15px; }
    .alert { padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; }
    .alert-success { background-color: #dff0d8; border-color: #d6e9c6; color: #3c763d; }
    .alert-danger { background-color: #f2dede; border-color: #ebccd1; color: #a94442; }
    .text-danger { color: #dc3545; font-size: 0.875em; margin-top: 0.25rem; }
  `]
})
export class EmployeeFormComponent {
  @ViewChild('employeeForm') employeeForm!: NgForm;

  employee = {
    nombre_usuario: '',
    puesto: '',
    lugar_trabajo: '',
    valor: null
  };

  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(private employeeService: EmployeeService) {}

  onSubmit() {
    if (this.employeeForm.valid) {
      this.successMessage = '';
      this.errorMessage = '';
      this.isSubmitting = true;

      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          this.successMessage = 'Empleado agregado exitosamente';
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.isSubmitting = false;
        }
      });
    }
  }

  private resetForm() {
    this.employee = {
      nombre_usuario: '',
      puesto: '',
      lugar_trabajo: '',
      valor: null
    };
    
    // Resetear el formulario y sus estados
    if (this.employeeForm) {
      this.employeeForm.resetForm(this.employee);
    }

    // Establecer un temporizador para limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}