import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Projects = () => {
  const [filter, setFilter] = useState<'all' | 'building' | 'completed'>('all')
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter)

  return (
    <div className="py-20 md:py-28 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F7FA]">
            All Projects
          </h1>
          <p className="text-[#9AA4B2] text-lg max-w-2xl">
            A complete collection of my work, from web applications to full-stack solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'all' 
                ? 'bg-[#FF6B35] text-[#0B0D10]' 
                : 'border border-[#242A32] text-[#9AA4B2] hover:border-[#FF6B35]'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('building')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'building' 
                ? 'bg-[#FF6B35] text-[#0B0D10]' 
                : 'border border-[#242A32] text-[#9AA4B2] hover:border-[#FF6B35]'
            }`}
          >
            ⚡ Building
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'completed' 
                ? 'bg-[#FF6B35] text-[#0B0D10]' 
                : 'border border-[#242A32] text-[#9AA4B2] hover:border-[#FF6B35]'
            }`}
          >
            ✅ Completed
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <ProjectCard project={project} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects