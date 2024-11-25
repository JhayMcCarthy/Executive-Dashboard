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

  // -----------------------------------------------------------------------
  // Total Active Projecs
  // -----------------------------------------------------------------------

  var options = {
    series: [350, 150], // cashflow, non-cashflow
    chart: {
      type: "donut",
      height: 350,
    },
    labels: ["Cashflow", "Non-Cashflow"],
    legend: {
      position: "bottom",
      itemMargin: {
        horizontal: 20,
      },
    },
    
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: "Total",
            },
            value: {
              fontSize: "20px",
              show: true,
            },
          },
        },
      },
    },
    colors: ["#00DA6F", "#0091FF"], // colors for cashflow and non-cashflow
  };
  var chart = new ApexCharts(document.querySelector("#activeprojects"), options);
  chart.render();
  

  // -----------------------------------------------------------------------
  // Data Warehouse
  // -----------------------------------------------------------------------

  var options = {
    series: [
      {
        name: 'Available Space',
        data: [250, 300, 280, 230, 350, 420, 300, 450, 400, 500, 380, 480],
      },
      {
        name: 'Used Space',
        data: [200, 250, 300, 280, 320, 350, 250, 400, 330, 420, 280, 440],
      },
    ],
    chart: {
      id: 'warehouse-availability',
      type: 'area',
      height: 300,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0.1,
        stops: [100],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: true,
      },
      y: {
        formatter: function(val) {
          return val.toLocaleString();
        },
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val.toLocaleString();
        },
      },
    },
    legend: {
      show: true,
    },
  };
  
  new ApexCharts(document.querySelector('#warehouse-availability'), options).render();
  
  
    

  // -----------------------------------------------------------------------
  // Server response score
  // -----------------------------------------------------------------------
  var chart_bounce_rate = {
    series: [
      {
        name: "Server Response Score",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        data: [85, 90, 92, 88, 95, 90, 70, 50, 95, 80, 95, 60],
      },
    ],
    chart: {
      fontFamily: "inherit",
      height: 300,
      type: "bar",
      offsetX: -10,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    colors: ["#009900"], // Set a color for the chart
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "flat",
        borderRadius: 4,
      },
    },
    tooltip: {
      theme: "dark",
      followCursor: true,
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val + "%";
        },
      },
      min: 0,
      max: 100,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  };
  var chart_line_basic = new ApexCharts(
    document.querySelector("#server-response-score"),
    chart_bounce_rate
  );
  chart_line_basic.render();
  
  

  // -----------------------------------------------------------------------
  // Target vs Actual 
  // -----------------------------------------------------------------------

  var chart = {
    series: [
      {
        name: "Actual",
        data: [50, 60, 30, 55, 75, 60, 100, 120, 80, 130, 58, 150,],
      },
      {
        name: "Target",
        data: [70, 80, 50, 70, 90, 80, 140, 160, 100, 150, 70, 160,],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      type: "line",
      fontFamily: "inherit",
      foreColor: "#0000ff",
      height: 300,
      width: "100%",
      zoom: {
        enabled: false,
      },
      offsetX: -10,
    },
    colors: ["#FF562E", "#2BDCE8"],
    plotOptions: {},
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      itemMargin: {
        horizontal: 20,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      show: true,
      padding: {
        top: 0,
        bottom: 0,
      },
      borderColor: "rgba(0,0,0,0.05)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec",],
    },
    markers: {
      size: 4,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 0,
          fill: "var(--bs-secondary)",
          stroke: "var(--bs-secondary)",
          size: 6,
        },
      ],
    },
    tooltip: {
      theme: "dark",
    },
  };
  
  var chart = new ApexCharts(
    document.querySelector("#target-vs-actual"),
    chart
  );
  chart.render();
  ;

  // =====================================
  // Network Latency
  // =====================================

  // Define chart options
  var options = {
    series: [{
        name: 'Network Latency',
        data: [20, 30, 15, 40, 50, 60, 70, 80, 90, 100]
    }],
    chart: {
        height: 300,
        type: 'area', // Changed to area chart for better visual representation
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 300,
            animateGradually: {
                enabled: true,
                delay: 500
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },
        background: '#f9f9f9', // Light background color
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 2,
        curve: 'smooth', // Smooth curve for the area chart
    },
    xaxis: {
        categories: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45'],
        title: {
            text: 'Time',
            style: {
                fontWeight: 'bold',
                fontSize: '14px'
            }
        },
        labels: {
            style: {
                fontSize: '12px',
                colors: "#5A5A5A"
            }
        },
    },
    yaxis: {
        title: {
            text: 'Latency (ms)',
            style: {
                fontWeight: 'bold',
                fontSize: '14px'
            }
        },
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
            style: {
                fontSize: '12px',
                colors: "#5A5A5A"
            }
        },
    },
    grid: {
        borderColor: "#e0e0e0", // Light grid lines
        strokeDashArray: 4,
        padding: {
            top: 10,
            bottom: 10,
            left: 20,
            right: 20
        }
    },
    tooltip: {
        x: {
            format: 'HH:mm'
        },
        y: {
            formatter: function(value) {
                return value + ' ms';
            }
        }
    },
    responsive: [{
        breakpoint: 1400,
        options: {
            chart: {
                height: 400
            }
        }
    }]
};

