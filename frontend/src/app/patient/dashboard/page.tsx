export default function DashboardPage() {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient Dashboard</h1>
          <p className="text-gray-600">
            Welcome to your Hygieia healthcare dashboard. Use the dock menu to navigate to different sections.
          </p>
        </div>
  
        {/* Content would go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <div className="h-32 bg-gray-100 rounded-md animate-pulse" />
              <div className="h-4 bg-gray-100 rounded mt-4 w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded mt-2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  