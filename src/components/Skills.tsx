import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28 bg-[#11151A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#F5F7FA]">
            Tech Stack
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mb-10">
            Technologies I work with to build modern, scalable applications.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-[#151A20] p-6 rounded-xl border border-[#242A32] hover:border-[#FF6B35]/50 transition-all"
              >
                <h3 className="font-['Space_Grotesk'] text-lg font-bold mb-4 text-[#F5F7FA]">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill.name ?? skillIndex}
                      className="px-3 py-1 bg-[#0B0D10]/50 border border-[#242A32] rounded-full text-xs font-['JetBrains_Mono'] text-[#9AA4B2]"
                    >
                      {skill.name ?? skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
