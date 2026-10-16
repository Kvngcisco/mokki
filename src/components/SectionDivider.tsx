export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 px-4">
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-dark-border" />
      <div className="mx-4 w-1.5 h-1.5 rounded-full bg-gold/40" />
      <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-dark-border" />
    </div>
  )
}
