import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AddVacationComponent } from './pages/add-vacation/add-vacation.component';
import { MyAuthGuard } from './Service/authguard';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditVacComponent } from './pages/edit-vac/edit-vac.component';
import { ListComponent } from './pages/vacations-list/list.component';
import { VacReportsComponent } from './pages/vac-reports/vac-reports.component';
import { FilteredListComponent } from './pages/vacations-list/filtered-list/filtered-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'list', component: ListComponent,canActivate: [MyAuthGuard] },
  { path: 'addVac', component: AddVacationComponent,canActivate: [MyAuthGuard]},
  { path: 'userList', component: UsersListComponent ,canActivate: [MyAuthGuard]},
  { path: 'vacations', component: AddVacationComponent ,canActivate: [MyAuthGuard]},
  { path: 'vac/:id', component: EditVacComponent ,canActivate: [MyAuthGuard]},
  { path: 'reports', component: VacReportsComponent ,canActivate: [MyAuthGuard]},
  { path: 'filtered-list', component: FilteredListComponent ,canActivate: [MyAuthGuard]},
  { path: '**', pathMatch: 'full', component: Page404Component, canActivate: [MyAuthGuard]},



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
