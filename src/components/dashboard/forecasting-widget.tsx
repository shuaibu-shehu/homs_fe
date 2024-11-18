import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Line } from "react-chartjs-2";
import Button from "@mui/material/Button";

// Mock data generation for demonstration
const generateHistoricalData = (base, fluctuation, count) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 3600000); // Hourly data
    const value = Math.round(base + Math.random() * fluctuation - fluctuation / 2);
    data.push({ time, value });
  }
  return data;
};

// Replace this with actual data from your database
const historicalData = generateHistoricalData(200, 50, 50);

// Dummy forecast logic (replace with actual algorithm or backend integration)
const generateForecastData = (lastValue, fluctuation, count) => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() + i * 3600000); // Future hourly data
    const value = Math.round(lastValue + Math.random() * fluctuation - fluctuation / 2);
    data.push({ time, value });
    lastValue = value; // Continue from the last predicted value
  }
  return data;
};

export default function ForecastWidget() {
  const [forecast, setForecast] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Prepare data for the chart
    const historicalLabels = historicalData.map((point) => point.time.toLocaleString());
    const historicalValues = historicalData.map((point) => point.value);

    const forecastLabels = forecast.map((point) => point.time.toLocaleString());
    const forecastValues = forecast.map((point) => point.value);

    setChartData({
      labels: [...historicalLabels, ...forecastLabels],
      datasets: [
        {
          label: "Historical Consumption",
          data: historicalValues,
          borderColor: "rgba(0, 128, 255, 1)",
          backgroundColor: "rgba(0, 128, 255, 0.2)",
          tension: 0.4,
        },
        {
          label: "Forecasted Consumption",
          data: Array(historicalValues.length).fill(null).concat(forecastValues),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.4,
        },
      ],
    });
  }, [forecast]);

  const handleGenerateForecast = () => {
    const lastValue = historicalData[historicalData.length - 1].value;
    const forecastData = generateForecastData(lastValue, 30, 10); // 10 future points
    setForecast(forecastData);
  };

  return (
    <Paper style={{ padding: "20px", marginTop: "20px" }}>
      <h2>Oxygen Consumption Forecast</h2>
      <div style={{ marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleGenerateForecast}>
          Generate Forecast
        </Button>
      </div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Oxygen Consumption (Liters)",
              },
            },
          },
        }}
      />
    </Paper>
  );
}
