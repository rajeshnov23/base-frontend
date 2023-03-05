import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { UserService } from '../../crud/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;
  serviceError = 'Something went wrong, please try again.';
  serviceErrorFlag = false;
  constructor(private fb: FormBuilder, private _userService: UserService) {}

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        username: ['', [Validators.required],[this.checkIfUsernameExists()]],
        termscheck: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.checkEmailExistsOrNot()],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirm: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [this.ConfirmedValidator('password', 'password_confirm')],
      } as AbstractControlOptions
    );
  }

  // CustomUsernameValidator(control: AbstractControl) {
  //   if (control.value === 'RAVR00') {
  //     return { usernameInvalid: true };
  //   }
  //   return null;
  // }

  checkIfUsernameExists():AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this._userService.checkIfUserNameExists(control.value).pipe(map(
        (result) => {
          console.log(result)
          return result.status === "E" ? { "usernameAlreadyExists": true } : null;
        }
      ),
         catchError((err) => {
          console.log(err)
           return of({ "usernameAlreadyExists": true });
         })
      );
    };
  }

  checkEmailExistsOrNot(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this._userService.checkIfEmailExists(control.value).pipe(map(
        (result) => {
          console.log(result)
          return result.status === "E" ? { "emailAlreadyExists": true } : null;
        }
      ),
         catchError((err) => {
          console.log(err)
           return of({ "emailAlreadyExists": true });
         })
      );
    };
  }

  ConfirmedValidator(
    controlName: string,
    matchingControlName: string
  ): ValidationErrors | null {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(form: FormGroup) {
    this.regForm.markAllAsTouched();
    console.log('Valid?', form.valid); // true or false
    console.log('Username', form.value.username);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
    if (form.valid) {
      const user = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      };
      this._userService
        .postUser(user)
        .pipe(
          map((response: any) => {
            console.log('response ', response);
            return response;
          })
        )
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => {
            if (e) {
              if ('error' in e) {
                this.serviceError = e.error.error;
              }
            }
            this.serviceErrorFlag = true;
            console.error(e);
          },
          complete: () => {
            console.info('complete');
            this.regForm.reset();
          },
        });
      // this.users$ = this._userService.postUser(user);
      // console.log('users -- ', this.users$);
    }
  }
}
