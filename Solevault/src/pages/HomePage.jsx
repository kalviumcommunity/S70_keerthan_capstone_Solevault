import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShoppingBag,
  BarChart3,
  Heart,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Home = () => {
  const [isHovering, setIsHovering] = useState(null);

  const features = [
    {
      title: "Track Collection",
      description: "Organize and manage your entire sneaker collection in one place with photos and detailed information.",
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      color: "bg-sneaker-blue"
    },
    {
      title: "Market Values",
      description: "Stay updated with the current market value of your collection and track price changes over time.",
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      color: "bg-sneaker-green"
    },
    {
      title: "Wishlist",
      description: "Keep track of sneakers you want and get notified about price drops and special offers.",
      icon: <Heart className="h-8 w-8 text-white" />,
      color: "bg-sneaker-red"
    },
    {
      title: "Analytics",
      description: "Analyze your collection's performance with detailed charts showing appreciation and trends.",
      icon: <Sparkles className="h-8 w-8 text-white" />,
      color: "bg-sneaker-orange"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Sneaker Collection Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Manage Your Sneaker Collection Like Never Before
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              SoleVault helps you track, manage, and analyze your sneaker collection with powerful tools designed specifically for collectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-sneaker-blue hover:bg-blue-600 text-white font-medium h-12 px-8"
                asChild
              >
                <Link to="/auth" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/20 h-12 px-8"
                asChild
              >
                <Link to="/auth">
                  View Demo
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for sneaker collectors and enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className={`${feature.color} p-4 flex justify-center`}>
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>

                  <Link
                    to="/auth"
                    className={`mt-4 inline-flex items-center font-medium text-sneaker-blue
                      ${isHovering === index ? 'gap-3' : 'gap-2'} transition-all duration-200`}
                  >
                    Learn more
                    <ArrowRight className={`h-4 w-4 transition-transform duration-200
                      ${isHovering === index ? 'translate-x-1' : ''}`} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sneaker-blue to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Start Tracking Your Collection Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of sneaker collectors who trust SoleVault to manage, analyze, and showcase their collections
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-sneaker-blue hover:bg-gray-100 h-12 px-8 text-lg"
            >
              <Link to="/auth">
                Get Started For Free
              </Link>
            </Button>

            <p className="mt-4 text-sm text-white/70">
              No credit card required • Free plan available • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">SoleVault</h3>
              <p className="text-sm text-gray-400">The ultimate sneaker collection manager</p>
            </div>

            <div className="flex gap-6">
              <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Collection</Link>
              <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Wishlist</Link>
              <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">Analytics</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SoleVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;