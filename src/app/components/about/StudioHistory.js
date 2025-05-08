import Image from "next/image"
export default function StudioHistory() {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Studio History</h2>
          <div className="space-y-4 text-studio-200">
            <p>
              Founded in 2010, our studio began as a passion project between three audio engineers 
              who wanted to create a space that balanced technical excellence with creative freedom.
            </p>
            <p>
              Over the past decade, we&apos;ve grown from a small project studio to a world-class facility,
              working with Grammy-winning artists and major labels while maintaining our indie spirit.
            </p>
            <p>
              Our recent renovation in 2022 added state-of-the-art acoustics while preserving the 
              vintage character that makes our space unique.
            </p>
          </div>
        </div>
        <div className="relative h-80 lg:h-full rounded-xl overflow-hidden">
          <Image
            src="/about/studio-history.jpg"
            alt="Studio in early days"
            fill
            className="object-cover"
          />
        </div>
      </section>
    )
  }
