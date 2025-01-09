import Chart from "chart.js/auto";

export interface DatasetInfo {
  label: string;
  data: number[]
}

export interface DataChart {
  labels: string[];
  datasets: Array<DatasetInfo>;
}

export function formatData(labels: string[], data: number[]): DataChart {
  return {
    labels,
    datasets: [{
      label: "Result of the query",
      data
    }]
  }
}

export function getChart(canvas: HTMLCanvasElement, data: DataChart | null = null): Chart<"bar"> {
  const DEFAULT_DATA: DataChart = {
    labels: ["Sadness", "Joy", "Love", "Anger", "Fear", "Surprise"],
    datasets: [{
      label: "Result of the query",
      data: [0, 0, 0, 0, 0, 0]
    }]
  }
  if (data === null) data = DEFAULT_DATA;
  return new Chart(canvas, {
    type: "bar",
    data
  });
}