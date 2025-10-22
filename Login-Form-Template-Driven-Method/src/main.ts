import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// There are two main ways of handling Forms
// 1- Template-driven: Setting up forms via component templates (Easy to get started , but implementing more complex logic & forms can be tricky)
// 2- Reactive Forms: Setting up forms via typescript code and then link that to the template elements (Setup requires more verbose code , but handling more complex forms can be easier)
