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
  // cashflow deviation
  // -----------------------------------------------------------------------

  var options = {
    series: [
      {
        name: 'Positive Cashflow',
        data: [1000, 1500, 1200, 1800, 1300, 1700, 2000, 2200, 1800, 2500, 2100, 1400], // Example positive cashflow values
      },
      {
        name: 'Negative Cashflow',
        data: [-500, -600, -700, -800, -400, -300, -900, -1000, -500, -1200, -800, -1100], // Example negative cashflow values
      },
    ],
    chart: {
      id: 'cashflow-deviation',
      type: 'area', // Keeping the area chart type
      height: 200,
      width: "100%",
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
        show: false,
      },
      y: {
        formatter: function(val) {
          return "GHC" + val.toLocaleString(); // Formatting as currency for cashflow
        },
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Monthly data
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return "GHC " + val.toLocaleString(); // Formatting Y-axis labels as currency
        },
      },
    },
    legend: {
      show: true,
    },
  };
  
  new ApexCharts(document.querySelector('#cashflow-deviation'), options).render();
  
  
    
  
  
  // =====================================
  // Net Profit
  // =====================================

  // Define chart options
  var netProfitData = [5800]; // Example gross profit value in dollars

// Define the chart options for a radial bar chart
var options = {
chart: {
  type: 'radialBar',
  height: 370,
  toolbar: { show: false },
  sparkline: {
    enabled: true
  },
  offsetX: 0,
  offsetY: 0
},
series: netProfitData, // Single radial value representing gross profit in dollars
plotOptions: {
  radialBar: {
    dataLabels: {
      name: {
        show: true,
        fontSize: '18px',
        color: '#0CC1D8',
        offsetY: -10,
        formatter: function() {
          return "Net Profit";
        }
      },
      value: {
        show: true,
        fontSize: '16px',
        color: '#333',
        offsetY: 10,
        formatter: function(val) {
          return "Ghc" + " " + val.toLocaleString(); // Formatting as currency
        }
      }
    }
  }
},
colors: ['#0CC1D8'], 
labels: ['Net Profit'], // Label for the radial bar
tooltip: {
  enabled: true,
  formatter: function(val) {
    return "Ghc" + val.toLocaleString(); // Formatting tooltip as currency
  }
},
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      height: 200
    }
  }
}]
};

// Create the radial bar chart
var chart = new ApexCharts(document.querySelector("#net-profit"), options);
chart.render();

    
    



  // -----------------------------------------------------------------------
  // Gross Profit
  // -----------------------------------------------------------------------
  // Define the gross profit data
  var grossProfitData = [7512]; // Example gross profit value in dollars
var grossProfitMargin = 45; // Example gross profit margin in percentage

// Define the chart options for a radial bar chart
var options = {
chart: {
  type: 'radialBar',
  height: 365,
  toolbar: { show: false },
  sparkline: {
    enabled: true
  },
  offsetX: 0,
  offsetY: 0
},
series: grossProfitData, // Single radial value representing gross profit in dollars
plotOptions: {
  radialBar: {
    dataLabels: {
      name: {
        show: true,
        fontSize: '18px',
        color: '#0CD87A',
        offsetY: -10,
        formatter: function() {
          return "Gross Profit";
        }
      },
      value: {
        show: true,
        fontSize: '16px',
        color: '#333',
        offsetY: 10,
        formatter: function(val) {
          return "Ghc" + " " + val.toLocaleString(); // Formatting as currency
        }
      }
    }
  }
},
colors: ['#0CD87A'], // Green color for the radial bar
labels: ['Gross Profit'], // Label for the radial bar
tooltip: {
  enabled: true,
  formatter: function(val) {
    return "Ghc" + val.toLocaleString(); // Formatting tooltip as currency
  }
},
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      height: 200
    }
  }
}]
};

// Create the radial bar chart
var chart = new ApexCharts(document.querySelector("#gross-profit"), options);
chart.render();



// ======================================
// Target Vs Actual Revenue
// ======================================
// Data for Target Revenue and Actual Revenue
var revenueData = {
  categories: ['Q1', 'Q2', 'Q3', 'Q4'], // Time periods (quarters)
  targetRevenue: [15000, 20000, 25000, 30000], // Target revenue data
  actualRevenue: [12000, 21000, 23000, 28000], // Actual revenue data
};

