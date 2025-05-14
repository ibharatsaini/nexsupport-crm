import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,var(--tw-gradient-stops))] from-primary-50/20 via-white/0 to-secondary-50/20" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Customer service made simple
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-600">
              Streamline your customer support with our powerful CRM solution. 
              Handle tickets, manage organizations, and share knowledge effortlessly.
            </p>
          </motion.div>
          <motion.div 
            className="mt-12 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/register"
              className="rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
            >
              Get started for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <motion.div 
              className="flex gap-x-6 text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {benefits.map((benefit, index) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}