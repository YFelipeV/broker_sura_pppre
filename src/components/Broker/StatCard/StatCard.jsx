
export default function StatCard({ title, value, icon, color, subtitle }) {
  return (
    <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
                            <i className={`${icon} text-white text-lg`}></i>
                        </div>
                    </div>
                    <div className="ml-4 w-0 flex-1">
                        <dl>
                            <dt className="text-xs font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-xl font-bold text-gray-900">{value}</dd>
                            {subtitle && <dd className="text-xs text-gray-400 mt-0.5">{subtitle}</dd>}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
  )
}
