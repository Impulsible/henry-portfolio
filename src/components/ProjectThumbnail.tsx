import { useState } from 'react'

const ProjectThumbnail = ({
  project,
}: {
  project: {
    id: number
    icon: string
    screenshots?: string[]
    color: string
    status: string
    flag?: string
  }
}) => {
  const [imgFailed, setImgFailed] = useState(false)
  const firstScreenshot = project.screenshots?.[0]
  
  // Show image if screenshot exists and hasn't failed
  const showImage = firstScreenshot && !imgFailed

  return (
    <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
      {/* Background texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {showImage ? (
        /* Screenshot Image */
        <img
          src={firstScreenshot}
          alt={`Project ${project.id} screenshot`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          onError={() => {
            console.log(`❌ Failed to load: ${firstScreenshot}`);
            setImgFailed(true);
          }}
          onLoad={() => {
            console.log(`✅ Loaded: ${firstScreenshot}`);
          }}
        />
      ) : (
        /* Emoji fallback */
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
            {project.icon}
          </span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            project.status === 'Completed' || project.status === 'completed'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/30'
          }`}
        >
          {project.status === 'building' ? 'In Progress' : 
           project.status === 'completed' ? 'Completed' : project.status}
        </span>
      </div>

      {/* Flag */}
      {project.flag && (
        <div className="absolute top-4 left-4 text-2xl">{project.flag}</div>
      )}
    </div>
  )
}

export default ProjectThumbnail