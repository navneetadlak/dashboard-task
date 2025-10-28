
import { useState } from "react"
import { X, Search } from "lucide-react"
import type { Widget, Category } from "../types/types"

interface AddWidgetPanelProps {
    categoryId: string
    categories: Category[]
    onAddWidget: (categoryId: string, widget: Omit<Widget, "id" | "category">) => void
    onClose: () => void
}

export default function AddWidgetPanel({ categoryId, categories, onAddWidget, onClose }: AddWidgetPanelProps) {
    const [widgetName, setWidgetName] = useState("")
    const [widgetText, setWidgetText] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(new Set())

    // Get all available widgets from all categories
    const allWidgets = categories.flatMap((cat) => cat.widgets)
    const filteredWidgets = allWidgets.filter(
        (widget) =>
            widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            widget.text.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleAddCustomWidget = () => {
        if (widgetName.trim()) {
            onAddWidget(categoryId, {
                name: widgetName,
                text: widgetText || "Widget content",
            })
            setWidgetName("")
            setWidgetText("")
        }
    }

    const handleToggleWidget = (widgetId: string) => {
        const newSelected = new Set(selectedWidgets)
        if (newSelected.has(widgetId)) {
            newSelected.delete(widgetId)
        } else {
            newSelected.add(widgetId)
        }
        setSelectedWidgets(newSelected)
    }

    const handleAddSelectedWidgets = () => {
        selectedWidgets.forEach((widgetId) => {
            const widget = allWidgets.find((w) => w.id === widgetId)
            if (widget && widget.category !== categoryId) {
                onAddWidget(categoryId, {
                    name: widget.name,
                    text: widget.text,
                })
            }
        })
        setSelectedWidgets(new Set())
        onClose()
    }

    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 z-40 transition-opacity" onClick={onClose} />
            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-1/2 bg-white z-50 shadow-lg overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Add Widget</h2>
                        <p className="text-sm text-gray-600 mt-1">Personalise your dashboard by adding the following widget</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Create Custom Widget Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Create New Widget</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Widget Name</label>
                            <input
                                type="text"
                                value={widgetName}
                                onChange={(e) => setWidgetName(e.target.value)}
                                placeholder="Enter widget name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Widget Text</label>
                            <textarea
                                value={widgetText}
                                onChange={(e) => setWidgetText(e.target.value)}
                                placeholder="Enter widget content"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                        <button
                            onClick={handleAddCustomWidget}
                            disabled={!widgetName.trim()}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            Add Custom Widget
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or select from existing</span>
                        </div>
                    </div>

                    {/* Search Existing Widgets */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search widgets..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Widget List */}
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredWidgets.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No widgets found</p>
                            ) : (
                                filteredWidgets.map((widget) => (
                                    <label
                                        key={widget.id}
                                        className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedWidgets.has(widget.id)}
                                            onChange={() => handleToggleWidget(widget.id)}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900">{widget.name}</p>
                                            <p className="text-sm text-gray-600 truncate">{widget.text}</p>
                                        </div>
                                    </label>
                                ))
                            )}
                        </div>

                        {selectedWidgets.size > 0 && (
                            <button
                                onClick={handleAddSelectedWidgets}
                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                Add {selectedWidgets.size} Widget{selectedWidgets.size !== 1 ? "s" : ""}
                            </button>
                        )}
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </>
    )
}
