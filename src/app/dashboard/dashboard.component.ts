import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../_services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documentsByType: any = {};
  documentsConsultedByType: any = {};
  documentsEmailedByType: any = {};
  documentsByTypeAndAgency: any = {};

  currentPage: number = 0;

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statisticsService.getDocumentsByType().subscribe(data => {
      this.documentsByType = this.transformDataForChart(data, 'Nombre de documents générés par types', 'bar');
    });

    this.statisticsService.getDocumentsConsultedByType().subscribe(data => {
      this.documentsConsultedByType = this.transformDataForChart(data, 'Nombre de documents consultés par type', 'doughnut');
    });

    this.statisticsService.getDocumentsEmailedByType().subscribe(data => {
      this.documentsEmailedByType = this.transformDataForChart(data, 'Nombre de documents envoyés par mail / par type', 'pie');
    });

    this.statisticsService.getDocumentsByTypeAndAgency().subscribe(data => {
      this.documentsByTypeAndAgency = this.transformNestedDataForChart(data, 'Nombre de documents par type/agence', 'line');
    });

    this.showPage(this.currentPage);
  }

  showPage(pageIndex: number) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
      if (index === pageIndex) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
  }

  nextPage() {
    const pages = document.querySelectorAll('.page');
    if (this.currentPage < pages.length - 1) {
      this.currentPage++;
      this.showPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.showPage(this.currentPage);
    }
  }

  transformDataForChart(data: any, title: string, chartType: 'bar' | 'doughnut' | 'pie' | 'line') {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Count',
          data: Object.values(data),
          backgroundColor: this.getBackgroundColors(chartType),
          borderColor: this.getBorderColors(chartType),
          borderWidth: 1
        }
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          },
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          },
          title: {
            display: true,
            text: title,
            color: '#ffffff',
            font: {
              size: 18,
              family: 'Roboto',
              weight: 'bold'
            }
          }
        }
      },
      type: chartType
    };
  }

  transformNestedDataForChart(data: any, title: string, chartType: 'bar' | 'doughnut' | 'pie' | 'line') {
    const labels = Object.keys(data);
    const datasets = labels.map(label => {
      return {
        label: label,
        data: Object.values(data[label]),
        backgroundColor: this.getBackgroundColors(chartType),
        borderColor: this.getBorderColors(chartType),
        borderWidth: 1
      };
    });

    return {
      labels: Object.keys(data[labels[0]]),
      datasets: datasets,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          },
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#ffffff',
              font: {
                size: 16, // Increased font size for better readability
                family: 'Roboto'
              }
            }
          },
          title: {
            display: true,
            text: title,
            color: '#ffffff',
            font: {
              size: 18,
              family: 'Roboto',
              weight: 'bold'
            }
          }
        }
      },
      type: chartType
    };
  }

  getBackgroundColors(chartType: 'bar' | 'doughnut' | 'pie' | 'line') {
    const colors: { [key: string]: string | string[] } = {
      bar: 'rgba(75, 192, 192, 0.6)',
      doughnut: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ],
      pie: [
        'rgba(255, 159, 64, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(201, 203, 207, 0.6)',
        'rgba(75, 192, 192, 0.6)'
      ],
      line: 'rgba(153, 102, 255, 0.6)'
    };
    return colors[chartType];
  }

  getBorderColors(chartType: 'bar' | 'doughnut' | 'pie' | 'line') {
    const colors: { [key: string]: string | string[] } = {
      bar: 'rgba(75, 192, 192, 1)',
      doughnut: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      pie: [
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      line: 'rgba(153, 102, 255, 1)'
    };
    return colors[chartType];
  }
}
