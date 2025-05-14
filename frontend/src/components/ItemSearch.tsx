import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FiGrid, 
  FiList, 
  FiMap, 
  FiSliders, 
  FiX, 
  FiChevronDown, 
  FiChevronUp,
  FiDollarSign,
  FiMapPin,
  FiStar,
  FiFilter,
  FiSearch
} from 'react-icons/fi';

// Mock data - In a real app, this would come from an API
const mockItems = [
  { id: 1, name: 'Vintage Polaroid Camera', shop: 'RetroTech', shopId: 1, category: 'Electronics', price: 75, distance: 0.8, rating: 4.5, image: '/img/camera.jpg' },
  { id: 2, name: 'Handcrafted Leather Journal', shop: 'Craftsman\'s Corner', shopId: 2, category: 'Home Goods', price: 35, distance: 1.2, rating: 4.8, image: '/img/journal.jpg' },
  { id: 3, name: 'Limited Edition Vinyl Record', shop: 'Sound Haven', shopId: 3, category: 'Collectibles', price: 45, distance: 2.5, rating: 4.3, image: '/img/vinyl.jpg' },
  { id: 4, name: 'Antique Brass Compass', shop: 'Timeless Treasures', shopId: 4, category: 'Vintage', price: 60, distance: 3.1, rating: 4.7, image: '/img/compass.jpg' },
  { id: 5, name: 'Mechanical Typewriter', shop: 'RetroTech', shopId: 1, category: 'Vintage', price: 120, distance: 0.8, rating: 4.2, image: '/img/typewriter.jpg' },
  { id: 6, name: 'Artisan Ceramic Mug Set', shop: 'Craftsman\'s Corner', shopId: 2, category: 'Home Goods', price: 48, distance: 1.2, rating: 4.6, image: '/img/mugs.jpg' },
  { id: 7, name: 'Hand-bound Poetry Book', shop: 'Book Nook', shopId: 5, category: 'Books', price: 25, distance: 0.5, rating: 4.9, image: '/img/book.jpg' },
  { id: 8, name: 'Vintage Film Posters', shop: 'Timeless Treasures', shopId: 4, category: 'Collectibles', price: 30, distance: 3.1, rating: 4.4, image: '/img/poster.jpg' },
];

const mockShops = [
  { id: 1, name: 'RetroTech' },
  { id: 2, name: 'Craftsman\'s Corner' },
  { id: 3, name: 'Sound Haven' },
  { id: 4, name: 'Timeless Treasures' },
  { id: 5, name: 'Book Nook' },
];

const mockCategories = [
  'All Categories',
  'Electronics',
  'Home Goods',
  'Collectibles',
  'Vintage',
  'Books',
  'Handmade'
];

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    shop: string;
    shopId: number;
    category: string;
    price: number;
    distance: number;
    rating: number;
    image: string;
  };
  viewType: 'grid' | 'list';
}

