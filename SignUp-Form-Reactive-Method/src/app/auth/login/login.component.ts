import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs'; // 'of' produces an observable that's instantly emit a value

// create custom validator ... and then attach it to the validators array
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

// create async validator ... and then attach it to the asyncValidators array ... in this example this function is just for dummy purpose and consider this email 'test@example.com' is not a valid email address
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // in the template driven was 'FormsModule'
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Reactive form steps
  // 1- setup the form on your own using the typescript code
  // 2- let the angular know how this form is connected to the actual template

  private destroyRef = inject(DestroyRef);

  // 1- setup the form on your own using the typescript code
  // Since its reactive then we make our formGroup object on our own. In the template driven was '#form'
  form = new FormGroup({
    // In template driven the validators was by for example put 'required' in the template as this (<input id="email" type="email" name="email" ngModel required email #email="ngModel" />)
    // In reative email: new FormControl('',[]) here [] (array of validators) or alternatively an {} object ( FormControl('',{}) ) as shown below

    email: new FormControl('', {
      validators: [Validators.email, Validators.required], // [] array of validators ... here for exmple 'Validators.email' => means angular will check if the entered is a valid email address. and 'Validators.required' to check if not empty and so on.

      // async Validators
      asyncValidators: [emailIsUnique],
    }), // initial value empty (we also can leave it as this FormControl())
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark, // here the function is passed not executed ( mustContainQuestionMark() )
      ],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);

      //this.form.controls.email.setValue(loadedForm) // alternative way instead of 'setValue' but both the same
      // or when using reactive there is also an alternative as shown below
      this.form.patchValue({
        email: loadedForm.email,
      });
    }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    //this.form.value.email;
    //console.log(this.form);

    // this.form.value.email  // this was not not accessable in template driven ... the value was of type 'any' because typescript was not know which type of forms we have
    // this.form.controls.email

    const enteredEmail = this.form.value.email; // this now is easy than template driven
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }
}
