import { Search, Plus } from "lucide-react"
import { useState } from "react"
import type { DashboardData } from "../utils/dashboardData"
import WidgetCard from "./widgetCard"

interface DashboardProps {
    data: DashboardData
    onRemoveWidget: (categoryId: string, widgetId: string) => void
    onOpenAddWidget: (categoryId: string) => void
}

export default function Dashboard({ data, onRemoveWidget, onOpenAddWidget }: DashboardProps) {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredCategories = data.categories.map((cat) => ({
        ...cat,
        widgets: cat.widgets.filter(
            (widget) =>
                widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                widget.text.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    }))

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                        {/* Search Bar */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search widgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredCategories.map((category) => (
                    <section key={category.id} className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">{category.name}</h2>

                        {category.widgets.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                <p className="text-gray-500 mb-4">No widgets in this category</p>
                                <button
                                    onClick={() => onOpenAddWidget(category.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Widget
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.widgets.map((widget) => (
                                    <WidgetCard key={widget.id} widget={widget} onRemove={() => onRemoveWidget(category.id, widget.id)} />
                                ))}

                                <button
                                    onClick={() => onOpenAddWidget(category.id)}
                                    className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                                >
                                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                                    <span className="text-gray-600 group-hover:text-blue-600 font-medium">Add Widget</span>
                                </button>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    )
}