// Configure the ApexCharts options
var options = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: false, // Disable stacking for clustered bars
    toolbar: {
      show: false // Disable the toolbar
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '40%', // Adjust the width of the bars
      endingShape: 'rounded', // Rounded bar ends
    }
  },
  colors: ['#00D1B2', '#FF5733'], // Set colors for target and actual revenue
  title: {
    text: 'Target Revenue vs Actual Revenue',
    align: 'center',
    style: {
      fontSize: '20px',
      fontWeight: 'bold',
    }
  },
  xaxis: {
    categories: revenueData.categories, // X-axis represents Time (quarters)
    title: {
      text: 'Time (Quarters)'
    }
  },
  yaxis: {
    title: {
      text: 'Revenue (GHC)',
    },
    min: 0,
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function(value, { seriesIndex }) {
        if (seriesIndex === 0) {
          return 'GHC ' + value.toLocaleString(); // Format target revenue
        } else {
          return 'GHC ' + value.toLocaleString(); // Format actual revenue
        }
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
  },
  series: [
    {
      name: 'Target Revenue',
      data: revenueData.targetRevenue, // Data for target revenue
    },
    {
      name: 'Actual Revenue',
      data: revenueData.actualRevenue, // Data for actual revenue
    }
  ],
  grid: {
    borderColor: '#f1f1f1', // Set grid border color
    strokeDashArray: 3,
  }
};

// Create the chart with the specified options
var chart = new ApexCharts(document.querySelector("#targetvsactual"), options);

// Render the chart
chart.render();


// ===================================
// Debtors
// ===================================
    // Define data for the aging report
var agingReportData = {
  categories: ["0-30 Days", "30-60 Days", "60-90 Days", "90+ Days"],
  collection: [20, 25, 15, 10], // Collection % data
  aging: [80, 75, 85, 90],      // Aging % data
  absoluteValue: [10000, 8000, 12000, 15000], // Absolute debt values for each period
  count90Plus: 3                // Count of items for 90+ days
};

// Configuration for the ApexCharts stacked bar chart
var options = {
  chart: {
    type: 'bar',
    height: 450,
    stacked: true,             // Stack bars for aging and collection
    toolbar: {
      show: false              // Hide toolbar
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,        // Vertical bars
      columnWidth: '50%',       // Width of bars
      borderRadius: 4
    }
  },
  colors: ['#00BFFF', '#FF6347'], // Colors for collection and aging
  xaxis: {
    categories: agingReportData.categories,
    title: {
      text: 'Aging Periods'
    }
  },
  yaxis: {
    title: {
      text: 'Percentage of Total Debt (%)'
    },
    min: 0,
    max: 100
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function(value, { seriesIndex, dataPointIndex }) {
        let amount = agingReportData.absoluteValue[dataPointIndex];
        if (dataPointIndex === 3 && seriesIndex === 1) { // Highlight 90+ days
          return value + "% (" + amount.toLocaleString() + " GHC, Count: " + agingReportData.count90Plus + ")";
        } else {
          return value + "% (" + amount.toLocaleString() + " GHC)";
        }
      }
    }
  },
  series: [
    {
      name: 'Collection %',
      data: agingReportData.collection
    },
    {
      name: 'Aging %',
      data: agingReportData.aging
    }
  ],
  dataLabels: {
    enabled: true,
    formatter: function(val, { seriesIndex, dataPointIndex }) {
      let amount = agingReportData.absoluteValue[dataPointIndex];
      return val + "% (GHC" + amount.toLocaleString() + ")";
    },
    style: {
      fontSize: '10px',
      colors: ['#333']
    }
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
  },
  annotations: {
    xaxis: [
      {
        x: '90+ Days',            // Highlight the 90+ days period
        borderColor: '#FF6347',
        label: {
          borderColor: '#FF6347',
          style: {
            color: '#fff',
            background: '#FF6347'
          },
          text: 'Long-standing Debts (90+ Days)'
        }
      }
    ]
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#agingReportChart"), options);
chart.render();


// ====================================================
// Net Profit Margin and Gross Profit Margin.
// ====================================================
// Define data for profit margins
var profitMarginsData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  grossProfitMargin: [30, 32, 35, 33, 31, 34, 36, 37, 35, 33, 34, 32],  // Gross Profit Margin (%)
  netProfitMargin: [15, 17, 18, 16, 14, 15, 18, 19, 17, 15, 16, 14]     // Net Profit Margin (%)
};

