document.addEventListener("DOMContentLoaded", function () {
//=====================================
// Theme Onload Toast
//=====================================
window.addEventListener("load", () => {
  const toastElements = document.querySelectorAll('.toast');
  if (toastElements.length > 0) {
    const myAlert = toastElements[0];
    const bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
  }
})

//=====================================
// Customer Growth per Product
//=====================================
const customerGrowthData = {
  dates: ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01', '2024-05-01'],
  products: [
    {
      name: 'Product A',
      data: [10, 20, 30, 40, 50] // Customer counts over time
    },
    {
      name: 'Product B',
      data: [15, 25, 35, 45, 55] // Customer counts over time
    },
    {
      name: 'Product C',
      data: [5, 15, 25, 35, 45] // Customer counts over time
    }
  ]
};

// Initialize the ApexCharts line chart
const customerGrowthOptions = {
  chart: {
    type: 'line',
    height: 350
  },
  series: customerGrowthData.products,
  xaxis: {
    categories: customerGrowthData.dates,
    title: {
      text: 'Date'
    }
  },
  yaxis: {
    title: {
      text: 'Customer Growth'
    }
  },
  title: {
    text: 'Customer Growth per Product Over Time',
    align: 'center'
  },
  stroke: {
    curve: 'smooth'
  },
  colors: ['#008FFB', '#00E396', '#FEB019'], // Colors for each product line
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 5
  },
  tooltip: {
    x: {
      format: 'yyyy-MM-dd'
    }
  },
  legend: {
    position: 'top'
  }
};

const customerGrowthChart = new ApexCharts(document.querySelector("#customerGrowthChart"), customerGrowthOptions);
customerGrowthChart.render();

//============================================
// Revenue and Subscription (Target Vs Actual)
//============================================
// Sample data for target vs actual revenue and subscriptions for products
const chartData = {
  products: ['Product A', 'Product B', 'Product C'],
  revenue: {
    target: [10000, 15000, 20000],
    actual: [8000, 14000, 22000]
  },
  subscriptions: {
    target: [500, 700, 900],
    actual: [450, 750, 850]
  }
};

// Calculate percentage values
const revenuePercentage = chartData.revenue.actual.map((actual, i) =>
  ((actual / chartData.revenue.target[i]) * 100).toFixed(1)
);
const subscriptionsPercentage = chartData.subscriptions.actual.map((actual, i) =>
  ((actual / chartData.subscriptions.target[i]) * 100).toFixed(1)
);

// Initialize ApexCharts bar chart for target vs actual comparison
const targetActualOptions = {
  chart: {
    type: 'bar',
    height: 350,
    stacked: false,
  },
  series: [
    {
      name: 'Revenue Target',
      data: chartData.revenue.target
    },
    {
      name: 'Revenue Actual',
      data: chartData.revenue.actual
    },
    {
      name: 'Subscription Target',
      data: chartData.subscriptions.target
    },
    {
      name: 'Subscription Actual',
      data: chartData.subscriptions.actual
    }
  ],
  xaxis: {
    categories: chartData.products,
    title: {
      text: 'Products'
    }
  },
  yaxis: {
    title: {
      text: 'Values'
    },
    labels: {
      formatter: function (value) {
        return value.toLocaleString(); // Format as thousands
      }
    }
  },
  title: {
    text: 'Target vs Actual Revenue and Subscriptions (with % Achieved)',
    align: 'center'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '60%',
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Custom colors for each series
  legend: {
    position: 'top'
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value, { seriesIndex, dataPointIndex }) {
        // Determine if it's a "target" or "actual" series to display the percentage
        if (seriesIndex % 2 === 1) { // "Actual" series have odd indices
          let percentage;
          if (seriesIndex === 1) { // Revenue Actual
            percentage = revenuePercentage[dataPointIndex];
          } else if (seriesIndex === 3) { // Subscription Actual
            percentage = subscriptionsPercentage[dataPointIndex];
          }
          return `${value.toLocaleString()} (${percentage}%)`; // Show value with percentage
        }
        return value.toLocaleString(); // For "target" series, only show value
      }
    }
  }
};

const targetActualChart = new ApexCharts(document.querySelector("#targetActualChart"), targetActualOptions);
targetActualChart.render();

//==========================
// Top Customers
//==========================
// Sample data for top customers based on product usage, cross-sell, and upsell
const topCustomersData = {
    customers: ['Customer A', 'Customer B', 'Customer C', 'Customer D', 'Customer E'],
    productUsage: [120, 90, 150, 80, 110],      // Usage scores or counts per customer
    crossSell: [3, 5, 2, 4, 6],                // Number of cross-sell products bought
    upSell: [2, 4, 1, 3, 5]                    // Number of upsell purchases or opportunities
};

// Initialize ApexCharts bar chart for top customers
const topCustomersOptions = {
    chart: {
        type: 'bar',
        height: 365,
        stacked: false,
    },
    series: [
        {
            name: 'Product Usage',
            data: topCustomersData.productUsage
        },
        {
            name: 'Cross-Sell',
            data: topCustomersData.crossSell
        },
        {
            name: 'Up-Sell',
            data: topCustomersData.upSell
        }
    ],
    xaxis: {
        categories: topCustomersData.customers,
        title: {
            text: 'Top Customers'
        }
    },
    yaxis: {
        title: {
            text: 'Scores / Purchases'
        },
        labels: {
            formatter: function (value) {
                return value.toLocaleString(); // Format as thousands if needed
            }
        }
    },
    title: {
        text: 'Top Customers by Product Usage, Cross-Sell, and Up-Sell',
        align: 'center'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '60%',
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ['#008FFB', '#00E396', '#FF4560'], // Custom colors for each metric
    legend: {
        position: 'top'
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (value) {
                return value.toLocaleString(); // Format tooltip values as thousands
            }
        }
    }
};

