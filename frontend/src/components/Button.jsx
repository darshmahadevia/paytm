export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="min-w-auto max-w-max bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 cursor-pointer"
    >
      {text}
    </button>
  )
}
