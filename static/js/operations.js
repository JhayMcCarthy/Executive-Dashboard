document.addEventListener("DOMContentLoaded", function () {

    //=====================================
    // Theme Onload Toast
    //=====================================
    window.addEventListener("load", () => {
      let myAlert = document.querySelectorAll('.toast')[0];
      if (myAlert) {
        let bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
      }
    })

    //=====================================
    //NPS chart
    //=====================================
    var options = {
    chart: {
        type: 'bar', // Bar chart
        height: 400,
    },
    series: [
        {
            name: 'Average TTR',
            data: [80, 60, 85, 75, 70, 78,] // Example TTR values over months
        },
        {
            name: 'Total Complaints',
            data: [70, 80, 85, 65, 70, 88,] // Example complaints count over months
        },
        {
            name: 'Total System Errors',
            data: [45, 58, 40, 62, 78, 55,] // Example errors count over months
        }
    ],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        title: {
            text: 'Months'
        }
    },
    yaxis: {
        title: {
            text: '% Critical'
        },
        min: 0,
        max: 100
    },
    colors: ['#FF1B6F', '#007BFF', '#28A745'], // Colors for each series
    plotOptions: {
        bar: {
            borderRadius: 0,
            columnWidth: '85%', // Width of bars
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function(val) {
            return val;
        },
        offsetY: -10,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        }
    },
    tooltip: {
      shared: true,
      intersect: false,
      followCursor: true, // Makes the tooltip follow the mouse pointer
      y: {
        formatter: function(val) {
          return val;
        }
      }
    },
    legend: {
        position: 'top'
    }
};

var performanceChart = new ApexCharts(document.querySelector("#npsChart"), options);
performanceChart.render();

  

    //=====================================
    //Company Efficiency
    //=====================================
    // Function to fetch the company efficiency score from the backend
async function fetchEfficiencyScore() {
  try {
      const response = await fetch('http://your_server_ip:5000/company_efficiency_score');
      const data = await response.json();

      // Access the efficiency score directly as it's not in an array
      if (data && data.company_efficiency_score !== undefined) {
          return parseFloat(data.company_efficiency_score); // Convert to a number
      } else {
          console.error("Company efficiency score not found in response");
          return 0; // Default value if score is unavailable
      }
  } catch (error) {
      console.error("Error fetching company efficiency score:", error);
      return 0; // Default value in case of an error
  }
}

// Function to render the Company Efficiency chart with dynamic data
async function renderEfficiencyChart() {
  const efficiencyScore = await fetchEfficiencyScore();

  // Chart options for a radial bar (gauge) chart
  var options = {
      chart: {
          type: 'radialBar',
          height: '200%',
          animations: {
              enabled: true,
              easing: 'easeinout',
              dynamicAnimation: {
                  speed: 350
              }
          }
      },
      series: [efficiencyScore], // Use dynamic efficiency score
      labels: ['Efficiency'],
      colors: ['#4bc0c0'],
      plotOptions: {
          radialBar: {
              hollow: {
                  size: '60%',
              },
              dataLabels: {
                  name: {
                      fontSize: '20px',
                  },
                  value: {
                      fontSize: '20px',
                      color: '#333',
                      formatter: function(val) {
                          return val.toFixed(1) + "%"; // Format to 1 decimal place
                      }
                  }
              },
              track: {
                  background: '#eee'
              }
          }
      },
      fill: {
          gradients: [{
              gradientToColors: ['#afeeff']
          }]
      },
      responsive: [{
          breakpoint: 768, // Mobile breakpoint
          options: {
              chart: {
                  height: 250 // Adjust height for smaller screens
              }
          }
      }]
  };

  // Initialize the chart
  var efficiencyScoreChart = new ApexCharts(document.querySelector("#efficiencyScoreChart"), options);
  efficiencyScoreChart.render();

  // Automatically resize chart on window resize
  window.addEventListener('resize', function() {
      efficiencyScoreChart.updateOptions({
          chart: {
              height: '100%',
              width: '100%'
          }
      });
  });
}

// Call the render function to display the chart
renderEfficiencyChart();




//==============================
// Service Degradation
//==============================
// Options for Service Degradation Alert Heatmap
var options = {
  chart: {
    type: 'heatmap',
    height: 420,
    width: '100%',
    toolbar: {
      show: false
    }
  },
  series: [
    {
      name: 'Service A',
      data: [
        { x: 'January', y: 12 },
        { x: 'February', y: 18 },
        { x: 'March', y: 6 },
        { x: 'April', y: 15 },
        { x: 'May', y: 9 }
      ]
    },
    {
      name: 'Service B',
      data: [
        { x: 'January', y: 5 },
        { x: 'February', y: 10 },
        { x: 'March', y: 20 },
        { x: 'April', y: 8 },
        { x: 'May', y: 12 }
      ]
    },
    {
      name: 'Service C',
      data: [
        { x: 'January', y: 7 },
        { x: 'February', y: 15 },
        { x: 'March', y: 5 },
        { x: 'April', y: 18 },
        { x: 'May', y: 10 }
      ]
    },
    {
      name: 'Service D',
      data: [
        { x: 'January', y: 10 },
        { x: 'February', y: 5 },
        { x: 'March', y: 7 },
        { x: 'April', y: 13 },
        { x: 'May', y: 19 }
      ]
    }
  ],
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May'],
    title: {
      text: 'Months'
    }
  },
  yaxis: {
    title: {
      text: 'Services'
    }
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.6,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 5,
            color: '#28a745',  // Low degradation (Green)
            name: 'Low'
          },
          {
            from: 6,
            to: 10,
            color: '#ffc107',  // Moderate degradation (Yellow)
            name: 'Moderate'
          },
          {
            from: 11,
            to: 15,
            color: '#fd7e14',  // High degradation (Orange)
            name: 'High'
          },
          {
            from: 16,
            to: 20,
            color: '#dc3545',  // Critical degradation (Red)
            name: 'Critical'
          }
        ]
      }
    }
  },
  legend: {
    position: 'top',
  },
  tooltip: {
    y: {
      formatter: function(value) {
        return value + " degradation points";
      }
    }
  }
};

