import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BudgetComponent} from './budget/budget.component';
import {IncomeComponent} from './budget/income/income.component';
import {ExpenseComponent} from './budget/expense/expense.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    IncomeComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
