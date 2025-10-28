// JSON structure for dashboard categories and widgets
export interface Widget {
  id: string
  name: string
  text: string
  category: string
  chartData?: {
    labels: string[]
    values: number[]
    colors: string[]
  }
}

export interface Category {
  id: string
  name: string
  widgets: Widget[]
}

export interface DashboardData {
  categories: Category[]
}

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: "cspm-executive",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          text: "Connected (2) | Not Connected (2)",
          category: "cspm-executive",
          chartData: {
            labels: ["Connected", "Not Connected"],
            values: [2, 2],
            colors: ["#3b82f6", "#e5e7eb"],
          },
        },
        {
          id: "cloud-risk-assessment",
          name: "Cloud Account Risk Assessment",
          text: "9659 Total",
          category: "cspm-executive",
          chartData: {
            labels: ["Passed", "Warning", "Failed", "Not available"],
            values: [7253, 681, 1689, 36],
            colors: ["#10b981", "#f59e0b", "#ef4444", "#9ca3af"],
          },
        },
      ],
    },
    {
      id: "cwpp-dashboard",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          text: "Alert Distribution",
          category: "cwpp-dashboard",
          chartData: {
            labels: ["Critical", "High", "Medium", "Low"],
            values: [12, 28, 45, 15],
            colors: ["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"],
          },
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          text: "Workload Status",
          category: "cwpp-dashboard",
          chartData: {
            labels: ["Healthy", "Warning", "Critical"],
            values: [156, 42, 8],
            colors: ["#10b981", "#f59e0b", "#ef4444"],
          },
        },
      ],
    },
    {
      id: "registry-scan",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          text: "1470 Total Vulnerabilities",
          category: "registry-scan",
          chartData: {
            labels: ["Critical", "High", "Medium", "Low"],
            values: [9, 150, 320, 991],
            colors: ["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"],
          },
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          text: "2 Total images",
          category: "registry-scan",
          chartData: {
            labels: ["Secure", "Critical", "High"],
            values: [0, 2, 0],
            colors: ["#10b981", "#dc2626", "#ea580c"],
          },
        },
      ],
    },
  ],
}
