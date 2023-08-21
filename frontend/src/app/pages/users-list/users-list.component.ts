import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allVacData: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllUserData();
  }

  getAllUserData(): void {
    const apiUrl = 'http://localhost:4000/api/user/getAll';
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.allVacData = data;
        //  console.log(this.allVacData);
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }
  
removeUser(userId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this user ?');
  if (confirmDelete){
  const apiUrl = `http://localhost:4000/api/user/delete/${userId}`;
  this.http.delete(apiUrl).subscribe(
    () => {
      console.log(`User with ID ${userId} removed successfully.`);
      this.allVacData = this.allVacData.filter(item => item.id !== userId);
    },
    (error) => {
      console.error(`Error occurred while removing user with ID ${userId}:`, error);
    }
  );
  }
}
}

