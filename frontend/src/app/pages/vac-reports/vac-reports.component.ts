
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { FollowersService } from 'src/app/Service/followers.service';

@Component({
  selector: 'app-vac-reports',
  templateUrl: './vac-reports.component.html',
  styleUrls: ['./vac-reports.component.css']
})
export class VacReportsComponent implements OnInit {
  public chart: Chart;
  public totalFollows: any[] = [];

  constructor(private followersService: FollowersService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.followersService.getTotalFollowVac().subscribe(
      (data: any) => {
        this.totalFollows = data as any[]; // Type assertion to explicitly specify the data type as an array
        this.createChart();
      },
      
      (error: any) => {
        console.error('Error fetching total follows data:', error);
      }
    );
  }

  createChart() {
    const vacationIds = this.totalFollows.map((follow) => follow.destination);
    const totalCounts = this.totalFollows.map((follow) => follow.total);

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: vacationIds,
        datasets: [
          {
            label: 'Total Follows',
            data: totalCounts,
            backgroundColor: 'DarkBlue'
          }
        ]
      },
      options: {
        responsive: true, 
        aspectRatio: 2.5
      }
    });
  }

  downloadCSV() {
    const csvContent = this.convertToCSV(this.totalFollows);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute('download', 'reports.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(data: any[]) {
    const header = [' destination', 'Total'];
    const rows = data.map((item) => [item.destination, item.total]);
    const csvRows = [header, ...rows].map((row) => row.join(','));

    return csvRows.join('\n');
  }
}
