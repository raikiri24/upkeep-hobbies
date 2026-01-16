import React, { useState, useEffect, useMemo } from 'react';
import { LoadingScreen } from './LoadingScreen';
import { User, Product } from '../types';
import { Package, ExternalLink, AlertCircle, Search, Filter, X } from 'lucide-react';
import { api } from '../services/api';

interface ShopProps {
  user: User;
}

export const Shop: React.FC<ShopProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await api.getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
    return cats;
  }, [products]);

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // Price range filter
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  // Get price range from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 10000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  if (loading) {
    return <LoadingScreen message="Loading shop catalog..." size="large" />;
  }

  if (error) {
    return (
      <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center futuristic-grid">
        <div className="text-center">
          <AlertCircle className="text-neon-magenta mx-auto mb-4" size={48} />
          <p className="text-red-400 font-mono">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 glass-button text-cyan-300 rounded-lg hover:scale-105 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  const handleOrderClick = (productName: string, sku: string) => {
    const message = `Hi! I'm interested in ordering: ${productName} (SKU: ${sku})`;
    const facebookUrl = `https://www.facebook.com/messages/t/100083603391159/?text=${encodeURIComponent(message)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="shop-container h-full w-full bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* Floating Neon Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-15 animate-pulse"></div>
      
      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-pulse"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30 mt-20 animate-pulse"></div>
        <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-40 mt-40 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 h-full w-full flex flex-col min-h-0">
        {/* Fixed Header */}
        <div className="flex-shrink-0 w-full bg-black/50 backdrop-blur-md border-b border-cyan-500/20">
          <div className="text-center py-3 sm:py-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider mb-1 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Upkeep Hobbies Shop
            </h1>
            <p className="text-gray-400 text-xs sm:text-xs">
              Order via Facebook Messenger
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="px-4 pb-4 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} />
              <input
                type="text"
                placeholder="Search products, SKU, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 glass-input text-cyan-300 placeholder-cyan-500"
              />
            </div>
            
            {/* Filter Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-3 py-2 glass-input text-cyan-300 bg-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
                
                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="glass-button px-3 py-2 flex items-center gap-2 text-cyan-300"
                >
                  <Filter size={16} />
                  <span className="text-sm hidden sm:inline">Filters</span>
                </button>
              </div>
              
              {/* Results Count */}
              <span className="text-xs text-cyan-400 font-mono">
                {filteredProducts.length} / {products.length} items
              </span>
            </div>
            
            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="glass-card p-4 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-cyan-300">Price Range</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-cyan-400 w-20">Min:</span>
                    <input
                      type="number"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="flex-1 px-3 py-1 glass-input text-cyan-300 text-sm"
                    />
                    <span className="text-xs text-cyan-400">₱</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-cyan-400 w-20">Max:</span>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="flex-1 px-3 py-1 glass-input text-cyan-300 text-sm"
                    />
                    <span className="text-xs text-cyan-400">₱</span>
                  </div>
                  
                  {/* Price Range Slider */}
                  <div className="pt-2">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-cyan-400 mt-1">
                      <span>₱0</span>
                      <span>₱{maxPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange({ min: 0, max: maxPrice });
                  }}
                  className="w-full glass-button py-2 text-cyan-300 text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Container */}
        <div className="products-container flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Package className="text-cyan-400/50 mb-4" size={48} />
              <p className="text-cyan-300 font-mono">No products found</p>
              <p className="text-cyan-500 text-sm mt-2">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 py-2 w-full px-2 sm:px-6 md:px-12 auto-rows-max content-start">
              {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col min-h-[280px] sm:h-[340px] md:h-[360px] min-w-0"
              >
                 {/* Product Card */}
                 <div className="relative glass-card rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-cyan-500/20 overflow-hidden flex flex-col h-full futuristic-grid">
                  {/* Holographic Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                   {/* Stock Badges */}
                   {product.stock <= 2 && product.stock > 0 && (
                     <div className="absolute top-2 left-2 z-20">
                       <div className="glass-button bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse border border-red-400/50">
                         ⚡ LOW
                       </div>
                     </div>
                   )}
                  
                  <div className="absolute top-2 right-2 z-20">
                    <div className={`px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm border ${
                      product.stock > 0 
                        ? 'bg-green-500/90 text-white border-green-400/50' 
                        : 'bg-gray-500/90 text-white border-gray-400/50'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'SOLD OUT'}
                    </div>
                  </div>
                  
                   {/* Product Image Section */}
                   <div className="h-24 sm:h-36 md:h-40 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    {/* Tech Pattern Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,255,255,0.05)_50%,transparent_100%)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,255,0.05)_50%,transparent_52%)] bg-[size:20px_20px]"></div>
                    
                    {/* Product Image */}
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Package className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300 relative z-10" size={40} />
                    )}
                    
                     {/* Category Label */}
                     <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2">
                       <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl text-cyan-300 text-xs font-bold rounded-full shadow-lg border border-cyan-500/30">
                         {product.category}
                       </span>
                     </div>
                  </div>
                  
                   {/* Product Details */}
                   <div className="p-2 sm:p-4 relative z-10 flex flex-col flex-1">
                     <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 leading-tight line-clamp-2">
                       {product.name}
                     </h3>
                     <p className="text-gray-500 text-xs mb-2 sm:mb-3 font-mono">SKU: {product.sku}</p>
                     
                     {/* Price Section */}
                     <div className="flex items-center justify-between mb-2 sm:mb-4">
                       <div>
                         <p className="text-base sm:text-xl font-bold text-white">
                           ₱{product.price.toLocaleString()}
                         </p>
                       </div>
                       {product.stock > 0 && (
                         <div className="text-right">
                           <p className="text-xs sm:text-sm font-bold text-green-400">
                             {product.stock}
                           </p>
                         </div>
                       )}
                     </div>

                     {/* Order Button */}
                     <button
                       onClick={() => handleOrderClick(product.name, product.sku)}
                       disabled={product.stock === 0}
                       className={`w-full py-1.5 sm:py-2 px-2 sm:px-3 glass-button rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden mt-auto ${
                         product.stock > 0
                           ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 hover:border-cyan-400/80'
                           : 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700'
                       }`}
                     >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="relative flex items-center justify-center space-x-1 sm:space-x-2">
                         <ExternalLink size={12} className="sm:w-4 sm:h-4" />
                         <span className="text-xs sm:text-sm">{product.stock > 0 ? 'ORDER' : 'SOLD OUT'}</span>
                       </div>
                    </button>
                  </div>
                </div>
                
                {/* Neon Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl blur-lg -z-10 group-hover:from-cyan-400/40 group-hover:to-purple-400/40 transition-all duration-300"></div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};