const ItemCard: React.FC<ItemCardProps> = ({ item, viewType }) => {
  if (viewType === 'grid') {
    return (
      <Link to={`/item/${item.id}`} className="group">
        <div className="bg-gray-100 h-48 rounded-lg mb-3 overflow-hidden group-hover:opacity-90 transition">
          {/* In a real app, this would be an actual image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
            <span>{item.name}</span>
          </div>
        </div>
        <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">{item.name}</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">{item.shop}</div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1"><FiMapPin size={12} /></span>
            {item.distance} mi
          </div>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div className="font-medium text-blue-600">${item.price}</div>
          <div className="flex items-center text-sm text-amber-500">
            <span className="mr-1 fill-current"><FiStar size={14} /></span>
            {item.rating}
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/item/${item.id}`} className="flex group bg-white rounded-lg shadow hover:shadow-md p-4 transition">
        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          {/* In a real app, this would be an actual image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
            <span>Image</span>
          </div>
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">{item.name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="mr-3">{item.shop}</span>
            <div className="flex items-center">
              <span className="mr-1"><FiMapPin size={12} /></span>
              {item.distance} mi
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-blue-600">${item.price}</div>
            <div className="flex items-center text-sm text-amber-500">
              <span className="mr-1 fill-current"><FiStar size={14} /></span>
              {item.rating}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Category: {item.category}</div>
        </div>
      </Link>
    );
  }
};

const ItemSearch: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(window.innerWidth >= 768); // Show filters by default on desktop
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedShops, setSelectedShops] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  // Filtered items
  const [filteredItems, setFilteredItems] = useState(mockItems);

  // Apply filters
  useEffect(() => {
    let results = mockItems;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.shop.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Filter by price range
    results = results.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Filter by distance
    results = results.filter(item => item.distance <= maxDistance);
    
    // Filter by selected shops
    if (selectedShops.length > 0) {
      results = results.filter(item => selectedShops.includes(item.shopId));
    }
    
    // Sort results
    switch(sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'distance':
        results.sort((a, b) => a.distance - b.distance);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      // For relevance, we don't modify the order
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedCategory, priceRange, maxDistance, selectedShops, sortBy]);
  
  // Handle shop selection
  const toggleShop = (shopId: number) => {
    if (selectedShops.includes(shopId)) {
      setSelectedShops(selectedShops.filter(id => id !== shopId));
    } else {
      setSelectedShops([...selectedShops, shopId]);
    }
  };
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call or route change
  };

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowFilters(true);
        setMobileFilterOpen(false);
      } else {
        setShowFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiSearch size={18} />
              </div>
            </div>
            <button
              type="submit"
              className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="md:hidden bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg"
          >
            <span className="flex items-center">
              <span className="mr-2"><FiFilter /></span>
              Filters
            </span>
            {mobileFilterOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Filters Sidebar */}
          <div 
            className={`${
              mobileFilterOpen ? 'block' : 'hidden'
            } md:block w-full md:w-64 lg:w-72 md:mr-6`}
          >
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
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

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 gap-2">
                  <div className="flex items-center bg-gray-100 rounded px-2 py-1">
                    <span className="text-gray-500"><FiDollarSign size={14} /></span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-16 bg-transparent border-0 focus:outline-none p-1"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex items-center bg-gray-100 rounded px-2 py-1">
                    <span className="text-gray-500"><FiDollarSign size={14} /></span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-16 bg-transparent border-0 focus:outline-none p-1"
                    />
                  </div>
                </div>
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
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

              {/* Shop Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Shops</h4>
                <div className="max-h-48 overflow-y-auto">
                  {mockShops.map(shop => (
                    <div key={shop.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`shop-${shop.id}`}
                        checked={selectedShops.includes(shop.id)}
                        onChange={() => toggleShop(shop.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`shop-${shop.id}`} className="text-gray-700">
                        {shop.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setPriceRange([0, 200]);
                  setMaxDistance(10);
                  setSelectedShops([]);
                  setSortBy('relevance');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            {/* View Options and Sort */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-l-lg ${
                      viewType === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-r-lg ${
                      viewType === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FiList size={18} />
                  </button>

                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={`ml-2 p-2 rounded-lg flex items-center ${
                      showMap ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-1"><FiMap size={18} /></span>
                    <span className="text-sm">Map</span>
                  </button>
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-700">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
                {searchQuery ? ` for "${searchQuery}"` : ''}
              </p>
            </div>

            {/* Map View (conditionally rendered) */}
            {showMap && (
              <div className="bg-white rounded-lg shadow mb-4 p-4">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  {/* This would be replaced with an actual map component in a real app */}
                  <div className="text-center">
                    <div className="text-gray-500 mb-2">Map View</div>
                    <p className="text-sm text-gray-600 mb-4">In a real application, this would be an interactive map showing the locations of the items and shops.</p>
                    <Link to="/map" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      View Full Map
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid/List */}
            <div className={`grid gap-4 ${
              viewType === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <ItemCard key={item.id} item={item} viewType={viewType} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <div className="text-gray-500 mb-2">No items found</div>
                  <p className="text-sm text-gray-600">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;

