import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userName: string = '';
  @Output() logoutEvent = new EventEmitter<void>();

  constructor() {
    this.getUserNameFromLocalStorage();
    this.getUserDataFromLocalStorage();
  }

  getUserNameFromLocalStorage() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.hasOwnProperty('user_name')) {
        const storedUserName = userData.user_name;
        this.userName = storedUserName.charAt(0).toUpperCase() + storedUserName.slice(1);
      }
    }
  }
  
  getUserDataFromLocalStorage() {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? storedUserData.slice(1) : null;
  }

  logout() {
    const confirm = window.confirm('Are you sure you want to log out ?');
  if (confirm){
    localStorage.removeItem('userData');
    localStorage.removeItem('followedItems');
    this.logoutEvent.emit();
  }
  }
}