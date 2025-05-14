import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  FiMapPin, 
  FiPhone, 
  FiMessageCircle, 
  FiHeart, 
  FiShare2, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiStar,
  FiShoppingBag
} from 'react-icons/fi';

// Mock data for the item
const mockItem = {
  id: 1,
  name: 'Vintage Polaroid Camera',
  description: `This is a beautifully preserved Polaroid SX-70 from the 1970s. It's fully functional and produces stunning instant photos with that classic Polaroid look. The folding design is iconic and the leather exterior is in excellent condition with minimal wear.
  
  The camera comes with its original carrying case and a pack of new compatible film.
  
  Perfect for photography enthusiasts, collectors, or anyone who appreciates vintage technology and analog photography.`,
  price: 75,
  condition: 'Excellent - Fully functional',
  category: 'Electronics',
  tags: ['vintage', 'camera', 'polaroid', 'photography', 'collectible'],
  availability: 'In Stock',
  quantity: 1,
  dateAdded: '2025-04-15',
  shopId: 1,
  shopName: 'RetroTech',
  shopLocation: '123 Tech Lane, Downtown',
  shopDistance: 0.8,
  shopRating: 4.5,
  contactPhone: '(555) 123-4567',
  images: ['/img/camera_1.jpg', '/img/camera_2.jpg', '/img/camera_3.jpg', '/img/camera_4.jpg'],
};

// Mock data for related items
const relatedItems = [
  { 
    id: 2, 
    name: 'Vintage Film for Polaroid', 
    shop: 'RetroTech', 
    price: 24.99, 
    image: '/img/film.jpg'
  },
  { 
    id: 3, 
    name: 'Camera Cleaning Kit', 
    shop: 'PhotoSupplies', 
    price: 15.50, 
    image: '/img/cleaning_kit.jpg'
  },
  { 
    id: 4, 
    name: 'Leather Camera Case', 
    shop: 'Craftsman\'s Corner', 
    price: 35.00, 
    image: '/img/camera_case.jpg'
  },
  { 
    id: 5, 
    name: 'Vintage Photography Book', 
    shop: 'Book Nook', 
    price: 18.75, 
    image: '/img/photo_book.jpg'
  }
];

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch the item data based on the id parameter
  const [item, setItem] = useState(mockItem);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State for item quantity selection
  const [quantity, setQuantity] = useState(1);
  
  // Navigate through images
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <div className="flex justify-center"><FiXCircle size={60} /></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Item</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/" 
            className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/search" className="hover:text-blue-600">Search</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${item.category}`} className="hover:text-blue-600">{item.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{item.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: Image gallery */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Main image */}
              <div className="relative h-96 bg-gray-200">
                {/* In a real app, this would be actual image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400">
                    <div className="text-center">
                      <div className="text-xl mb-2">{item.name}</div>
                      <div>Image {currentImageIndex + 1} of {item.images.length}</div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>
              
              {/* Thumbnail navigation */}
              <div className="flex p-4 gap-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 bg-gray-100 flex-shrink-0 rounded overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {/* Thumbnail placeholder */}
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      Thumb {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Item description */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {item.description}
              </div>
              
              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column: Item details and actions */}
          <div className="lg:w-1/2">
            {/* Item header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-800">{item.name}</h1>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                    <FiHeart size={20} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                    <FiShare2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mt-2 text-3xl font-bold text-blue-600">${item.price.toFixed(2)}</div>
              
              {/* Availability */}
              <div className="mt-4 flex items-center">
                {item.availability === 'In Stock' ? (
                  <div className="flex items-center text-green-600">
                    <span className="mr-2"><FiCheckCircle /></span>
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <span className="mr-2"><FiXCircle /></span>
                    <span>Out of Stock</span>
                  </div>
                )}
                <div className="ml-4 text-sm text-gray-500">
                  Added on {formatDate(item.dateAdded)}
                </div>
              </div>
              
              {/* Item details */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Condition</div>
                    <div className="font-medium">{item.condition}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="font-medium">{item.category}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500">Quantity Available</div>
                    <div className="font-medium">{item.quantity} unit(s)</div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <label htmlFor="quantity" className="text-sm text-gray-500 block mb-1">Quantity</label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      {[...Array(item.quantity)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total</div>
                    <div className="font-semibold">${(item.price * quantity).toFixed(2)}</div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center">
                  <span className="mr-2"><FiMessageCircle size={18} /></span>
                  Contact Shop
                </button>
                
                <div className="flex gap-3">
                  <button className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center">
                    <span className="mr-2"><FiPhone size={18} /></span>
                    Call
                  </button>
                  <Link
                    to={`/shop/${item.shopId}`}
                    className="flex-1 py-3 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition flex items-center justify-center"
                  >
                    <span className="mr-2"><FiMapPin size={18} /></span>
                    Visit Shop
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Shop information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mr-4">
                  {/* Shop image placeholder */}
                  <span>Shop</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold text-lg">{item.shopName}</h2>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-1"><FiMapPin size={14} /></span>
                        <span>{item.shopLocation}</span>
                        <span className="mx-1">•</span>
                        <span>{item.shopDistance} miles away</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-amber-500">
                      <span className="mr-1 text-amber-500 fill-current"><FiStar size={18} /></span>
                      <span className="font-medium">{item.shopRating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex">
                    <Link
                      to={`/shop/${item.shopId}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <span>View Shop</span>
                      <span className="ml-1"><FiArrowRight size={16} /></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shop policies */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Shop Policies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium flex items-center text-gray-800">
                    <span className="mr-2 text-blue-600"><FiClock /></span>
                    Shipping
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 pl-6">
                    Items typically ship within 1-2 business days. Delivery usually takes 3-5 business days depending on your location.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center text-gray-800">
                    <span className="mr-2 text-blue-600"><FiCheckCircle /></span>
                    Returns
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 pl-6">
                    Returns accepted within 14 days of delivery. Item must be in original condition. Buyer is responsible for return shipping costs.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center text-gray-800">
                    <span className="mr-2 text-blue-600"><FiShoppingBag /></span>
                    Local Pickup
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 pl-6">
                    Local pickup is available at our store location. Please contact us to arrange a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Items Carousel */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          
          {/* Carousel navigation */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
              {relatedItems.map((relatedItem) => (
                <div key={relatedItem.id} className="flex-shrink-0 w-72">
                  <Link to={`/item/${relatedItem.id}`} className="block">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
                      {/* Item image placeholder */}
                      <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div>{relatedItem.name}</div>
                          <div className="text-sm">{relatedItem.image}</div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 truncate">{relatedItem.name}</h3>
                        <div className="text-sm text-gray-500 mt-1">{relatedItem.shop}</div>
                        <div className="mt-2 font-bold text-blue-600">${relatedItem.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Optional: Add left/right scroll buttons for the carousel */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition -ml-3 z-10 hidden md:block">
              <FiChevronLeft size={24} />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 transition -mr-3 z-10 hidden md:block">
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error boundary component for handling item loading errors
const ItemDetailErrorBoundary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<boolean>(false);
  
  // In a real app, we would use this component to catch errors
  // when fetching or displaying item data
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <div className="flex justify-center"><FiXCircle size={60} /></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the item you're looking for. It may have been removed or is temporarily unavailable.
          </p>
          <div className="space-y-3">
            <Link 
              to="/" 
              className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Return to Home
            </Link>
            <Link 
              to="/search" 
              className="block w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Search for Items
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return <ItemDetail />;
};

// Add some custom CSS for the carousel
const style = document.createElement('style');
style.innerHTML = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default ItemDetailErrorBoundary;
