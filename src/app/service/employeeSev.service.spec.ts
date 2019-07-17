/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployeeSevService } from './employeeSev.service';

describe('Service: EmployeeSev', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeSevService]
    });
  });

  it('should ...', inject([EmployeeSevService], (service: EmployeeSevService) => {
    expect(service).toBeTruthy();
  }));
});
