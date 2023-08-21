import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FollowersService } from 'src/app/Service/followers.service';

@Component({
  selector: 'app-filtered-list',
  templateUrl: './filtered-list.component.html',
  styleUrls: ['./filtered-list.component.css']
})
export class FilteredListComponent implements OnInit {
  followerData: any[] = [];
  allVacData: any[] = [];
  displayedVacData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  role_type: string;
  filteredVacData: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private FollowersService:FollowersService
  ) {}

  ngOnInit(): void {
    this.role_type = this.getUserRole() || ''; 
    const storedItems = localStorage.getItem('followedItems');
    if (storedItems) {
      this.followerData = JSON.parse(storedItems);
    }
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user_id = JSON.parse(userData).id;
      const url = `http://localhost:4000/api/following/${user_id}`;
      this.http.get<any[]>(url).subscribe(
        (data: any[]) => {
          this.followerData = data;
          console.log('Data from FOLLOWING:', this.followerData);
          this.getAllVacData(); // Call this function after fetching the follower data
        },
        (error) => {
          console.error('Error occurred while fetching FOLLOWING data:', error);
        }
      );
    } else {
      this.getAllVacData(); // Call this function if there is no userData
    }
   
  }
  getUserRole(): string | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData).role_type;
    }
    return null;
  }
  
  getAllVacData(): void {
    const apiUrl = 'http://localhost:4000/api/vac/getAllVac';
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.allVacData = data;
        this.totalItems = data.length;
        this.filterFollowedItems(); // Call this function after fetching allVacData
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }

  filterFollowedItems(): void {
    // Filter the allVacData based on followerData
    this.filteredVacData = this.allVacData.filter((item) =>
      this.followerData.some((follower) => follower.vacation_id === item.id)
    );

    // Update displayedVacData after filtering
    this.updateDisplayedVacData();
  }

  updateDisplayedVacData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedVacData = this.filteredVacData.slice(startIndex, endIndex);

    // Check if displayedVacData has more than 10 items
    if (this.displayedVacData.length > 10) {
      this.totalItems = this.displayedVacData.length;
    } else {
      this.totalItems = this.filteredVacData.length;
    }
  }
  toggleFollow(vacationId: number): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const followedItems = user.followedItems || [];
      const isFollowed = followedItems.includes(vacationId);

      if (isFollowed) {
        user.followedItems = followedItems.filter((item: any) => item !== vacationId);
        this.http.delete(`http://localhost:4000/api/following/${user.id}/${vacationId}`).subscribe(
          () => {
            console.log(`Unfollowed vacation with ID ${vacationId}`);
            this.updateDisplayedVacData(); // Update displayedVacData after unfollowing an item
          },
          (error: any) => {
            console.error(`Error unfollowing vacation ${vacationId}:`, error);
          }
        );
      } else {
        user.followedItems = [...followedItems, vacationId];
        this.http.post(`http://localhost:4000/api/following/${user.id}/${vacationId}`, {}).subscribe(
          () => {
            console.log(`Followed vacation with ID ${vacationId}`);
            this.updateDisplayedVacData();
          },
          (error: any) => {
            console.error(`Error following vacation ${vacationId}:`, error);
          }
        );
      }
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateDisplayedVacData();
  }
  getPaginationRange(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    const totalPages = Math.ceil(this.displayedVacData.length / this.itemsPerPage);
    return this.displayedVacData.length > 10 ? 1 : totalPages;
  }

  isFollowed(vacationId: number): boolean {
    return this.followerData.some((item) => item.vacation_id === vacationId);
  }

  getFollowersCount(vacationId: number): number {
    const followers = this.followerData.filter((item) => item.vacation_id === vacationId);
    return followers.length;
  }

  followItem(itemId: number): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      const followedItems = user.followedItems || [];
      const isFollowed = followedItems.includes(itemId);

      if (isFollowed) {
        user.followedItems = followedItems.filter((item: any) => item !== itemId);
        this.FollowersService.deleteFollow(user.id, itemId).subscribe(
          () => {
            console.log(`Unfollowed vacation with ID ${itemId}`);
            this.updateDisplayedVacData(); // Update displayedVacData after unfollowing an item

          },
          (error) => {
            console.error(`Error unfollowing vacation ${itemId}:`, error);
          }
        );
      } else {
        user.followedItems = [...followedItems, itemId];
        this.FollowersService.addFollow(user.id, itemId).subscribe(
          () => {
            console.log(`Followed vacation with ID ${itemId}`);
            this.updateDisplayedVacData();
            this.router.navigate(['/filtered-list']);

          },
          (error) => {
            console.error(`Error following vacation ${itemId}:`, error);
          }
        );
      }
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

updateFollow(): void {
  const url = `http://localhost:4000/api/updatefollow`;
  const body = "updated";

  this.http.put(url, body).subscribe(
    () => {
      console.log("Follow update successful");
      this.getAllVacData(); 
    },
    (error) => {
      console.error("Error updating follow:", error);
    }
  );
}

  getVacById(id: number): void {
    const apiUrl = `http://localhost:4000/api/vac/${id}`;
    this.http.get(apiUrl).subscribe(
      (vacation) => {
        console.log(`Vacation with ID ${id}:`, vacation);
      },
      (error) => {
        console.error(`Error occurred while retrieving vacation with ID ${id}:`, error);
      }
    );
  }

  sortItemsByDate() {
    this.allVacData.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateA.getTime() - dateB.getTime();
    });
    this.updateDisplayedVacData(); 
  }
}
