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
    // Average KPI
    // =====================================
    var options = {
        chart: {
          type: 'bar',
          height: 400,
          width: "100%",
        },
        series: [{       
          name: 'Average KPI Score',
          data: [75, 80, 90, 85, 88, 73, 65, 34, 95, 39, 12, 55]
        }],
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          title: {
            text: 'Months'
          }
        },
        yaxis: {
          title: {
            text: 'KPI Score'
          },
          min: 0,
          max: 100
        },
        colors: ['#00C5FF'],
        plotOptions: {
          bar: {
            distributed: true,
            borderRadius: 4,
          }
        }
      };
      
      var avgKPIChart = new ApexCharts(document.querySelector("#avgKPIChart"), options);
      avgKPIChart.render();


    //=================================
    // Attendance Ratio
    //=================================
    // Chart options for responsive rendering
  var options = {
    chart: {
      type: 'pie',
      height: '200%', // Make chart height dynamic
      width: '100%', // Make chart width dynamic
      animations: {
        enabled: true,
        easing: 'easeinout',
        dynamicAnimation: {
          speed: 350
        }
      },
      responsive: [{
        breakpoint: 768, // Mobile breakpoint
        options: {
          chart: {
            height: '200%' // Smaller height for mobile screens
          }
        }
      }]
    },
    series: [60, 40],
    labels: ['Present', 'Absent'],
    colors: ['#00EEAA', '#FF5050'],
    plotOptions: {
      pie: {
        donut: {
          size: '75%'
        }
      }
    },
    legend: {
      position: 'bottom'
    }
  };

  var attendanceRatioChart = new ApexCharts(document.querySelector("#attendanceRatioChart"), options);
  attendanceRatioChart.render();

  // Automatically resize chart on window resize
  window.addEventListener('resize', function() {
    attendanceRatioChart.updateOptions({
      chart: {
        height: '200%',
        width: '100%'
      }
    });
  });


//===========================
// Employee Growth Curve
//==========================
var options = {
  chart: {
    type: 'line',
    height: '200%',
  },
  series: [{
    name: 'Employees',
    data: [50, 55, 60, 70, 80, 90]
  }],
  xaxis: {
    categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    title: {
      text: 'Months'
    }
  },
  yaxis: {
    title: {
      text: 'Employees'
    },
    min: 0,
    max: 100
  },
  colors: ['#007bff'],
  stroke: {
    curve: 'smooth',
  },
  markers: {
    size: 5,
  }
};

var employeeGrowthCurveChart = new ApexCharts(document.querySelector("#employeeGrowthCurve"), options);
employeeGrowthCurveChart.render();

//===================================
// Contract Expiry
//===================================
var options = {
  chart: {
    type: 'bar',
    height: 300,
    stacked: false,
    toolbar: {
      show: false
    }
  },
  series: [{
    name: 'Expiring Contracts',
    data: [5, 8, 3, 6, 10, 2, 7, 8, 1, 4, 9, 8]
  }],
  xaxis: {
    title: {
      text: 'Months'
    },
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yaxis: {
    title: {
      text: 'Number of Contracts'
    },
    min: 0
  },
  colors: ['#ff6384'],
  plotOptions: {
    bar: {
      horizontal: false,
    }
  }
};

var contractExpiryChart = new ApexCharts(document.querySelector("#contractExpiry"), options);
contractExpiryChart.render();

//=============================
// Employee Cost over sales
//=============================
var options = {
    chart: {
      height: 415,
      type: 'bar',
    },
    series: [{
      name: 'Employee Cost',
      type: 'column',
      data: [45000, 55000, 65000, 70000, 80000, 20000, 60000, 55000, 85000, 60000, 40000, 70000]
    }, {
      name: 'Sales Revenue',
      type: 'line',
      data: [100000, 120000, 140000, 160000, 180000, 120000, 160000, 150000, 100000, 150000,  120000, 180000]
  
    }],
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: [{
      title: {
        text: 'Employee Cost'
      },
    }, {
      opposite: true,
      title: {
        text: 'Sales Revenue'
      }
    }],
    colors: ['#4bc0c0', '#ff6384'],
    plotOptions: {
      bar: {
        opacity: 0.8, // Make bars slightly transparent to highlight the line
      }
    },
    stroke: {
      width: [0, 4], // Width of line (index 1) is 4px, width of bars (index 0) is 0 (bars don't need stroke)
    },
    markers: {
      size: 6, // Make the markers on the line larger for visibility
      colors: ['#ff6384'], // Match line color for consistency
    },
    dataLabels: {
      enabled: false // Disable data labels for a cleaner look
    }
  };
  
  var employeeCostSalesChart = new ApexCharts(document.querySelector("#employeeCostSalesChart"), options);
  employeeCostSalesChart.render();

//=======================================  
//Culture and Value Saturation
//=======================================
var options = {
    chart: {
      type: 'radar',
      height: 400,
    },
    series: [{
      name: '2024',
      data: [75, 85, 70, 90, 80, 85]
    }, {
      name: '2023',
      data: [60, 70, 65, 80, 75, 70]
    }, {
      name: '2022',
      data: [50, 65, 60, 70, 65, 60]
    }],
    labels: ['Service', 'Innovation', 'Team Spirit', 'Diversity', 'Growth', 'Engagement'],
    colors: ['#4bc0c0', '#ff6384', '#9966ff']
  };
  
  var cultureValueSaturationChart = new ApexCharts(document.querySelector("#cultureValueSaturation"), options);
  cultureValueSaturationChart.render();



})