
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  return (
    <section className="py-16 bg-market-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">Get the LocalMarket Connect App</h2>
            <p className="mt-4 text-blue-100 max-w-md">
              Download our mobile app to discover local products, get real-time notifications, and connect with shops around you.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="secondary" size="lg" className="flex items-center space-x-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.954 11.616L6.974 5.637L16.526 0.636L12.954 11.616ZM4.635 6.628L4.194 7.069C3.138 8.124 3.138 9.867 4.194 10.923L10.374 17.103L5.933 19.365L0.636 14.069L4.635 6.628ZM17.5 15.954L19.365 14.775L18.925 19.365L14.372 14.812L17.5 15.954ZM14.954 12.654L18.437 1.636L23.364 6.563L14.954 12.654Z" fill="currentColor"/>
                </svg>
                <span>Google Play</span>
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center space-x-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.495 0.617C14.775 0.718 12.927 1.898 11.819 3.555C10.891 4.936 10.089 6.951 10.391 8.891C12.297 8.942 14.279 7.743 15.345 6.066C16.398 4.431 17.036 2.407 16.495 0.617ZM21.547 8.457C20.649 9.454 19.383 10.101 18.016 10.101C16.253 10.101 15.307 9.052 13.896 9.052C12.445 9.052 11.294 10.101 9.858 10.101C8.329 10.101 6.913 9.286 6.012 8.06C4.574 6.112 4.507 2.434 6.774 0.646C7.941 -0.267 9.559 -0.221 10.693 0.595C11.587 1.268 12.174 1.268 13.089 0.595C14.367 -0.286 15.76 -0.332 17.103 0.396C14.137 1.47 14.582 5.77 17.749 6.434C17.107 7.222 16.424 8.097 15.584 8.676C14.235 9.586 13.298 9.286 12.035 8.661C10.889 8.097 9.944 8.041 8.673 8.661C8.309 8.844 7.982 9.072 7.668 9.336C7.668 10.184 7.751 11.032 7.918 11.851C8.208 13.362 8.774 14.799 9.59 16.095C10.322 17.215 10.889 17.857 11.739 18.073C12.55 18.274 13.319 18.130 14.006 17.857C14.705 17.578 15.442 17.334 16.37 17.339C17.298 17.343 18.021 17.583 18.724 17.857C19.422 18.125 20.186 18.274 20.997 18.068C22.018 17.813 22.839 16.714 23.303 16.095C23.785 15.356 24.3 14.101 24 12.65C23.714 11.739 23.17 11.102 22.538 10.563C22.293 10.328 22.034 10.101 21.761 9.882C21.691 9.406 21.607 8.927 21.547 8.457ZM16.223 19.813C15.807 21.495 14.546 23.287 12.946 23.337C11.977 23.362 11.347 22.893 10.456 22.893C9.564 22.893 8.934 23.337 8.026 23.362C6.524 23.412 5.061 21.411 4.63 19.737C3.794 16.511 4.463 10.816 6.832 7.585C6.072 10.601 6.574 13.522 8.016 15.688C9.353 17.657 12.101 19.2 14.331 17.802C14.849 18.514 15.489 19.272 16.223 19.813Z" fill="currentColor"/>
                </svg>
                <span>App Store</span>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <img 
              src="https://placehold.co/600x800/3B82F6/FFFFFF?text=App+Screenshot" 
              alt="LocalMarket Connect App" 
              className="mx-auto h-96 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
