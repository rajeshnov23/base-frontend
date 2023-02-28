import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
regForm!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.regForm=this.fb.group({
      username:["", Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]],
      password_confirm:["", [Validators.required, Validators.minLength(8)]]
    })
  }
  onSubmit(form: FormGroup) {
    this.regForm.markAllAsTouched();
    console.log('Valid?', form.valid); // true or false
    console.log('Username', form.value.username);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
  }
}
