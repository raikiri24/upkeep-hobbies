import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-white">Follow Us</h3>
      <div className="grid grid-cols-1 gap-4">
        {/* Facebook - Active */}
        <a
          href="https://www.facebook.com/profile.php?id=100083603391159"
          target="_blank"
          rel="noreferrer"
          className="glass-card p-4 hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center">
            <div className="p-3 glass-button bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
              <Facebook size={24} className="flex-shrink-0" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-white">Facebook</h4>
              <p className="text-xs text-blue-200">Join our community</p>
            </div>
            <ExternalLink
              size={16}
              className="text-blue-300 group-hover:text-cyan-400 transition-colors flex-shrink-0"
            />
          </div>
        </a>

        {/* Instagram - In Progress */}
        <div className="glass-card p-4 opacity-60 cursor-not-allowed">
          <div className="flex items-center">
            <div className="p-3 glass-button bg-gray-500 text-gray-300 rounded-full flex items-center justify-center">
              <Instagram size={24} className="flex-shrink-0" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-blue-300">Instagram</h4>
              <span className="inline-block px-2 py-0.5 glass-button text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                Creating Page
              </span>
            </div>
          </div>
        </div>

        {/* Twitter/X - In Progress */}
        <div className="glass-card p-4 opacity-60 cursor-not-allowed">
          <div className="flex items-center">
            <div className="p-3 glass-button bg-gray-500 text-gray-300 rounded-full flex items-center justify-center">
              <Twitter size={24} className="flex-shrink-0" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-blue-300">Twitter</h4>
              <span className="inline-block px-2 py-0.5 glass-button text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                Creating Page
              </span>
            </div>
          </div>
        </div>

        {/* YouTube - In Progress */}
        <div className="glass-card p-4 opacity-60 cursor-not-allowed">
          <div className="flex items-center">
            <div className="p-3 glass-button bg-gray-500 text-gray-300 rounded-full flex items-center justify-center">
              <Youtube size={24} className="flex-shrink-0" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-blue-300">YouTube</h4>
              <span className="inline-block px-2 py-0.5 glass-button text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                Creating Page
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;