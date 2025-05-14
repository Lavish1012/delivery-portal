import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiMapPin, 
  FiChevronDown, 
  FiChevronUp, 
  FiStar, 
  FiPhone, 
  FiClock, 
  FiList,
  FiFilter,
  FiX,
  FiArrowRight
} from 'react-icons/fi';

// Mock data for shops - In a real app, this would come from an API
const mockShops = [
  { 
    id: 1, 
    name: 'RetroTech', 
    description: 'Vintage electronics and gadgets from the past. Find rare tech items and collectibles.',
    address: '123 Tech Lane, Downtown', 
    phone: '(555) 123-4567',
    hours: 'Mon-Sat: 10AM-7PM, Sun: 12PM-5PM',
    coordinates: { lat: 40.7128, lng: -74.0060 }, 
    distance: 0.8, 
    rating: 4.5,
    categories: ['Electronics', 'Vintage'],
    itemCount: 27,
    image: '/img/shops/retrotech.jpg' 
  },
  { 
    id: 2, 
    name: 'Craftsman\'s Corner', 
    description: 'Handcrafted goods made by local artisans. Unique items you won\'t find anywhere else.',
    address: '456 Artisan Ave, Midtown', 
    phone: '(555) 234-5678',
    hours: 'Tue-Sun: 11AM-6PM, Closed Monday',
    coordinates: { lat: 40.7308, lng: -73.9973 }, 
    distance: 1.2, 
    rating: 4.8,
    categories: ['Home Goods', 'Handmade'],
    itemCount: 42,
    image: '/img/shops/craftsmans.jpg' 
  },
  { 
    id: 3, 
    name: 'Sound Haven', 
    description: 'Musical instruments and rare vinyl records. A paradise for music enthusiasts.',
    address: '789 Melody Street, Arts District', 
    phone: '(555) 345-6789',
    hours: 'Mon-Sun: 9AM-8PM',
    coordinates: { lat: 40.7218, lng: -74.0110 }, 
    distance: 2.5, 
    rating: 4.3,
    categories: ['Music', 'Collectibles'],
    itemCount: 63,
    image: '/img/shops/soundhaven.jpg' 
  },
  { 
    id: 4, 
    name: 'Timeless Treasures', 
    description: 'Antiques and vintage collectibles from various eras. Find pieces with history and character.',
    address: '101 Heritage Road, Old Town', 
    phone: '(555) 456-7890',
    hours: 'Wed-Sun: 10AM-6PM, Closed Mon-Tue',
    coordinates: { lat: 40.7419, lng: -73.9900 }, 
    distance: 3.1, 
    rating: 4.7,
    categories: ['Antiques', 'Collectibles', 'Vintage'],
    itemCount: 89,
    image: '/img/shops/timeless.jpg' 
  },
  { 
    id: 5, 
    name: 'Book Nook', 
    description: 'Rare and out-of-print books. First editions and signed copies. Literary treasures await.',
    address: '222 Reader\'s Lane, University District', 
    phone: '(555) 567-8901',
    hours: 'Mon-Sun: 8AM-9PM',
    coordinates: { lat: 40.7300, lng: -74.0050 }, 
    distance: 0.5, 
    rating: 4.9,
    categories: ['Books', 'Collectibles'],
    itemCount: 112,
    image: '/img/shops/booknook.jpg' 
  },
];

const mockCategories = [
  'All Categories',
  'Electronics',
  'Home Goods',
  'Collectibles',
  'Vintage',
  'Books',
  'Handmade',
  'Music',
  'Antiques'
];

