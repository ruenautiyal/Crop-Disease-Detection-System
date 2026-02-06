import { cn } from "@/lib/utils"

const severityConfig = {
  low: {
    label: "Low",
    className: "bg-emerald-100 text-emerald-800",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-100 text-amber-800",
  },
  high: {
    label: "High",
    className: "bg-orange-100 text-orange-800",
  },
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-800",
  },
}

export function SeverityBadge({
  severity,
  className,
}: {
  severity: string
  className?: string
}) {
  const config =
    severityConfig[severity as keyof typeof severityConfig] || severityConfig.low
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
