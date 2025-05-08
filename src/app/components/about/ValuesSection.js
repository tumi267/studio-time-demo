const values = [
    {
      title: "Quality First",
      description: "We never compromise on sound quality, using only the best equipment and techniques",
      icon: "🎚️" 
    },
    {
      title: "Artist Focused",
      description: "Your creative vision drives every technical decision we make",
      icon: "🎤"
    },
    // Add 2-3 more values
  ]
  
  export default function ValuesSection() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-studio-900 p-8 rounded-xl">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-studio-200">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }