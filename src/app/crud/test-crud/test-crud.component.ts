import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-test-crud',
  templateUrl: './test-crud.component.html',
  styleUrls: ['./test-crud.component.scss'],
})
export class TestCrudComponent implements OnInit {
  myForm!: FormGroup;
  public users$!: Observable<any[]>;

  constructor(private fb: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    this.myForm.markAllAsTouched();
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
    // if (form.valid) {
    //   const user = {
    //     name: form.value.name,
    //     email: form.value.email,
    //     message: form.value.message,
    //   };
    //   this._userService
    //     .postUser(user)
    //     .pipe(
    //       map((response: any) => {
    //         console.log('response ', response);
    //         return response;
    //       })
    //     )
    //     .subscribe({
    //       next: (v) => console.log(v),
    //       error: (e) => console.error(e),
    //       complete: () => {
    //         console.info('complete')
    //         this.myForm.reset();
    //       },
    //     });
    //   // this.users$ = this._userService.postUser(user);
    //   // console.log('users -- ', this.users$);
    // }

  }
}
