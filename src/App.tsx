import { useState } from "react"
import { initialDashboardData, type DashboardData, type Widget } from "./utils/dashboardData"
import Dashboard from "./components/dashboard"
import AddWidgetPanel from "./components/addWidget"

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData)
  const [showAddWidget, setShowAddWidget] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleAddWidget = (categoryId: string, widget: Omit<Widget, "id" | "category">) => {
    setDashboardData((prev) => ({
      categories: prev.categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            widgets: [
              ...cat.widgets,
              {
                ...widget,
                id: `widget-${Date.now()}`,
                category: categoryId,
              },
            ],
          }
        }
        return cat
      }),
    }))
    setShowAddWidget(false)
  }

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    setDashboardData((prev) => ({
      categories: prev.categories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            widgets: cat.widgets.filter((w) => w.id !== widgetId),
          }
        }
        return cat
      }),
    }))
  }

  const handleOpenAddWidget = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setShowAddWidget(true)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard data={dashboardData} onRemoveWidget={handleRemoveWidget} onOpenAddWidget={handleOpenAddWidget} />

      {showAddWidget && selectedCategory && (
        <AddWidgetPanel
          categoryId={selectedCategory}
          categories={dashboardData.categories}
          onAddWidget={handleAddWidget}
          onClose={() => setShowAddWidget(false)}
        />
      )}
    </main>
  )
}