// Configuration for the ApexCharts line chart
var options = {
  chart: {
    type: 'line',
    height: 450,
    toolbar: {
      show: true
    }
  },
  series: [
    {
      name: "Gross Profit Margin",
      data: profitMarginsData.grossProfitMargin
    },
    {
      name: "Net Profit Margin",
      data: profitMarginsData.netProfitMargin
    }
  ],
  xaxis: {
    categories: profitMarginsData.categories,
    title: {
      text: 'Time (Months)'
    }
  },
  yaxis: {
    title: {
      text: 'Percentage (%)'
    },
    min: 0,
    max: 50
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  colors: ['#00E396', '#008FFB'], // Colors for Gross and Net Profit Margins
  tooltip: {
    shared: true,
    y: {
      formatter: function(value) {
        return value + "%";
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  markers: {
    size: 5,
    colors: ['#00E396', '#008FFB'],
    strokeWidth: 2,
    hover: {
      size: 7
    }
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#profitMarginsChart"), options);
chart.render();


// ============================================
// Monthly Recurring revenue
// ============================================
// Define data for Monthly Recurring Revenue (MRR) and Growth Rate

// Define data for Monthly Recurring Revenue (MRR) and Growth Rate
var mrrData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  mrr: [5000, 5200, 5300, 5400, 5500, 5600, 5800, 6000, 6100, 6200, 6300, 6500], // MRR values (GHC)
  growthRate: [4, 2, 3, 6, 2, 2.5, 3.6, 3.4, 1.7, 1.6, 1.9, 3.2] // Monthly growth rate (%)
};

// Configuration for the ApexCharts bar chart with growth line
var options = {
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "MRR (GHC)",
      type: 'column',
      data: mrrData.mrr
    },
    {
      name: "Growth Rate (%)",
      type: 'line',
      data: mrrData.growthRate
    }
  ],
  xaxis: {
    categories: mrrData.categories,
    title: { text: 'Time (Months)' }
  },
  yaxis: [
    {
      title: { text: 'Revenue (GHC)' },
      min: 0,
      opposite: false,
      labels: {
        formatter: function (value) {
          return "GHC" + value.toLocaleString();
        }
      }
    },
    {
      opposite: true,
      title: { text: 'Growth Rate (%)' },
      labels: {
        formatter: function (value) {
          return value.toFixed(1) + "%"; // Format to 1 decimal place
        }
      },
      min: 0
    }
  ],
  plotOptions: {
    bar: {
      columnWidth: '40%',
      borderRadius: 4
    }
  },
  colors: ['#008FFB', '#FF4560'], // Colors for MRR and growth rate
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: [0, 3] // No stroke for bar, 3px for line
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: function(value) {
          return "GHC" + value.toLocaleString();
        }
      },
      {
        formatter: function(value) {
          return value.toFixed(1) + "%"; // Format to 1 decimal place
        }
      }
    ]
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  markers: {
    size: 4,
    colors: ['#FF4560'],
    strokeWidth: 2,
    hover: {
      size: 7
    }
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#mrrGrowthChart"), options);
chart.render();


// ===========================================
// Staff to Revenue Ratio
// ===========================================
// Define data for Staff to Revenue Ratio
var staffToRevenueData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  ratio: [0.12, 0.15, 0.11, 0.13, 0.14, 0.16, 0.10, 0.09, 0.08, 0.11, 0.12, 0.10], // Staff-to-Revenue Ratio (%)
  revenue: [50000, 60000, 55000, 65000, 70000, 72000, 68000, 71000, 73000, 75000, 78000, 79000] // Revenue (USD)
};

// Configuration for the bar chart with a line overlay
var options = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "Staff to Revenue Ratio (%)",
      type: 'column',
      data: staffToRevenueData.ratio.map(value => value * 100) // Convert ratio to percentage
    },
    {
      name: "Revenue (USD)",
      type: 'line',
      data: staffToRevenueData.revenue
    }
  ],
  xaxis: {
    categories: staffToRevenueData.categories,
    title: { text: 'Time (Months)' }
  },
  yaxis: [
    {
      title: { text: 'Staff to Revenue Ratio (%)' },
      labels: {
        formatter: function(value) {
          return value.toFixed(1) + "%"; // Show to 1 decimal place
        }
      },
      min: 0,
      opposite: false
    },
    {
      opposite: true,
      title: { text: 'Revenue (USD)' },
      labels: {
        formatter: function(value) {
          return "GHC " + value.toLocaleString();
        }
      },
      min: 0
    }
  ],
  plotOptions: {
    bar: {
      columnWidth: '40%',
      borderRadius: 4
    }
  },
  colors: ['#00B67C', '#FF4560'], // Colors for ratio and revenue
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: [0, 3] // No stroke for bar, 3px for line
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: function(value) {
          return value.toFixed(1) + "%"; // Show ratio as percentage
        }
      },
      {
        formatter: function(value) {
          return "GHC " + value.toLocaleString(); // Show revenue as currency
        }
      }
    ]
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  markers: {
    size: 4,
    colors: ['#FF4560'],
    strokeWidth: 2,
    hover: {
      size: 7
    }
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#staffToRevenueChart"), options);
chart.render();


// =====================================
// Return on Assets
// =====================================
// Define data for Return on Assets (ROA)
var roaData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  roaValues: [18, 22, 24, 26, 23, 27, 25, 24, 28, 26, 24, 29] // Monthly ROA percentages
};

