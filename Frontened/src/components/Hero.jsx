
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    (<div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background with dark gradient and grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(75,85,99,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(75,85,99,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-6">
          Empowering Your Digital Journey with Innovative Solutions
        </h1>

        <Button size="lg" className="text-lg px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white">
          Get Started
        </Button>
      </div>
    </div>)
  );
}