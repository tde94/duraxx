'use client'

import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface ExportExcelButtonProps {
  products: any[]
  categories: any[]
}

export default function ExportExcelButton({ products, categories }: ExportExcelButtonProps) {
  const handleExport = () => {
    // Map products to a clean format for Excel
    const data = products.map((p) => {
      const categoryTitle = categories.find((c) => c.id === p.category_id)?.title || 'Unknown'
      
      return {
        'Product Name': p.name,
        'Article Number': p.article_number,
        'Category': categoryTitle,
        'Stock Quantity': p.stock || 0,
        'Status': p.is_active ? 'Active' : 'Inactive',
        'Description': p.description || '',
      }
    })

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

    // Download the Excel file
    XLSX.writeFile(workbook, 'Duraxx_Products.xlsx')
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors shadow-sm"
      title="Export as Excel"
    >
      <Download className="h-4 w-4" />
      Export Excel
    </button>
  )
}
