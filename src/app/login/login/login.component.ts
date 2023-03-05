import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/crud/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  regForm!: FormGroup;
  serviceError = 'Something went wrong, please try again.';
  serviceErrorFlag = false;
  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit(): void {
    this.regForm = this.fb.group(
      {
        username: ['', [Validators.required]],

        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    );
  }

  onSubmit(form: FormGroup) {
    this.regForm.markAllAsTouched();
    console.log('Valid?', form.valid); // true or false
    console.log('Username', form.value.username);
    console.log('Password', form.value.password);
    this.regForm.reset();
  }

}
