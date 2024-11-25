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
    });

    //=====================================
    // Maintenance
    //=====================================
    // Maintenance data
    let maintenanceData = [
        { date: '2023-01-01', reactive: 15, proactive: 20, suspended: 5 },
        { date: '2023-06-01', reactive: 30, proactive: 45, suspended: 10 },
        { date: '2023-12-01', reactive: 25, proactive: 40, suspended: 15 },
    ];

    // Function to filter data by date range
    function filterDataByDate(startDate, endDate) {
        return maintenanceData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });
    }

    // Function to update the chart with filtered data
    function updateChart(filteredData) {
        const reactiveSum = filteredData.reduce((sum, entry) => sum + entry.reactive, 0);
        const proactiveSum = filteredData.reduce((sum, entry) => sum + entry.proactive, 0);
        const suspendedSum = filteredData.reduce((sum, entry) => sum + entry.suspended, 0);

        chart.updateSeries([{
            name: 'Maintenance',
            data: [reactiveSum, proactiveSum, suspendedSum]
        }]);
    }

    // Event listener function to automatically update on date change
    function handleDateChange() {
        const startDate = document.getElementById('maintenance_start_date').value;
        const endDate = document.getElementById('maintenance_end_date').value;

        if (startDate && endDate) {
            const filteredData = filterDataByDate(startDate, endDate);
            updateChart(filteredData);
        }
    }

    // Set default dates on page load
    function setDefaultDates() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        document.getElementById('maintenance_start_date').value = '2023-01-01'; // Set default start date
        document.getElementById('maintenance_end_date').value = today; // Set default end date to today
    }

    // Add event listeners to the date inputs for automatic update
    document.getElementById('maintenance_start_date').addEventListener('change', handleDateChange);
    document.getElementById('maintenance_end_date').addEventListener('change', handleDateChange);

    // Initialize chart options
    const options = {
        series: [{
            name: 'Maintenance',
            data: [0, 0, 0] // Placeholder data; will be updated with actual filtered data
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['Reactive', 'Proactive', 'Suspended'],
            title: {
                text: 'Count'
            }
        },
        colors: ['#00B67C', '#00B67C', '#00B67C'],
        title: {
            text: 'Maintenance Types',
            align: 'center'
        }
    };

    // Render the maintenance chart
    const chart = new ApexCharts(document.querySelector("#maintenance"), options);
    chart.render();

    //=====================================
    // Work Order
    //=====================================
    let workOrderData = [
        { date: '2023-01-01', priority: 10, high: 15, low: 5 },
        { date: '2023-06-01', priority: 25, high: 20, low: 10 },
        { date: '2023-12-01', priority: 30, high: 40, low: 15 },
    ];

    // Function to filter work order data by date range
    function filterWorkOrderDataByDate(startDate, endDate) {
        return workOrderData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });
    }

    // Function to update the work order chart with filtered data
    function updateWorkOrderChart(filteredData) {
        const prioritySum = filteredData.reduce((sum, entry) => sum + entry.priority, 0);
        const highSum = filteredData.reduce((sum, entry) => sum + entry.high, 0);
        const lowSum = filteredData.reduce((sum, entry) => sum + entry.low, 0);

        workOrderChart.updateSeries([{
            name: 'Work Orders',
            data: [prioritySum, highSum, lowSum]
        }]);
    }

    // Event listener function to automatically update the chart on date change
    function handleWorkOrderDateChange() {
        const startDate = document.getElementById('workorder_start_date').value;
        const endDate = document.getElementById('workorder_end_date').value;

        if (startDate && endDate) {
            const filteredData = filterWorkOrderDataByDate(startDate, endDate);
            updateWorkOrderChart(filteredData);
        }
    }

    // Set default dates for work order chart
    function setWorkOrderDefaultDates() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        document.getElementById('workorder_start_date').value = '2023-01-01'; // Set default start date
        document.getElementById('workorder_end_date').value = today; // Set default end date to today
    }

    // Add event listeners to the date inputs for automatic update
    document.getElementById('workorder_start_date').addEventListener('change', handleWorkOrderDateChange);
    document.getElementById('workorder_end_date').addEventListener('change', handleWorkOrderDateChange);

    // Initialize chart options for work orders
    const workOrderOptions = {
        series: [{
            name: 'Work Orders',
            data: [0, 0, 0] // Placeholder data; will be updated with actual filtered data
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false, // Set to false to make it vertical
                distributed: true, // This will color each bar individually
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: ['Priority', 'High', 'Low'], // Categories for the vertical bars
            title: {
                text: 'Work Order Types'
            }
        },
        yaxis: {
            title: {
                text: 'Count'
            }
        },
        colors: ['#FF0000', '#FF4500', '#0000FF'], // Colors for Priority, High, Low
    };

    // Render the work order chart
    const workOrderChart = new ApexCharts(document.querySelector("#work-order-chart"), workOrderOptions);
    workOrderChart.render();

    // Initialize default date values for both charts
    setDefaultDates();
    setWorkOrderDefaultDates();

    // Trigger initial chart updates based on default date values
    handleDateChange();
    handleWorkOrderDateChange();


    // ===============================
    // Perfomance
    // ===============================
    // Sample TTR data with date, closed on time, and delay counts
    let ttrData = [
        { date: '2023-01-01', closedOnTime: 20, delay: 5 },
        { date: '2023-06-01', closedOnTime: 30, delay: 15 },
        { date: '2023-12-01', closedOnTime: 50, delay: 20 },
        // Add more data points as needed
    ];
    
    // Function to filter TTR data by date range
    function filterTTRDataByDate(startDate, endDate) {
        return ttrData.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });
    }
    
    // Function to update the TTR chart with filtered data
    function updateTTRChart(filteredData) {
        const closedOnTimeSum = filteredData.reduce((sum, entry) => sum + entry.closedOnTime, 0);
        const delaySum = filteredData.reduce((sum, entry) => sum + entry.delay, 0);
    
        ttrChart.updateSeries(
            [closedOnTimeSum, delaySum],
            true // Enables animation when updating series
        );
    }
    
    // Function to handle date changes and update the chart
    function handleTTRDateChange() {
        const startDate = document.getElementById('p_start_date').value;
        const endDate = document.getElementById('p_end_date').value;
    
        if (startDate && endDate) {
            const filteredData = filterTTRDataByDate(startDate, endDate);
            updateTTRChart(filteredData);
        }
    }
    
    // Add event listeners to the date inputs for automatic update
    document.getElementById('p_start_date').addEventListener('change', handleTTRDateChange);
    document.getElementById('p_end_date').addEventListener('change', handleTTRDateChange);
    
    // Initial chart setup for TTR with a pie chart
    const ttrOptions = {
        series: [0, 0], // Placeholder data; will be updated with actual filtered data
        chart: {
            type: 'pie',
            height: 350,
            animations: {
                enabled: true,
                easing: 'easeinout', // Type of easing (e.g., easein, easeout, linear)
                speed: 800,         // Animation duration in milliseconds
                animateGradually: {
                    enabled: true,  // Gradual animation for individual data points
                    delay: 150      // Delay between each point's animation
                },
                dynamicAnimation: {
                    enabled: true,  // Enable animation when updating data
                    speed: 1000     // Animation duration during updates
                }
            },
        },
        labels: ['Closed on Time', 'Delay'], // Labels for pie chart
        colors: ['#4CAF50', '#F44336'], // Colors for Closed on Time and Delay
    };
    
    // Render the initial TTR chart
    const ttrChart = new ApexCharts(document.querySelector("#performance"), ttrOptions);
    ttrChart.render();
    
    // Set default dates and update the chart on page load
    window.onload = function () {
        const startDateInput = document.getElementById('p_start_date');
        const endDateInput = document.getElementById('p_end_date');
    
        // Set default values for start and end dates (if not already set in HTML)
        if (!startDateInput.value) startDateInput.value = '2023-01-01';
        if (!endDateInput.value) endDateInput.value = '2024-01-01';
    
        // Trigger the date change handler to update the chart
        handleTTRDateChange();
    };
    

    
    // =============================
    // Inventory
    // =============================
    // Sample inventory data with date, atThreshold, and atRisk counts