const topCustomersChart = new ApexCharts(document.querySelector("#topCustomersChart"), topCustomersOptions);
topCustomersChart.render();

//==============================
// Revenue Risk
//==============================
// Sample data for revenue risk based on reduced customer usage
const revenueRiskData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    usage: [200000, 150000, 100000, 80000, 70000, 50000, 30000, 20000, 10000, 9000, 8000, 5000,]  // Reduced usage amounts
};

// Initialize ApexCharts line chart for Revenue Risk
const revenueRiskOptions = {
    chart: {
        type: 'line',
        height: 350,
        zoom: {
            enabled: false
        }
    },
    series: [{
        name: 'Reduced Customer Usage',
        data: revenueRiskData.usage
    }],
    xaxis: {
        categories: revenueRiskData.dates,
        title: {
            text: 'Months'
        }
    },
    yaxis: {
        title: {
            text: 'Usage Amount'
        },
        labels: {
            formatter: function (value) {
                return value.toLocaleString(); // Format as thousands
            }
        }
    },
    title: {
        text: 'Revenue Risk: Reduced Customer Usage Trend',
        align: 'center'
    },
    stroke: {
        curve: 'smooth'
    },
    markers: {
        size: 5
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (value) {
                return value.toLocaleString(); // Format tooltip values as thousands
            }
        }
    },
    colors: ['#FF4560'], // Color for the usage line
};

const revenueRiskChart = new ApexCharts(document.querySelector("#revenueRiskChart"), revenueRiskOptions);
revenueRiskChart.render();

//=================================
// Customer Churn
//=================================
// Sample data
const data = {
    "churn_rate": [
        {"name": "High risk", "value": 50},
        {"name": "Medium risk", "value": 30},
        {"name": "Low risk", "value": 20}
    ],
    "propensity_to_churn": [
        {"name": "High risk", "value": 40},
        {"name": "Medium risk", "value": 25},
        {"name": "Low risk", "value": 15}
    ],
    "revenue_impact": [
        {"name": "High risk", "value": 30},
        {"name": "Medium risk", "value": 15},
        {"name": "Low risk", "value": 30}
    ]
};

// Extracting data for chart series
const categories = data.churn_rate.map(point => point.name);
const churnValues = data.churn_rate.map(point => point.value);
const propensityValues = data.propensity_to_churn.map(point => point.value);
const revenueImpactValues = data.revenue_impact.map(point => point.value);

// Chart options
const Options = {
    chart: {
        type: 'bar',
        height: 365,
        stacked: true,
        toolbar: {
            show: false
        }
    },
    colors: ["#FF4560", "#00E396", "#775DD0"],  // Custom colors for each data series
    series: [
        {
            name: 'Churn Rate (%)',
            data: churnValues
        },
        {
            name: 'Propensity to Churn (%)',
            data: propensityValues
        },
        {
            name: 'Revenue Impact (%)',
            data: revenueImpactValues
        }
    ],
    xaxis: {
        categories: categories,
        title: {
            text: 'Risk Level'
        }
    },
    yaxis: {
        title: {
            text: 'Percentage (%)'
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        markers: {
            height: 12,
            width: 12
        }
    },
    title: {
        text: 'Customer Churn Report by Risk Level',
        align: 'center'
    },
    tooltip: {
        y: {
            formatter: function (value) {
                return value + " %";
            }
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%";
        }
    }
};

// Render the chart
const chart = new ApexCharts(document.querySelector("#churnReportChart"), Options);
chart.render();



// =========================================
// Opportunity Funnel
// =========================================
// Data for Opportunity Funnel
// Data for Opportunity Funnel
// Data for Opportunity Funnel
var funnelData = [
  { x: "Leads", y: 200000 },
  { x: "Opportunities", y: 150000 },
  { x: "Deals", y: 100000 },
  { x: "Clients", y: 50000 }
];

// Configuration for Funnel Chart
var options = {
  chart: {
      type: 'bar',
      height: 300,
  },
  plotOptions: {
      bar: {
          horizontal: true,
          isFunnel: true, // Enables funnel style
          barHeight: '70%',
      }
  },
  series: [
      {
          name: "Revenue Potential",
          data: funnelData
      }
  ],
  dataLabels: {
      enabled: true,
      formatter: function (val) {
          return "$" + val.toLocaleString();
      },
      style: {
          fontSize: '14px',
          fontWeight: 'bold',
          colors: ['#fff']
      }
  },
  colors: ['#FF4560', '#00E396', '#008FFB', '#775DD0'], // Unique colors for stages
  xaxis: {
      title: {
          text: 'Revenue Potential (USD)'
      },
      labels: {
          formatter: function (value) {
              return "$" + value.toLocaleString();
          }
      }
  },
  yaxis: {
      title: {
          text: 'Pipeline Stages'
      }
  },
  grid: {
      borderColor: '#f1f1f1'
  },
  legend: {
      show: false
  },
  tooltip: {
      y: {
          formatter: function (value) {
              return "$" + value.toLocaleString();
          }
      }
  }
};

// Render the chart
var funnelchart = new ApexCharts(document.querySelector("#opportunityFunnelChart"), options);
funnelchart.render();



})