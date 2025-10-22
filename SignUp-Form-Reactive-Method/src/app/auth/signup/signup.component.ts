import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// // check if the passwords are equal
// function equalValues(control: AbstractControl) {
//   const password = control.get('password')?.value; // 'password' is the name of the control
//   const confirmPassword = control.get('confirmPassword')?.value;

//   if (password === confirmPassword) {
//     return null;
//   }

//   return { passwordsNotEqual: true };
// }

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value; // 'password' is the name of the control
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

// shortcuts
// formGroupName="password" ===  [formGroup]="form.controls.password"
// formControlName="email" === [formControl]= "form.controls.email"

//-------------------------------------------------
export class SignupComponent {
  form = new FormGroup({
    // email control
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),

    // put the two passwords together --> formGroup ... like the overall (or the main) formGroup above. (also add formGroup directive to the parent html (the html that contains both) --> line 10 --> <div class="control-row" formGroupName="password">)
    passwords: new FormGroup(
      {
        // password control
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),

        // confirmPassword control
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),

    // firstName control
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),

    // lastName control
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),

    // address formGroup (street,number,postalCode and city) --> <fieldset formGroupName="address">
    address: new FormGroup({
      // street control
      street: new FormControl('', {
        validators: [Validators.required],
      }),

      // number control
      number: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      }),

      // postalCode control
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),

      // city control
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),

    // role control
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),

    // How did you find us?  --> here we can look at it as multi choices for one input.
    source: new FormArray([
      // here we have overall array named 'source' contains FormControls but without names.  --> <fieldset formArrayName="source">
      new FormControl(false), // formControlName="0"
      new FormControl(false), // formControlName="1"
      new FormControl(false), // formControlName="2" and so on (since it's array) ... this applied in the template (html)
    ]),

    // agree control
    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      // one invalid field make the overall form invalid
      console.log('INVALID FORM!');
      return;
    }

    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
