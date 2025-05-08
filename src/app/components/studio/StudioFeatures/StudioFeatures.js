const features = [
    {
      icon: '🎛️',
      title: "Analog & Digital",
      description: "Hybrid setup with vintage outboard gear and modern digital workflow"
    },
    {
      icon: '🎚️',
      title: "Control Room",
      description: "Acoustically treated control room with premium monitoring"
    },
    {
      icon: '🎤',
      title: "Live Room",
      description: "Spacious live room with variable acoustics for any ensemble"
    },
    {
      icon: '🎧',
      title: "Isolation Booths",
      description: "Dedicated vocal/instrument booths for clean recordings"
    }
  ]
  
  export default function StudioFeatures() {
    return (
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Studio Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-studio-800 p-6 rounded-lg hover:bg-studio-700 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-studio-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }