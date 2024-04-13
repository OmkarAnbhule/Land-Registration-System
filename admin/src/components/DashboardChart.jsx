import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const DashboardChart = ({ stats }) => {
    useEffect(() => {
        drawChart(stats);
    }, [stats]);

    const drawChart = (stats) => {
        const ctx = document.getElementById('dashboardChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(stats),
                datasets: [{
                    label: 'Dashboard Stats',
                    data: Object.values(stats),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <div className="dashboard-chart-container">
            <canvas id="dashboardChart" width="400" height="400"></canvas>
        </div>
    );
};

export default DashboardChart;
