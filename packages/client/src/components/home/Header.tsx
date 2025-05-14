// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export function Hero() {
//   return (
//     <div className="relative overflow-hidden bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center"
//         >
//           <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//             Customer service made simple
//           </h1>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//             Streamline your customer support with our powerful CRM solution. 
//             Handle tickets, manage organizations, and share knowledge effortlessly.
//           </p>
//           <motion.div 
//             className="mt-10 flex items-center justify-center gap-x-6"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <Link
//               to="/register"
//               className="rounded-md bg-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-2 group"
//             >
//               Get started
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-bold py-2 px-4 rounded-lg">
              NexSupport
            </span>
            <span className="text-sm text-gray-600 hidden sm:block">
              Modern Customer Support
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/login"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              Log in
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="text-sm font-semibold leading-6 text-white bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
            >
              Start free trial
            </Link>
          </motion.div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${
          mobileMenuOpen ? '' : 'pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-bold py-2 px-4 rounded-lg">
              NexSupport
            </span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6 space-y-2">
              <Link
                to="/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-gradient-to-r from-primary-600 to-secondary-600"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}