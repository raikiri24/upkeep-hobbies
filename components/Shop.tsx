import React, { useState, useEffect } from 'react';
import { User, Product } from '../types';
import { Package, ExternalLink, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

interface ShopProps {
  user: User;
}

export const Shop: React.FC<ShopProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
          <p className="text-cyan-400 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full bg-black relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
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
    <div className="h-full w-full bg-black relative overflow-hidden">
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
      
      <div className="relative z-10 h-full w-full flex flex-col">
        {/* Fixed Header */}
        <div className="flex-shrink-0 w-full text-center py-3 sm:py-2 bg-black/50 backdrop-blur-md border-b border-cyan-500/20">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider mb-1">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              UPKEEP
            </span>
            <span className="text-white ml-1 sm:ml-2">HAVEN</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-xs">
            Order via Facebook Messenger
          </p>
        </div>

        {/* Products Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2 py-2 w-full h-full px-2 sm:px-6 md:px-12">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col h-[320px] sm:h-[340px] md:h-[360px] min-w-0"
              >
                {/* Product Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-cyan-500/20 overflow-hidden flex flex-col h-full">
                  {/* Holographic Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Stock Badges */}
                  {product.stock <= 2 && product.stock > 0 && (
                    <div className="absolute top-2 left-2 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse border border-red-400/50">
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
                  <div className="h-32 sm:h-36 md:h-40 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
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
                    <div className="absolute bottom-2 left-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl text-cyan-300 text-xs font-bold rounded-full shadow-lg border border-cyan-500/30">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 relative z-10 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-3 font-mono">SKU: {product.sku}</p>
                    
                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xl font-bold text-white">
                          ₱{product.price.toLocaleString()}
                        </p>
                      </div>
                      {product.stock > 0 && (
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-400">
                            {product.stock} units
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={() => handleOrderClick(product.name, product.sku)}
                      disabled={product.stock === 0}
                      className={`w-full py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden mt-auto ${
                        product.stock > 0
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 border border-cyan-400/50'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                      }`}
                    >
                      {/* Button Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2">
                        <ExternalLink size={14} />
                        <span>{product.stock > 0 ? 'ORDER NOW' : 'OUT OF STOCK'}</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Neon Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl blur-lg -z-10 group-hover:from-cyan-400/40 group-hover:to-purple-400/40 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};