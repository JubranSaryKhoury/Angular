import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // store what user entered so that it saves them if the user refresh by mistake ... I need to save what user entered live not when the form is submited ... so I need access to that form out of onSubmit.
  private form = viewChild.required<NgForm>('form'); // get hold of that form object in our template ... so I used form here as a selector to select #form="ngForm" variable and the object stored there and get access to it in my template
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm); // now this 'loadedFormData' is of { email: value.email } shape
        const savedEmail = loadedFormData.email; // access the email from the object

        setTimeout(() => {
          this.form().setValue({
            email: savedEmail,
            password: '',
          });
        }, 1); // 1ms
      }

      // 'valueChanges' give us an observalbe => we need to subscribe
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500)) // instead of storing each key stroke ==> debounceTime here is used so that this next (next: (value) =>...) is not triggered while the user is typing (triggered every key stroke)... else it will triggered if the user stops typing for a half second (500 ms) [in other words it stored what the user types when the user stopeed typing]
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            ),
        });
      this.destroyRef.onDestroy(() => subscription?.unsubscribe);
    });
  }

  onSubmit(formData: NgForm) {
    //console.log(formData);
    //console.log(formData.form); // by this on console you can see all form data (like values [email and password] ) and you can get them as shown below

    if (formData.form.invalid) {
      return;
    }

    // Extract the entred email and password ... or alternatively we can still use two way binding instead
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    // print the email and password o n the console
    console.log(enteredEmail, enteredPassword);

    // reset the form after submit it
    formData.form.reset();
  }
}
