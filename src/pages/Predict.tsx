import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Upload, AlertCircle } from 'lucide-react';
import type { Symptom } from '../types';

const symptoms: Symptom[] = [
  {
    id: 'cough',
    name: 'Cough',
    followUpQuestion: 'How long have you had the cough?',
    options: ['Less than a week', '1-2 weeks', 'More than 2 weeks']
  },
  {
    id: 'fever',
    name: 'Fever',
    followUpQuestion: 'What is your temperature?',
    options: ['37.5-38.0°C', '38.1-39.0°C', 'Above 39.0°C']
  },
  {
    id: 'breathing',
    name: 'Difficulty Breathing',
    followUpQuestion: 'How severe is your breathing difficulty?',
    options: ['Mild', 'Moderate', 'Severe']
  }
];

const Predict: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'symptoms' | 'upload'>('symptoms');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [currentFollowUp, setCurrentFollowUp] = useState<Symptom | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});

  const handleSymptomClick = (symptom: Symptom) => {
    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(symptom.id)) {
      newSelected.delete(symptom.id);
      const answers = { ...followUpAnswers };
      delete answers[symptom.id];
      setFollowUpAnswers(answers);
    } else {
      newSelected.add(symptom.id);
      setCurrentFollowUp(symptom);
    }
    setSelectedSymptoms(newSelected);
  };

  const handleFollowUpAnswer = (answer: string) => {
    if (currentFollowUp) {
      setFollowUpAnswers({ ...followUpAnswers, [currentFollowUp.id]: answer });
      setCurrentFollowUp(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, handle file upload here
    setTimeout(() => {
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        <motion.div
          className={`flex items-center space-x-2 ${
            step === 'symptoms' ? 'text-purple-400' : 'text-gray-500'
          }`}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <Stethoscope className="w-6 h-6" />
          <span>Symptoms</span>
        </motion.div>
        <div className="h-0.5 flex-1 mx-4 bg-gray-700" />
        <motion.div
          className={`flex items-center space-x-2 ${
            step === 'upload' ? 'text-purple-400' : 'text-gray-500'
          }`}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <Upload className="w-6 h-6" />
          <span>CT Scan Upload</span>
        </motion.div>
      </div>

      {step === 'symptoms' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Select Your Symptoms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <motion.button
                  key={symptom.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border ${
                    selectedSymptoms.has(symptom.id)
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 bg-gray-800/30'
                  } transition-all`}
                  onClick={() => handleSymptomClick(symptom)}
                >
                  {symptom.name}
                </motion.button>
              ))}
            </div>
          </div>

          {currentFollowUp && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">{currentFollowUp.followUpQuestion}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentFollowUp.options?.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-800/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all"
                    onClick={() => handleFollowUpAnswer(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all"
              onClick={() => setStep('upload')}
            >
              Continue to CT Scan Upload
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6">Upload Your CT Scan</h2>
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center">
            <input
              type="file"
              id="ct-scan"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="ct-scan"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <Upload className="w-16 h-16 text-purple-500" />
              <div className="text-lg">
                Drag and drop your CT scan here or <span className="text-purple-400">browse</span>
              </div>
              <p className="text-sm text-gray-400">Supported formats: JPEG, PNG</p>
            </label>
          </div>
          
          <div className="mt-6 flex items-start space-x-2 text-amber-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Please ensure your CT scan is clear and recent. The accuracy of our prediction depends on
              the quality of the uploaded image.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Predict;