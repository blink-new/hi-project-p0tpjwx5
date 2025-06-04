import { useState, useEffect } from 'react'
import { Card } from './components/ui/card'
import { Button } from './components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Waves, Sun, Moon, Star } from 'lucide-react'

const greetings = [
  { text: "Hi", icon: Waves, color: "text-blue-500" },
  { text: "Hello", icon: Heart, color: "text-red-500" },
  { text: "Hey", icon: Sun, color: "text-yellow-500" },
  { text: "Howdy", icon: Moon, color: "text-indigo-500" },
  { text: "Hola", icon: Star, color: "text-green-500" },
  { text: "Bonjour", icon: Heart, color: "text-purple-500" }
]

function App() {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const currentItem = greetings[currentGreeting]
  const Icon = currentItem.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Animated greeting */}
          <div className="mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGreeting}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center gap-4"
              >
                <Icon className={`w-16 h-16 ${currentItem.color} animate-bounce`} />
                <h1 className={`text-8xl font-bold ${currentItem.color} tracking-tight`}>
                  {currentItem.text}
                </h1>
                <Icon className={`w-16 h-16 ${currentItem.color} animate-bounce animation-delay-500`} />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Welcome to your beautiful new project! This is where amazing things begin.
            Every great journey starts with a simple greeting.
          </motion.p>
        </motion.div>

        {/* Interactive cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {greetings.slice(0, 3).map((greeting, index) => {
            const ItemIcon = greeting.icon
            return (
              <motion.div
                key={greeting.text}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
              >
                <Card className="p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-blue-100 to-blue-200' :
                      index === 1 ? 'from-red-100 to-red-200' :
                      'from-purple-100 to-purple-200'
                    }`}>
                      <ItemIcon className={`w-8 h-8 ${greeting.color}`} />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-800">{greeting.text}</h3>
                    <p className="text-slate-600 text-sm">
                      {index === 0 && "The classic greeting that started it all"}
                      {index === 1 && "A warm and friendly way to connect"}
                      {index === 2 && "Casual and cool, perfect for friends"}
                    </p>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: hoverIndex === index ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button size="sm" variant="outline" className={`${greeting.color} border-current`}>
                        Say {greeting.text}!
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 text-sm">
            Built with ❤️ using React, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default App