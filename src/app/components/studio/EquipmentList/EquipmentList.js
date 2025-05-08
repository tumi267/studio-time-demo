const equipmentCategories = [
  {
    name: "Monitoring",
    items: [
      "PMC twotwo.8 (Main Monitors)",
      "ATC SCM25A Pro (Nearfields)",
      "Focal Trio6 Be (3-Way Reference)",
      "Avantone MixCubes (Auratones)",
      "Beyerdynamic DT 1990 Pro (Headphones)",
      "Dangerous Music Monitor ST (Controller)",
      "Trinnov ST2 Pro (Room Correction)"
    ]
  },
  {
    name: "Microphones",
    items: [
      "Neumann U87 Ai (Tube)",
      "Sony C-800G (Vocal)",
      "Telefunken ELA M 251E (Tube)",
      "Coles 4038 (Ribbon)",
      "Sennheiser MD 441 (Dynamic)",
      "Schoeps MK4 (Stereo Pair)"
    ]
  },
  {
    name: "Outboard & Processing",
    items: [
      "Neve 1073LB (Preamps)",
      "Universal Audio 1176 (Compressors)",
      "Tube-Tech CL 1B (Optical)",
      "Manley Massive Passive (EQ)",
      "Burl B32 Mothership (Converters)",
      "Antelope Audio Orion 32 (Interface)"
    ]
  }
  ]
  
  export default function EquipmentList() {
    return (
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Equipment List</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipmentCategories.map((category, index) => (
            <div key={index} className="bg-studio-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 border-b border-studio-700 pb-2">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <span className="w-2 h-2 bg-studio-300 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    )
  }