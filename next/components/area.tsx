type AreaProps = {
  children: React.ReactNode
  title: string
}

export default function Area({children, title}: AreaProps) {
  return (
    <div className="h-full">
      <h1 className="mb-2 text-2xl font-bold text-center text-gray-400">{title}</h1>
      <div className="h-full p-10 border-2 border-dashed border-gray-400 rounded-2xl">
        {children}
      </div>
    </div>
  )
}