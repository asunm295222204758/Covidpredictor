import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Phone, Guitar as Hospital, Video, ExternalLink } from 'lucide-react';
import type { PredictionResult } from '../types';

const Results: React.FC = () => {
  // In a real app, this would come from the API/prediction service
  const mockResult: PredictionResult = {
    likelihood: 85,
    confidence: 'High',
    recommendations: [
      'Isolate immediately and avoid contact with others',
      'Schedule a PCR test for confirmation',
      'Monitor your symptoms and seek medical attention if they worsen',
      'Ensure proper ventilation in your living space'
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
      >
        <h1 className="text-3xl font-bold mb-6">AI Prediction Results</h1>
        
        {/* Risk Score */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mockResult.likelihood}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span>Low Risk</span>
            <span className="font-bold text-purple-400">{mockResult.likelihood}%</span>
            <span>High Risk</span>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Confidence Level</h2>
          <div className="flex items-center space-x-3">
            <div className={`px-4 py-2 rounded-full ${
              mockResult.confidence === 'High' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500'
                : 'bg-gray-700/50 text-gray-400'
            }`}>
              High
            </div>
            <div className={`px-4 py-2 rounded-full ${
              mockResult.confidence === 'Medium'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500'
                : 'bg-gray-700/50 text-gray-400'
            }`}>
              Medium
            </div>
            <div className={`px-4 py-2 rounded-full ${
              mockResult.confidence === 'Low'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500'
                : 'bg-gray-700/50 text-gray-400'
            }`}>
              Low
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-3">
            {mockResult.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Emergency Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Phone className="w-6 h-6 text-purple-500" />
            <span>Emergency Contacts</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span>COVID-19 Helpline</span>
              <a href="tel:1075" className="text-purple-400 hover:text-purple-300">1075</a>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span>Emergency Services</span>
              <a href="tel:108" className="text-purple-400 hover:text-purple-300">108</a>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Hospital className="w-6 h-6 text-purple-500" />
            <span>Nearby Facilities</span>
          </h2>
          <div className="space-y-3">
            <a
              href="#"
              className="block p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span>Find Testing Centers</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
            <a
              href="#"
              className="block p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span>Locate Hospitals</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </motion.section>
      </div>

      {/* Online Consultation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Video className="w-6 h-6 text-purple-500" />
          <span>Online Consultation</span>
        </h2>
        <p className="text-gray-300 mb-4">
          Connect with a healthcare professional from the comfort of your home.
        </p>
        <button className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all transform hover:scale-105">
          Book Consultation
        </button>
      </motion.section>
    </div>
  );
};

export default Results;