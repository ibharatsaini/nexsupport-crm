import { motion } from 'framer-motion';
import { Header } from '../../components/home/Header';
import { Hero } from '../../components/home/Hero';
import { Features } from '../../components/home/Features';

export default function HomePage() {
  return (
    <>
      <Header />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white pt-16"
      >
        <Hero />
        <Features />
      </motion.main>
    </>
  );
}