interface ShopCardProps {
  shop: typeof mockShops[0];
  isSelected: boolean;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, isSelected, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
      }`}
      onClick={onClick}
    >
      <div className="flex">
        <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
          {/* In a real app, this would be an actual image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>{shop.name}</span>
          </div>
        </div>
        
        <div className="ml-4 flex-grow">
          <h3 className="font-medium text-gray-800">{shop.name}</h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <div className="flex items-center mr-3">
              <span className="mr-1 flex items-center text-gray-600"><FiMapPin size={12} /></span>
              {shop.distance} miles
            </div>
            <div className="flex items-center text-amber-500">
              <span className="mr-1 flex items-center"><FiStar size={12} /></span>
              {shop.rating}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-1 truncate">
            {shop.address}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {shop.categories.slice(0, 2).map((category, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
            {shop.categories.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{shop.categories.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ShopPreviewProps {
  shop: typeof mockShops[0];
  onClose: () => void;
}

const ShopPreview: React.FC<ShopPreviewProps> = ({ shop, onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{shop.name}</h2>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>
      </div>
      
      <div className="h-40 bg-gray-200 rounded-md mb-4 overflow-hidden">
        {/* In a real app, this would be an actual image */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <span>Shop Image</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm">{shop.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-start">
          <span className="mt-1 mr-2 text-blue-500 flex items-center"><FiMapPin size={20} /></span>
          <div>
            <h4 className="text-sm font-medium">Address</h4>
            <p className="text-sm text-gray-600">{shop.address}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <span className="mt-1 mr-2 text-blue-500 flex items-center"><FiPhone size={20} /></span>
          <div>
            <h4 className="text-sm font-medium">Contact</h4>
            <p className="text-sm text-gray-600">{shop.phone}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <span className="mt-1 mr-2 text-blue-500 flex items-center"><FiClock size={20} /></span>
          <div>
            <h4 className="text-sm font-medium">Hours</h4>
            <p className="text-sm text-gray-600">{shop.hours}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <span className="mt-1 mr-2 text-blue-500 flex items-center"><FiList size={20} /></span>
          <div>
            <h4 className="text-sm font-medium">Inventory</h4>
            <p className="text-sm text-gray-600">{shop.itemCount} items</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div className="flex items-center text-amber-500">
          <span className="font-medium">{shop.rating}</span>
        </div>
        
        <Link 
          to={`/shop/${shop.id}`} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          View Shop <span className="ml-1 flex items-center"><FiArrowRight size={16} /></span>
        </Link>
      </div>
    </div>
  );
};

const ShopLocator: React.FC = () => {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [maxDistance, setMaxDistance] = useState(10);
  const [filteredShops, setFilteredShops] = useState(mockShops);
  
  // Map-related states
  const [selectedShop, setSelectedShop] = useState<typeof mockShops[0] | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mapIsReady, setMapIsReady] = useState(false);
  
  // Filter shops based on criteria
  useEffect(() => {
    let results = mockShops;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(shop => 
        shop.name.toLowerCase().includes(query) ||
        shop.categories.some(cat => cat.toLowerCase().includes(query)) ||
        shop.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      results = results.filter(shop => 
        shop.categories.includes(selectedCategory)
      );
    }
    
    // Filter by distance
    results = results.filter(shop => shop.distance <= maxDistance);
    
    // Sort by distance
    results.sort((a, b) => a.distance - b.distance);
    
    setFilteredShops(results);
  }, [searchQuery, selectedCategory, maxDistance]);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle shop selection
  const handleShopClick = (shop: typeof mockShops[0]) => {
    setSelectedShop(shop);
    
    // In a real app, this would also center the map on the shop's coordinates
  };
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this might trigger an API call or re-center the map
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Search and Filters Header */}
      <div className="bg-white shadow-sm border-b py-3 px-4">
        <div className="container mx-auto">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-3 text-gray-400">
                <span className="flex items-center"><FiSearch size={20} /></span>
              </div>
              <input
                type="text"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Search for shops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
            
            <button
              type="button"
              className="ml-2 p-3 border border-gray-300 rounded-lg lg:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <span className="text-gray-700 flex items-center"><FiFilter size={18} /></span>
            </button>
          </form>
          
          {/* Mobile filters dropdown */}
          <div className={`mt-3 lg:hidden ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
            <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
              {/* Category filter */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {mockCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Distance filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance (miles)
                </label>
                <div className="text-sm text-gray-600 mb-2">Within {maxDistance} miles</div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area with map and shop list */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar with filters and shop list (desktop only) */}
        <div className="hidden lg:block w-80 bg-white border-r overflow-y-auto">
          {/* Filters */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Category</h4>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {mockCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Distance Filter */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Distance (miles)</h4>
              <div className="text-sm text-gray-600 mb-2">Within {maxDistance} miles</div>
              <input
                type="range"
                min="1"
                max="20"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
              </div>
            </div>
          </div>
          
          {/* Shop list */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              {filteredShops.length} {filteredShops.length === 1 ? 'Shop' : 'Shops'} Found
            </h3>
            
            <div className="space-y-4">
              {filteredShops.map(shop => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  isSelected={selectedShop?.id === shop.id}
                  onClick={() => handleShopClick(shop)}
                />
              ))}
              
              {filteredShops.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No shops found with the current filters.</p>
                  <button
                    className="mt-2 text-blue-600 hover:underline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                      setMaxDistance(10);
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Map area */}
        <div className="flex-grow flex flex-col relative">
          {/* Map placeholder */}
          <div className="flex-grow bg-gray-200 relative">
            {!mapIsReady ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-500">Loading map...</div>
              </div>
            ) : (
              <div className="w-full h-full">
                {/* In a real app, this would be a map component like Google Maps or Mapbox */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500 max-w-md p-4">
                    <h3 className="text-lg mb-2">Map Placeholder</h3>
                    <p className="mb-4">
                      In a real application, this would be an interactive map showing shop locations
                      with markers. You would be able to click on markers to see shop details.
                    </p>
                    {filteredShops.length > 0 && (
                      <div className="bg-white rounded-lg shadow p-3 text-left">
                        <h4 className="font-medium text-gray-800">Shops on this map:</h4>
                        <ul className="text-sm text-gray-600 mt-1">
                          {filteredShops.slice(0, 3).map(shop => (
                            <li key={shop.id} className="mb-1">• {shop.name} ({shop.distance} miles)</li>
                          ))}
                          {filteredShops.length > 3 && (
                            <li>• and {filteredShops.length - 3} more...</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Shop markers would be placed here in a real implementation */}
                {filteredShops.map(shop => (
                  <div 
                    key={shop.id}
                    className="hidden" 
                    data-lat={shop.coordinates.lat}
                    data-lng={shop.coordinates.lng}
                  />
                ))}
              </div>
            )}
            
            {/* Mobile shop list (slides up from bottom) */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 max-h-[50%] bg-white rounded-t-lg shadow-lg overflow-y-auto">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {filteredShops.length} {filteredShops.length === 1 ? 'Shop' : 'Shops'} Found
                  </h3>
                  <button 
                    onClick={() => setSelectedShop(null)}
                    className="text-gray-500"
                  >
                    {selectedShop ? <FiX size={18} /> : null}
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {selectedShop ? (
                  <ShopPreview shop={selectedShop} onClose={() => setSelectedShop(null)} />
                ) : (
                  <div className="space-y-4">
                    {filteredShops.map(shop => (
                      <ShopCard
                        key={shop.id}
                        shop={shop}
                        isSelected={false}
                        onClick={() => handleShopClick(shop)}
                      />
                    ))}
                    
                    {filteredShops.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No shops found with the current filters.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Desktop shop preview */}
          {selectedShop && (
            <div className="hidden lg:block absolute top-4 right-4 w-96 z-10">
              <ShopPreview shop={selectedShop} onClose={() => setSelectedShop(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopLocator;

