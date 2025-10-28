import { X } from "lucide-react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import type { Widget } from "../types/types"

ChartJS.register(ArcElement, Tooltip, Legend)

interface WidgetCardProps {
    widget: Widget
    onRemove: () => void
}

export default function WidgetCard({ widget, onRemove }: WidgetCardProps) {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: "bottom" as const,
                labels: {
                    font: {
                        size: 12,
                    },
                    padding: 12,
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.label}: ${context.parsed}`,
                },
            },
        },
    }

    const chartData = {
        labels: widget.chartData?.labels || [],
        datasets: [
            {
                data: widget.chartData?.values || [],
                backgroundColor: widget.chartData?.colors || [],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    }

    return (
        <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">{widget.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{widget.text}</p>
                </div>

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    className="flex-shrink-0 ml-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    aria-label="Remove widget"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Chart */}
            <div className="p-6">
                {widget.chartData ? (
                    <div className="h-64 flex items-center justify-center">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        <p className="text-sm">No chart data available</p>
                    </div>
                )}
            </div>
        </div>
    )
}
