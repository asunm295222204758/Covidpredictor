import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Activity } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            AI-Powered COVID-19 Prediction
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300"
          >
            Upload your CT scan and answer a few questions to get instant results powered by advanced AI technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <button
              onClick={() => navigate('/predict')}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all transform hover:scale-105"
            >
              Predict Now
            </button>
            <button
              onClick={() => navigate('/learn')}
              className="px-8 py-3 border-2 border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500/10 transition-all"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <StatCard
          icon={<Activity className="w-8 h-8 text-purple-500" />}
          title="Global Cases"
          value="500M+"
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-pink-500" />}
          title="Recovery Rate"
          value="98.7%"
        />
        <StatCard
          icon={<Shield className="w-8 h-8 text-purple-500" />}
          title="Accuracy Rate"
          value="95%"
        />
      </section>

      {/* Privacy Section */}
      <section className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Shield className="w-12 h-12 text-purple-500" />
          <h2 className="text-2xl font-bold">Your Privacy Matters</h2>
        </div>
        <p className="text-gray-300">
          Your data is processed securely and automatically deleted after prediction. We use state-of-the-art encryption
          and follow strict privacy guidelines to ensure your information remains confidential.
        </p>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
      {value}
    </p>
  </motion.div>
);

export default Home;