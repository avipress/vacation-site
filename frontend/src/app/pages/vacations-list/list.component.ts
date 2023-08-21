import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import vacations from 'src/app/model/vac';
import { FollowersService } from 'src/app/Service/followers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  allVacData: vacations[];
  followedItems: any[] = [];
  role_type: string;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  displayedVacData: vacations[] = [];
  defaultHeartColor: string = 'grey';
  showFollowingVacations: boolean = false;
  showUpcomingVacations: boolean = false;
  showFiltered: boolean = false;
  activeButton: string = ''; // Add this property and initialize it to an empty string
  showActiveVacations: boolean;
  clickedButtons: string[] = [];
  displayedVacations: any[] = []; // Will hold the filtered vacations
  selectedFile: File | null = null;
// Inside the ListComponent class


  constructor(
    private http: HttpClient,
    private router: Router,
    private followersService: FollowersService,
    private cdr: ChangeDetectorRef
  ) {
    this.displayedVacData = []; 
    this.allVacData = [];

  }
  ngOnInit(): void {
    const storedItems = localStorage.getItem('userData');
    if (storedItems) {
      this.followedItems = JSON.parse(storedItems);
    }else {
      // If no data in localStorage, initialize followedItems as an empty array
      this.followedItems = [];
    }
    console.log('Followed Items:', this.followedItems); 
    this.showFollowingVacations = this.followedItems.length === 0;
    this.showUpcomingVacations = false;
    this.showActiveVacations = false;
    this.getAllVacData(); // Fetch all data here
    this.fetchFollowedVacations();

  }
  
  fetchFollowedVacations(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.role_type = JSON.parse(userData).role_type;
      const userId = JSON.parse(userData).id;
      const url = `http://localhost:4000/api/following/${userId}`;
      
      const storedFollowedItems = localStorage.getItem('followedItem');
      if (storedFollowedItems) {
        this.followedItems = JSON.parse(storedFollowedItems);
        this.getAllVacData(); // Call this function after fetching the follower data from localStorage
        console.log(storedFollowedItems);
      } else {
        this.http.get<any[]>(url).subscribe(
          (data: any[]) => {
            const newFollowedItems = data.map(item => item.vacation_id); // Assuming the follower data contains the vacation IDs as "vacation_id"
            localStorage.setItem('userData', JSON.stringify(newFollowedItems)); // Save the followerData in localStorage
    
            const user = JSON.parse(userData);
            user.followedItems = newFollowedItems; // Set the new array in the userData
            localStorage.setItem('userData', JSON.stringify(user)); // Update the userData in localStorage
    
            this.followedItems = newFollowedItems; // Update the component's followedItems array
            console.log('Data from FOLLOWING:', this.followedItems);
            this.getAllVacData(); 
            // Call this function after fetching the follower data
  
          },
          (error) => {
            console.error('Error occurred while fetching FOLLOWING data:', error);
            this.getAllVacData(); // Call this function even if there's an error in fetching follower data
          }
        );
      }
    } else {
      this.getAllVacData();
      // Call this function if there is no userData
    }
  }
  
  filterFollowedItems(): void {
    this.activeButton = 'showAll';
    this.showFollowingVacations = !this.showFollowingVacations;
    // Disable other buttons when one is clicked
    this.showUpcomingVacations = false;
    this.showActiveVacations = false;
  
    // Update the displayed data based on the current filter settings
    this.updateDisplayedVacData();
  }
  
  filterUpcomingVacations(): void {
    this.activeButton = 'showUpcoming';
    this.showUpcomingVacations = !this.showUpcomingVacations;
  
    // Add the name of the clicked button to the clickedButtons array
    if (this.showUpcomingVacations) {
      this.clickedButtons.push('Show Upcoming Vacations');
      this.showFollowingVacations = false; // Disable other buttons when one is clicked
      this.showActiveVacations = false;
  
      // Apply the filtering logic
      this.updateDisplayedVacData();
    } else {
      // Remove the name from the clickedButtons array if the button is unclicked
      this.clickedButtons = this.clickedButtons.filter(name => name !== 'Show Upcoming Vacations');
    }
  }
  filterActiveVacations(): void {
    this.activeButton = 'showActive';
    this.showActiveVacations = !this.showActiveVacations;
  
    // Add the name of the clicked button to the clickedButtons array
    if (this.showActiveVacations) {
      this.clickedButtons.push('Show Active Vacations');
      this.showFollowingVacations = false; // Disable other buttons when one is clicked
      this.showUpcomingVacations = false;
  
      // Apply the filtering logic
      this.updateDisplayedVacData();
    } else {
      // Remove the name from the clickedButtons array if the button is unclicked
      this.clickedButtons = this.clickedButtons.filter(name => name !== 'Show Active Vacations');
    }
  }

  isVacationActive(vacation: vacations): boolean {
    const currentDate = new Date().getTime();
    const [day, month, year] = vacation.start_date.split('.');
    const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();

    const [endDay, endMonth, endYear] = vacation.end_date.split('.');
    const endDate = new Date(Number(endYear), Number(endMonth) - 1, Number(endDay)).getTime();

    return startDate <= currentDate && endDate >= currentDate;
  }
  getCurrentActiveVacations(): vacations[] {
    const currentDate = new Date().getTime();
    return this.allVacData.filter(vacation => this.isVacationActive(vacation));
  }
  

  getUpcomingVacations(): vacations[] {
    const currentDate = new Date().getTime();
    return this.allVacData.filter((vacation) => {
      const [day, month, year] = vacation.start_date.split('.');
      const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      return startDate > currentDate;
    });
  }

  getAllVacData(): void {
    const apiUrl = 'http://localhost:4000/api/vac/getAllVac';
    this.http.get<any[]>(apiUrl).subscribe(
      (data: any[]) => {
        this.allVacData = data;

        this.allVacData.sort((a, b) => {
          return this.compareDates(a.start_date, b.start_date);
        });

        // Convert dates to dd.mm.yyyy format
        this.allVacData.forEach(vacation => {
          vacation.start_date = this.convertToDateWithDots(vacation.start_date);
          vacation.end_date = this.convertToDateWithDots(vacation.end_date);
        });

        this.totalItems = this.allVacData.length;
        this.updateDisplayedVacData();

      },
      
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }
  
  compareDates(date1: string, date2: string): number {
    const [day1, month1, year1] = date1.split('.');
    const [day2, month2, year2] = date2.split('.');
    
    const dateObj1 = new Date(Number(year1), Number(month1) - 1, Number(day1));
    const dateObj2 = new Date(Number(year2), Number(month2) - 1, Number(day2));
  
    if (dateObj1.getTime() < dateObj2.getTime()) {
      return -1;
    } else if (dateObj1.getTime() > dateObj2.getTime()) {
      return 1;
    } else {
      return 0;
    }
  }
  convertToDateWithDots(dateString: string): string {
    // Assuming the input date string is in the format "yyyy-mm-dd"
    const [year, month, day] = dateString.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }
  

  updateDisplayedVacData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    let filteredData: vacations[] = [];
  
    if (this.showFollowingVacations) {
      // Filter vacations that are being followed by the user
      filteredData = this.allVacData.filter(vacation => this.followedItems.includes(vacation.id));
    } else if (this.showUpcomingVacations) {
      const currentDate = new Date().getTime();
      filteredData = this.allVacData.filter(vacation => {
        const [day, month, year] = vacation.start_date.split('.');
        const startDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
        return startDate > currentDate;
      });
    } else if (this.showActiveVacations) {
      filteredData = this.allVacData.filter(vacation => this.isVacationActive(vacation));
    } else {
      // Show all vacations if no filter is active
      filteredData = this.allVacData;
    }
  
    this.displayedVacData = filteredData.slice(startIndex, endIndex);
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
    return Math.ceil(this.totalItems / this.itemsPerPage);
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
  isFollowActionInProgress: boolean = false; // Add this property to track the follow/unfollow operation status

// Inside the ListComponent class

// Add or update the getHeartIconColor function to check the isFollowed property of the vacation item
getHeartIconColor(item: vacations): boolean {
  // Check if the item's ID is present in the followedItems array
  return this.followedItems.includes(item.id);
}


// Modify the followItem function to correctly toggle the isFollowed property of the vacation item
followItem(itemId: number): void {
  if (this.isFollowActionInProgress) {
    // If a follow/unfollow action is already in progress, do nothing
    return;
  }

  this.isFollowActionInProgress = true; // Set the flag to indicate that a follow/unfollow action is in progress

  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    const followedItems = user.followedItems || [];
    const itemIndex = followedItems.indexOf(itemId);

    if (itemIndex > -1) {
      // If already followed, unfollow the item
      followedItems.splice(itemIndex, 1);
      this.followersService.deleteFollow(user.id, itemId).subscribe(
        () => {
          console.log(`Unfollowed vacation with ID ${itemId}`);
          user.followedItems = followedItems;
          localStorage.setItem('userData', JSON.stringify(user));
          this.isFollowActionInProgress = false; // Reset the flag after the action is completed

          // Toggle the isFollowed property of the vacation item to false
          const indexInDisplayedData = this.displayedVacData.findIndex((item) => item.id === itemId);
          if (indexInDisplayedData > -1) {
            this.displayedVacData[indexInDisplayedData].isFollowed = false;
          }
          this.fetchFollowedVacations();

        },
        (error) => {
          console.error(`Error unfollowing vacation ${itemId}:`, error);
          this.isFollowActionInProgress = false; // Reset the flag even if there's an error
        }
      );
    } else {
      // If not followed, follow the item
      if (!followedItems.includes(itemId)) { // Check if the vacation ID is not already in the array
        followedItems.push(itemId);
        this.followersService.addFollow(user.id, itemId).subscribe(
          () => {
            console.log(`Followed vacation with ID ${itemId}`);
            user.followedItems = followedItems;
            localStorage.setItem('userData', JSON.stringify(user));
            this.isFollowActionInProgress = false; // Reset the flag after the action is completed

            // Toggle the isFollowed property of the vacation item to true
            const indexInDisplayedData = this.displayedVacData.findIndex((item) => item.id === itemId);
            if (indexInDisplayedData > -1) {
              this.displayedVacData[indexInDisplayedData].isFollowed = true;
            }       
            this.fetchFollowedVacations();

          },
          (error) => {
            console.error(`Error following vacation ${itemId}:`, error);
            this.isFollowActionInProgress = false; // Reset the flag even if there's an error
          }
        );
      }
    }
  }
}


  removeVac(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this vacation?');
    if (confirmDelete) {
      const apiUrl = `http://localhost:4000/api/vac/deleteVac/${id}`;
      this.http.delete(apiUrl).subscribe(
        () => {
          console.log(`Vacation with ID ${id} removed successfully.`);
          this.allVacData = this.allVacData.filter((item) => item.id !== id);
          this.followersService.deleteFollow(id, id).subscribe(
            () => {
              console.log(`Unfollowed vacation with ID ${id}`);
              this.updateDisplayedVacData(); 
              this.router.navigate(['/list']);
            },
            (error) => {
              console.error(`Error occurred while unfollowing vacation with ID ${id}:`, error);
            }
          );
        },
        (error) => {
          console.error(`Error occurred while deleting vacation with ID ${id}:`, error);
        }
      );
    }
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

  editVacation(id: number): void {
    this.getVacById(id);
    this.router.navigate(['/vac', id]); // Pass the ID as a route parameter
  };

  toggleFilter(filterType: string): void {
    if (this.activeButton === filterType) {
      this.activeButton = ''; // If the same button is clicked again, deactivate it
    } else {
      this.activeButton = filterType; // Otherwise, activate the clicked button
    }
  
    // Now, based on the activeButton value, apply the appropriate filtering logic
    switch (this.activeButton) {
      
      case 'showUpcoming':
        this.showUpcomingVacations = !this.showUpcomingVacations;
        break;
      case 'showAll':
        this.showFollowingVacations = !this.showFollowingVacations;
        break;
      case 'showActive':
        this.showActiveVacations = !this.showActiveVacations;
        break;
      default:
        // When no button is active, reset the filter states and show followed vacations by default
        this.showFollowingVacations = false;
        this.showUpcomingVacations = false;
        this.showActiveVacations = false;
    }
  
    // Apply the filtering logic based on the filter states
    this.updateDisplayedVacData();
  }
}  

