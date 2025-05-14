import { motion } from 'framer-motion';
import { Ticket, Users, BookOpen, LineChart, MessageCircle, Shield, Zap, BarChart } from 'lucide-react';

const features = [
  {
    name: 'Smart Ticket Management',
    description: 'Efficiently handle customer inquiries with our AI-powered ticketing system that automatically prioritizes and routes tickets.',
    icon: Ticket,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Team Collaboration',
    description: 'Work together seamlessly with real-time updates, shared inboxes, and collaborative tools designed for modern teams.',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Knowledge Base',
    description: 'Create and share knowledge base articles with a powerful editor and smart search to help customers find answers quickly.',
    icon: BookOpen,
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Advanced Analytics',
    description: 'Get deep insights into your customer service performance with customizable dashboards and detailed reports.',
    icon: LineChart,
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Live Chat Support',
    description: 'Engage with customers in real-time through our integrated live chat solution with chatbot capabilities.',
    icon: MessageCircle,
    color: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Enterprise Security',
    description: 'Rest easy with enterprise-grade security features including SSO, role-based access control, and data encryption.',
    icon: Shield,
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'Automation Tools',
    description: 'Streamline workflows with powerful automation tools that handle routine tasks and boost team productivity.',
    icon: Zap,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    name: 'Custom Reports',
    description: 'Create custom reports and dashboards to track the metrics that matter most to your business.',
    icon: BarChart,
    color: 'from-teal-500 to-teal-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base font-semibold leading-7 text-primary-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for excellent customer service
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools helps you deliver outstanding customer support at scale
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4 lg:gap-y-16">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={item}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}