// Render the chart in a container with the ID "serviceDegradationAlert"
var serviceDegradationChart = new ApexCharts(document.querySelector("#serviceDegradationAlert"), options);
serviceDegradationChart.render();




//============================
// Tickets (open vs closed)
//============================
// Data for the tickets (you can update this based on filters)
var options = {
  chart: {
    type: 'bar',
    height: 400,
    stacked: false,
  },
  series: [
    {
      name: 'Opened Tickets',
      data: [120, 150, 170, 180, 160, 200]
    },
    {
      name: 'Closed Tickets',
      data: [100, 140, 160, 170, 155, 190]
    },
    {
      name: '% Critical',
      data: [15, 12, 18, 10, 20, 17],
      type: 'line', // Critical tickets percentage as a line chart
    }
  ],
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    title: {
      text: 'Months'
    }
  },
  yaxis: [
    {
      title: {
        text: 'Tickets'
      },
      min: 0,
      max: 220
    },
    {
      opposite: true, // For critical tickets percentage
      title: {
        text: '% Critical'
      },
      min: 0,
      max: 100
    }
  ],
  colors: ['#007bff', '#28a745', '#ff6347'], // Opened, Closed, Critical % colors
  stroke: {
    curve: 'smooth',
    width: [0, 0, 2]
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '50%',
    }
  },
  markers: {
    size: 5,
    colors: ['#ff6347'],
    strokeColors: '#fff',
    strokeWidth: 2,
  },
  legend: {
    position: 'top',
  },
  tooltip: {
    shared: true,
    intersect: false,
    followCursor: true, // Makes the tooltip follow the mouse pointer
    y: {
      formatter: function(val) {
        return val;
      }
    }
  }
};

var ticketsChart = new ApexCharts(document.querySelector("#ticketsChart"), options);
ticketsChart.render();

// Filter logic (you can customize this part for dynamic filtering based on product & service)
document.getElementById("productFilter").addEventListener("change", function() {
    // Update chart data based on selected product
    // ticketsChart.updateSeries or ticketsChart.updateOptions can be used here
});

document.getElementById("serviceFilter").addEventListener("change", function() {
    // Update chart data based on selected service
});


})