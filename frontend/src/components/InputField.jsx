export default function InputField({ label, placeholder, type, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 transition-all"
        type={type || 'text'}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
