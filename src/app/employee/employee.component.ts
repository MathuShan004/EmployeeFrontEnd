import { Component, OnInit } from '@angular/core';
import { employee } from '../model/employee';
import { EmployeeSevService } from '../service/employeeSev.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

// tslint:disable-next-line:no-unused-expression
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeSevService , private formbulider: FormBuilder) {
   }
  employeeIdUpdate = null;
  massage = null;
  dataSaved = false;
  employeeForm: any;
  data?: employee[];
  ngOnInit() {
    this.viewEmployess();
  }
  viewEmployess() {
    this.employeeService.getAllEmployeeDetails().subscribe(
      (response: employee[]) => {
        this.data = response;
        this.employeeService.storeDate = this.data;
});
  }
  loadEmployeeToEdit(employeeId: string) {
    // tslint:disable-next-line:no-shadowed-variable
    this.employeeService.getEmployeeById(employeeId).subscribe( employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmpId;
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['Address'].setValue(employee.Address);
      // tslint:disable-next-line:no-string-literal
      this.employeeForm.controls['PinCode'].setValue(employee.Position);
    });
  }
 createEmployee(emp: employee) {
  if (this.employeeIdUpdate == null) {
    if (confirm(' Are you sure you want to delete this ?')) {
      this.employeeService.createEmployee(emp).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.viewEmployess();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    }
  } else {
    emp.EmpId = this.employeeIdUpdate;
    if (confirm(' Are you sure you want to delete this ?')) {
      this.employeeService.updateEmployee(emp).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record Updated Successfully';
          this.viewEmployess();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
        }
      );
    }
  }
 }
 deleteEmployee(employeeId: string) {
  if (confirm('Are you sure you want to delete this ?')) {
  this.employeeService.deleteEmployee(employeeId).subscribe(() => {
    this.dataSaved = true;
    this.massage = 'Record Deleted Succefully';
    this.viewEmployess();
    this.employeeIdUpdate = null;
    this.employeeForm.reset();

  });
}
}
 resetForm() {
  this.employeeForm.reset();
  this.massage = null;
  this.dataSaved = false;
}
onFormSubmit() {
  this.dataSaved = false;
  // tslint:disable-next-line:no-shadowed-variable
  const employee = this.employeeForm.value;
  this.createEmployee(employee);
  this.employeeForm.reset();
}
}