// Create chart
var chart = new ApexCharts(document.querySelector("#Network-Latency"), options);
chart.render();

// Simulate real-time updates
function getRandomLatency() {
    return Math.floor(Math.random() * 100) + 1; // Generate random latency between 1 and 100
}

function updateChart() {
    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get current time
    
    // Add new data point to the series
    options.series[0].data.push(getRandomLatency());

    // Update x-axis categories (time)
    options.xaxis.categories.push(currentTime);

    // Keep the last 10 data points only
    if (options.series[0].data.length > 10) {
        options.series[0].data.shift();
        options.xaxis.categories.shift();
    }

    chart.updateSeries([{ data: options.series[0].data }], true);
}

// Update the chart every 2 seconds to simulate real-time updates
setInterval(updateChart, 30000);

  



  // -----------------------------------------------------------------------
  // Timeline Vs Slippage
  // -----------------------------------------------------------------------
  var options = {
    chart: {
        type: 'bar',  // Bar chart simulates Gantt chart
        height: 300,
        stacked: true, // Stack bars for timeline vs slippage
    },
    series: [
        {
            name: 'Planned Timeline',
            data: [70, 90, 80, 85, 70, 80, 90, 85, 70, 80, 90, 85] // Project planned timeline (progress)
        },
        {
            name: 'Actual Timeline',
            data: [30, 40, 20, 15, 30, 60, 40, 15, 30, 20, 10, 15] // Actual timeline (completion)
        },
        {
            name: 'Slippage',
            data: [40, 50, 60, 70, 40, 20, 50, 70, 60, 40, 80, 70] // Slippage in the project timeline
        }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  // Time (Months)
    colors: ['#00DC76', '#D50000', '#FF7043'],  // Colors for planned timeline, actual timeline, and slippage
    plotOptions: {
        bar: {
            horizontal: true,  // Horizontal bars for a Gantt-like view
            columnWidth: '50%', // Adjust width of bars
            borderRadius: 3,
        }
    },
    xaxis: {
        type: 'category',  // Category-based x-axis (months)
        title: {
            text: 'Time (Months)'  // X-axis represents Time in Months
        }
    },
    yaxis: {
        title: {
            text: 'Project/Task Names'  // Y-axis represents different projects or tasks
        },
        categories: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E', 'Project F', 'Project G', 'Project H', 'Project I', 'Project J', 'Project K', 'Project L'],  // Example project names
    },
    tooltip: {
        shared: true,
        intersect: false,
        x: {
            show: true,
        },
        y: {
            formatter: function (val) {
                return val; // Showing the percentage of completion
            }
        }
    },
    legend: {
        show: true,
        position: 'bottom',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                height: 300
            },
            legend: {
                show: true,
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#timeline-vs-slippage"), options);
chart.render();






  // -----------------------------------------------------------------------
  // Activity Output Vs Service Experience
  // -----------------------------------------------------------------------
  var activityOutput = {
    series: [
      {
        name: "Activity Output",
        data: [
          40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140,
        ],
      },
      {
        name: "Service Experience",
        data: [
          20, 20, 60, 60, 50, 50, 30, 30, 60, 60, 150, 150, 40, 40, 120, 120,
        ],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "line",
      height: 400,
      toolbar: { show: !1 },
    },
    legend: { show: !0 },
    dataLabels: { enabled: !1 },
    stroke: {
      curve: "smooth",
      show: !0,
      width: 2,
      colors: ["var(--bs-primary)", "var(--bs-secondary)"],
    },
    xaxis: {
      categories: [
        "1W",
        "",
        "3W",
        "",
        "5W",
        "6W",
        "7W",
        "8W",
        "9W",
        "",
        "11W",
        "",
        "13W",
        "",
        "15W",
      ],
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: !0,
        style: { fontSize: "10px", colors: "#adb0bb", fontWeight: "600" },
      },
    },
    yaxis: {
      show: false,
      tickAmount: 3,
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["var(--bs-primary)", "var(--bs-secondary)"],
    grid: {
      borderColor: "var(--bs-primary-bg-subtle)",
      strokeDashArray: 4,
      yaxis: { show: true },
    },
    markers: {
      strokeColor: ["var(--bs-primary)", "var(--bs-secondary)"],
      strokeWidth: 3,
    },
  };
  
  var chart_area_spline = new ApexCharts(
    document.querySelector("#activity-output-vs-service"),
    activityOutput
  );
  chart_area_spline.render();


  // -----------------------------------------------------------------------
  // System Availability Score
  // -----------------------------------------------------------------------
  var availabilityOutput = {
    series: [
        {
            name: "System Availability Score",
            data: [
                85, 70, 85, 50, 60, 65, 70, 90, 50, 70, 82, 73, 79, 85, 98, 92,
            ],
        },
    ],
    chart: {
        fontFamily: "inherit",
        type: "line",
        height: 300,
        toolbar: { show: false },
    },
    legend: { show: true },
    dataLabels: { enabled: false },
    stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        colors: ["#008FFB"], // Single color for the line
    },
    xaxis: {
        categories: [
            "Week 1", 
            "Week 2", 
            "Week 3", 
            "Week 4", 
            "Week 5", 
            "Week 6", 
            "Week 7", 
            "Week 8", 
            "Week 9", 
            "Week 10", 
            "Week 11", 
            "Week 12", 
            "Week 13", 
            "Week 14", 
            "Week 15", 
            "Week 16"
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tickAmount: 6,
        labels: {
            rotate: 0,
            rotateAlways: true,
            style: { fontSize: "10px", colors: "#adb0bb", fontWeight: "600" },
        },
    },
    yaxis: {
        title: {
            text: "Availability Score (%)",
        },
        min: 0,  // Adjust min value if necessary
        max: 100, // Assuming availability scores range from 0 to 100
        tickAmount: 5,
    },
    tooltip: {
        theme: "dark",
    },
    colors: ["#008FFB"], // Single color for the line
    grid: {
        borderColor: "var(--bs-primary-bg-subtle)",
        strokeDashArray: 4,
        yaxis: { show: true },
    },
    markers: {
        strokeColor: ["#008FFB"], // Adjust color as necessary
        strokeWidth: 3,
    },
};

// Create and render the chart
var chart_area_spline = new ApexCharts(
    document.querySelector("#Systemscore"),
    availabilityOutput
);
chart_area_spline.render();


  
});
