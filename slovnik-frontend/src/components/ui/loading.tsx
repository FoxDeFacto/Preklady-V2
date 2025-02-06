export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 w-64 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
        
        <div className="flex gap-4 mb-8">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
  
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 bg-gray-100 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }