import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-purple-300 mb-6">
      <Link href="/" className="flex items-center hover:text-purple-100 transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-purple-500" />
          {item.href ? (
            <Link href={item.href} className="hover:text-purple-100 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-purple-200">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
