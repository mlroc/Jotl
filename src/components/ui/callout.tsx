import { cn } from '@/lib/utils'
import { Info, AlertTriangle, Lightbulb } from 'lucide-react'

const iconMap = {
  default: <Info className="size-5" />,
  info: <Info className="size-5" />,
  warning: <AlertTriangle className="size-5" />,
  idea: <Lightbulb className="size-5" />,
}

const colorMap = {
  default: 'border-blue-500/50 bg-blue-500/10 text-blue-800 dark:text-blue-200',
  info: 'border-sky-500/50 bg-sky-500/10 text-sky-800 dark:text-sky-200',
  warning: 'border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-200',
  idea: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
}

interface CalloutProps {
  children: React.ReactNode
  type?: keyof typeof iconMap
  className?: string
}

export function Callout({ children, type = 'default', className }: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 flex items-start gap-4 rounded-lg border p-4 shadow-sm',
        colorMap[type],
        className
      )}
    >
      <div className="mt-1 flex-shrink-0">{iconMap[type]}</div>
      <div className="prose-p:m-0 prose-strong:m-0">{children}</div>
    </div>
  )
} 