// Configuration for the ApexCharts line chart with target line
var options = {
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "ROA (%)",
      data: roaData.roaValues
    }
  ],
  xaxis: {
    categories: roaData.categories,
    title: { text: 'Months' }
  },
  yaxis: {
    title: { text: 'Return on Assets (%)' },
    min: 0,
    max: 40, // Adjust max Y-axis limit for better visualization
    labels: {
      formatter: function(value) {
        return value.toFixed(1) + "%";
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  colors: ['#008FFB'], // Color for ROA line
  dataLabels: {
    enabled: false,
    formatter: function(value) {
      return value.toFixed(1) + "%";
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function(value) {
        return value.toFixed(1) + "%";
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: 25, // Target ROA value
        borderColor: '#FF4560',
        label: {
          borderColor: '#FF4560',
          style: {
            color: '#fff',
            background: '#FF4560'
          },
          text: 'Target: 25%'
        }
      }
    ]
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#roaChart"), options);
chart.render();



// =================================
// Return on Equity
// =================================
// Define data for Return on Equity (ROE)
var roeData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  actualROE: [28, 32, 29, 35, 31, 33, 30, 34, 29, 36, 33, 31], // Actual ROE values per month
  targetROE: Array(12).fill(30) // Target ROE value (30%) for each month
};

// Configuration for the ApexCharts line chart with target and actual ROE
var options = {
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "Actual ROE (%)",
      data: roeData.actualROE,
      color: '#008FFB' // Blue color for actual performance
    },
    {
      name: "Target ROE (%)",
      data: roeData.targetROE,
      color: '#00C851' // Green color for the target
    }
  ],
  xaxis: {
    categories: roeData.categories,
    title: { text: 'Months' }
  },
  yaxis: {
    title: { text: 'Return on Equity (%)' },
    min: 0,
    max: 50, // Adjust the maximum Y-axis limit for better visualization
    labels: {
      formatter: function(value) {
        return value + "%";
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: [3, 2] // Thicker line for actual, thinner for target
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: function(value) {
          return value + "%";
        }
      }
    ]
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#roexpenseChart"), options);
chart.render();


// =======================================
// Current Ratio
// =======================================
// Define data for Current Ratio
var currentRatioData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  actualRatio: [230, 245, 260, 240, 250, 270, 255, 245, 260, 235, 250, 265], // Actual current ratio per month
  targetRatio: Array(12).fill(250) // Target ratio of 250% for each month
};

// Configuration for the ApexCharts line chart with target and actual current ratio
var options = {
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "Actual Current Ratio (%)",
      data: currentRatioData.actualRatio,
      color: '#008FFB' // Blue color for actual ratio
    },
    {
      name: "Target Ratio (%)",
      data: currentRatioData.targetRatio,
      color: '#00C851' // Green color for the target
    }
  ],
  xaxis: {
    categories: currentRatioData.categories,
    title: { text: 'Months' }
  },
  yaxis: {
    title: { text: 'Current Ratio (%)' },
    min: 200,
    max: 300, // Adjusting the max to provide a clearer view around the target
    labels: {
      formatter: function(value) {
        return value + "%";
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: [3, 2] // Thicker line for actual, thinner for target
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: function(value) {
          return value + "%";
        }
      }
    ]
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#currentRatioChart"), options);
chart.render();


// ===================================
// Staff Ratio
// ===================================
// Define data for Staff Ratio
var staffRatioData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis (Months)
  staffRatio: [70, 75, 73, 78, 74, 79, 76, 80, 81, 77, 78, 82] // Monthly staff ratio as a percentage
};

// Configuration for the ApexCharts bar chart to show Staff Ratio
var options = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: true }
  },
  series: [
    {
      name: "Staff Ratio (%)",
      data: staffRatioData.staffRatio,
      color: '#008FFB' // Blue color for the bars
    }
  ],
  xaxis: {
    categories: staffRatioData.categories,
    title: { text: 'Months' }
  },
  yaxis: {
    title: { text: 'Staff Ratio (%)' },
    min: 0,
    max: 100, // Setting max to 100% for a percentage scale
    labels: {
      formatter: function(value) {
        return value + "%";
      }
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '60%', // Adjusting the width of the bars
      borderRadius: 4, // Rounded corners for bars
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function(value) {
        return value + "%";
      }
    }
  },
  grid: {
    borderColor: '#e7e7e7',
    strokeDashArray: 4
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center'
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#staffRatioChart"), options);
chart.render();




})