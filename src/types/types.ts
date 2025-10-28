export type DashboardContextType = {
  categories: Category[]
  addWidget: (categoryId: string, widget: Widget) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  searchWidgets: (query: string) => Widget[]
}

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