let inventoryData = [
    { date: '2023-01-01', atThreshold: 10, atRisk: 5 },
    { date: '2023-06-01', atThreshold: 15, atRisk: 8 },
    { date: '2023-12-01', atThreshold: 20, atRisk: 12 },
    // Add more data points as needed
];

// Function to filter inventory data by date range
function filterInventoryDataByDate(startDate, endDate) {
    return inventoryData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
    });
}

// Function to update the inventory chart with filtered data
function updateInventoryChart(filteredData) {
    const atThresholdSum = filteredData.reduce((sum, entry) => sum + entry.atThreshold, 0);
    const atRiskSum = filteredData.reduce((sum, entry) => sum + entry.atRisk, 0);

    inventoryChart.updateSeries([
        {
            name: 'At Threshold',
            data: [atThresholdSum],
        },
        {
            name: 'At Risk',
            data: [atRiskSum],
        },
    ]);
}

// Function to handle date changes and update the chart
function handleInventoryDateChange() {
    const startDate = document.getElementById('i_start_date').value;
    const endDate = document.getElementById('i_end_date').value;

    if (startDate && endDate) {
        const filteredData = filterInventoryDataByDate(startDate, endDate);
        updateInventoryChart(filteredData);
    }
}

// Add event listeners to the date inputs for automatic updates
document.getElementById('i_start_date').addEventListener('change', handleInventoryDateChange);
document.getElementById('i_end_date').addEventListener('change', handleInventoryDateChange);

// Initial chart setup for inventory data with a bar chart
const inventoryOptions = {
    series: [
        { name: 'At Threshold', data: [0] }, // Placeholder for "At Threshold"
        { name: 'At Risk', data: [0] }, // Placeholder for "At Risk"
    ],
    chart: {
        type: 'bar',
        height: 350,
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false, // Vertical bars
            columnWidth: '50%',
        },
    },
    dataLabels: {
        enabled: true,
    },
    xaxis: {
        categories: ['Inventory Levels'], // Single category for both series
        title: {
            text: 'Inventory Categories',
        },
    },
    yaxis: {
        title: {
            text: 'Count of Items',
        },
    },
    colors: ['#FFC107', '#FF5722'], // Colors for At Threshold and At Risk
    legend: {
        position: 'top',
    },
};

// Render the inventory chart
const inventoryChart = new ApexCharts(document.querySelector("#inventory-chart"), inventoryOptions);
inventoryChart.render();

// Set default dates and update the chart on page load
window.onload = function () {
    const startDateInput = document.getElementById('i_start_date');
    const endDateInput = document.getElementById('i_end_date');

    // Set default values for start and end dates (if not already set in HTML)
    if (!startDateInput.value) startDateInput.value = '2023-01-01';
    if (!endDateInput.value) endDateInput.value = '2023-12-31';

    // Trigger the date change handler to update the chart
    handleInventoryDateChange();
};


});
