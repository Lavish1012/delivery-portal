
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Shop Owner, Mehta Electronics",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial: "Since joining LocalMarket Connect, my shop's visibility has increased by 40%. Customers are discovering my products and I'm seeing more foot traffic than ever.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial: "I was looking for a specific camera lens and couldn't find it online. With LocalMarket Connect, I found it at a store just 2 km away from my home!",
    rating: 5
  },
  {
    name: "Ankit Patel",
    role: "Shop Owner, Patel Grocers",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    testimonial: "The inventory management system is so intuitive. It helps me keep track of stock and alerts customers when their favorite products are available.",
    rating: 4
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hear from shop owners and customers who are connecting through LocalMarket Connect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.testimonial}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
