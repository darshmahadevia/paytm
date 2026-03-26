export default function Card({ title, subtitle, children }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 w-[420px] shadow-2xl shadow-blue-500/5">
        <h1 className="text-3xl font-bold text-white text-center mb-1 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 text-center text-sm mb-8">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
