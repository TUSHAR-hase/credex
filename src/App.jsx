import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowPathIcon, CloudArrowUpIcon, CurrencyDollarIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Header from './components/header.jsx'
import ChatWidget from './components/chatewidgwt.jsx'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])
  
  return (
   
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <HeroSection />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials />
        <ContactForm />

        <ChatWidget />
      </div>
    
  )
}

const HeroSection = () => (
  <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-800 dark:to-gray-900 text-white">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Turn Your Unused Software into Cash
      </motion.h1>
      <p className="text-xl mb-8">Instant valuations for your software licenses. Get paid in 24 hours.</p>
      <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
        Sell My Licenses
      </button>
    </div>
  </section>
)

const steps = [
  { icon: CloudArrowUpIcon, title: "Upload License", desc: "Securely share your license details" },
  { icon: ArrowPathIcon, title: "Get Valuation", desc: "Instant fair market price assessment" },
  { icon: CurrencyDollarIcon, title: "Get Paid", desc: "Fast payment via your preferred method" },
]

const HowItWorks = () => (
  <section className="py-20 px-6 lg:px-20 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map(({ icon: Icon, title, desc }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg"
          >
            <Icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            <div className="text-4xl text-gray-200 mt-4">{index + 1}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const WhyChooseUs = () => {
  const features = [
    { icon: ShieldCheckIcon, title: "Secure Transactions", desc: "Bank-grade encryption for all transfers" },
    { icon: CurrencyDollarIcon, title: "Competitive Rates", desc: "Best market prices guaranteed" },
    { icon: UserGroupIcon, title: "Expert Support", desc: "24/7 customer success team" },
  ]

  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Why Choose SoftSell</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => (
  <section className="py-20 px-6 lg:px-20 dark:bg-gray-800">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-16">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            text: "Sold $50k in unused licenses within 48 hours. Flawless experience!",
            name: "Sarah Johnson",
            role: "CTO",
            company: "TechCorp"
          },
          {
            text: "The simplest way to monetize excess software. Highly recommended!",
            name: "Michael Chen",
            role: "IT Director",
            company: "StartUp Inc"
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-md"
          >
            <p className="text-lg mb-4">"{testimonial.text}"</p>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-gray-600 dark:text-gray-300">{testimonial.role} at {testimonial.company}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const licenseTypes = [
    'Select License Type',
    'Microsoft Office',
    'Adobe Creative Cloud',
    'AutoCAD',
    'VMware',
    'Other'
  ]

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Valid email is required'
    if (formData.licenseType === '' || formData.licenseType === licenseTypes[0]) {
      newErrors.licenseType = 'Please select a license type'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      })
      setErrors({})

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Get Started Today
        </h2>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 dark:bg-green-900 p-4 mb-6 rounded-lg text-green-700 dark:text-green-200"
          >
            Thank you! We'll be in touch within 24 hours.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 dark:text-gray-100`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Work Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@company.com"
              className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 dark:text-gray-100`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              placeholder="Acme Corp"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              autoComplete="organization"
            />
          </div>

          {/* License Type Dropdown */}
          <div>
            <label htmlFor="licenseType" className="block text-sm font-medium mb-2 dark:text-gray-300">
              License Type *
            </label>
            <select
              id="licenseType"
              className={`w-full p-3 rounded-lg border ${errors.licenseType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 dark:text-gray-100`}
              value={formData.licenseType}
              onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
            >
              {licenseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.licenseType && (
              <p className="text-red-500 text-sm mt-1">{errors.licenseType}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 dark:text-gray-300">
              Your Message *
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Tell us about your licenses..."
              className={`w-full p-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-800 dark:text-gray-100`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg transition-colors ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600 text-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white'
              }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              'Request Quote'
            )}
          </motion.button>
        </form>
      </div>
    </section>
  )
}