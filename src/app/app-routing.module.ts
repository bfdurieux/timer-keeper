import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeReportComponent } from './view-components/time-report/time-report.component';

const routes: Routes = [
  { path: 'report', component: TimeReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
