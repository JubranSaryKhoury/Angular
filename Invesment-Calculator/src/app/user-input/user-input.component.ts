import { Component, EventEmitter, Output, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import type { InvestmentInput } from '../investment-input.model';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  //@Output() calculate = new EventEmitter<InvestmentInput>();
  //calculate = output<InvestmentInput>(); // We used this oputput instead of the above to be clear which kind of data will be emitted.

  constructor(private investmentService: InvestmentService) {}

  enteredInitalInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');
  onSumbit() {
    // console.log('SUBMITTED!');
    // console.log(this.enteredInitalInvestment);
    // console.log(this.enteredAnnualInvestment);
    // console.log(this.enteredExpectedReturn);
    // console.log(this.enteredDuration);

    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.enteredInitalInvestment(),
      duration: +this.enteredDuration(),
      expectedReturn: +this.enteredExpectedReturn(),
      annualInvestment: +this.enteredAnnualInvestment(),
    });

    // this.calculate.emit({
    //   initialInvestment: +this.enteredInitalInvestment(),
    //   duration: +this.enteredDuration(),
    //   expectedReturn: +this.enteredExpectedReturn(),
    //   annualInvestment: +this.enteredAnnualInvestment(),
    // });

    this.enteredInitalInvestment.set('0'); // reset them back to initial value's after submit the form ... with help of signals(the signal way of reseting the value's)
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }
}
