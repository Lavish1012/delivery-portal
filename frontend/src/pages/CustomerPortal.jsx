import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import CardAnimation from '../components/CardAnimation';
import TextAnimation from '../components/TextAnimation';
import ParallaxBackground from '../components/ParallaxBackground';

const featuredItems = [
  { id: 1, name: 'Fresh Apples', price: 120, image: '/images/apple.png' },
  { id: 2, name: 'Organic Milk', price: 60, image: '/images/milk.png' },
  { id: 3, name: 'Whole Wheat Bread', price: 40, image: '/images/bread.png' },
];

const CustomerPortal = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FAF6F2] to-[#F3ECE7] dark:from-[#1A1A1C] dark:to-[#2B2B2E] overflow-hidden">
      <ParallaxBackground />
      <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
        <TextAnimation text="Welcome, Customer!" className="text-4xl md:text-5xl font-extrabold mb-6 text-[#2D2D2D] dark:text-[#F2F2F2]" />
        <p className="text-xl text-[#6A6A6A] dark:text-[#BDBDBD] mb-10">Browse and order your favorite items here.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map(item => (
            <CardAnimation key={item.id}>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[#2D2D2D] dark:text-[#F2F2F2]">{item.name}</h3>
                <p className="text-lg text-[#D78D3A] dark:text-[#FFA94D] font-semibold mb-2">₹{item.price}</p>
                <button className="bg-[#D78D3A] hover:bg-[#c07c33] text-[#FAF6F2] px-6 py-2 rounded-lg font-semibold shadow-md dark:bg-[#FFA94D] dark:hover:bg-[#e89a45] dark:text-[#1A1A1C] transition-colors duration-200">Order Now</button>
              </div>
            </CardAnimation>
          ))}
        </div>
      </div>
      <AnimatedElement>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#BDBDBD] dark:text-[#6A6A6A] text-lg opacity-80">Enjoy seamless shopping with real-time updates and smooth animations!</div>
      </AnimatedElement>
    </div>
  );
};

export default CustomerPortal;