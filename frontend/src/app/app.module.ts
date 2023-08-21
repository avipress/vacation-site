import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AddVacationComponent } from './pages/add-vacation/add-vacation.component';
import { MenuComponent } from './Layout/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditVacComponent } from './pages/edit-vac/edit-vac.component';
import { ListComponent } from './pages/vacations-list/list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VacReportsComponent } from './pages/vac-reports/vac-reports.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilteredListComponent } from './pages/vacations-list/filtered-list/filtered-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignUpComponent,
    ListComponent,
    HeaderComponent,
    FooterComponent,
    AddVacationComponent,
    MenuComponent,
    UsersListComponent,
    Page404Component,
    EditVacComponent,
    VacReportsComponent,
    FilteredListComponent,
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatDatepickerModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
