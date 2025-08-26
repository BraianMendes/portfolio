import { SmartTags, TagBadge } from "@/components/smart-tags";

export default function TagsDemo() {
  const exampleProjects = [
    {
      id: "1",
      title: "AI Client Reports",
      overview:
        "Ask for company analysis via WhatsApp or web interface. The bot uses AI (Groq/LLaMA) enhanced with a RAG system to generate business reports and insights based on your uploaded documents.",
      tags: [
        "AI",
        "WhatsApp Bot",
        "RAG",
        "Business Intelligence",
        "Groq",
        "LLaMA",
        "Next.js",
        "Express.js",
        "Vector Search",
        "Document Processing",
      ],
      tools: [
        "Node.js",
        "React 19",
        "TypeScript",
        "TailwindCSS",
        "HeroUI",
        "PDFKit",
      ],
    },
    {
      id: "2",
      title: "Medical Prescription Reader",
      overview:
        "Uploads a prescription image, extracts text with Tesseract.js, processes and normalizes with compromise NLP, and returns structured drug info. Uses a local, simplified database for simulation.",
      tags: [
        "AI",
        "OCR",
        "NLP",
        "Machine Learning",
        "Next.js",
        "Tesseract.js",
        "Compromise",
      ],
      tools: ["React", "TypeScript", "TailwindCSS"],
    },
    {
      id: "3",
      title: "Portfolio Website",
      overview:
        "A modern, performant, and accessible portfolio to present my work, learning journey, and thoughts on software engineering. Includes sections for projects, certifications, books, blog, and about.",
      tags: ["Portfolio", "Next.js", "React", "UI/UX", "TypeScript"],
      tools: ["Tailwind CSS", "HeroUI", "Framer Motion", "next-themes"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🎯 Sistema de Tags Inteligente
        </h1>
        <p className="text-neutral-300 text-lg">
          Demonstração das ideias 3, 5 e 7 implementadas:
        </p>
        <div className="mt-4 space-y-2 text-sm text-neutral-400">
          <div>
            ✨ <strong>Priorização</strong>: Tags ordenadas por importância
          </div>
          <div>
            🎨 <strong>Hierarquia Semântica</strong>: Cores baseadas no tipo
          </div>
          <div>
            🖱️ <strong>Expansão no Hover</strong>: Hover para ver todas as tags
          </div>
        </div>
      </div>

      <div className="bg-neutral-800/50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          🏷️ Categorias de Tags
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-blue-300 font-medium mb-2">
              🔵 Primárias (Tecnologias Principais)
            </h3>
            <div className="flex flex-wrap gap-2">
              <TagBadge tag="AI" variant="primary" />
              <TagBadge tag="React" variant="primary" />
              <TagBadge tag="Next.js" variant="primary" />
              <TagBadge tag="Python" variant="primary" />
            </div>
          </div>
          <div>
            <h3 className="text-purple-300 font-medium mb-2">
              🟣 Conceituais (Áreas & Conceitos)
            </h3>
            <div className="flex flex-wrap gap-2">
              <TagBadge tag="Machine Learning" variant="conceptual" />
              <TagBadge tag="NLP" variant="conceptual" />
              <TagBadge tag="UI/UX" variant="conceptual" />
            </div>
          </div>
          <div>
            <h3 className="text-green-300 font-medium mb-2">
              🟢 Secundárias (Ferramentas)
            </h3>
            <div className="flex flex-wrap gap-2">
              <TagBadge tag="Tailwind CSS" variant="secondary" />
              <TagBadge tag="HeroUI" variant="secondary" />
              <TagBadge tag="Framer Motion" variant="secondary" />
            </div>
          </div>
          <div>
            <h3 className="text-amber-300 font-medium mb-2">
              🟡 Técnicas (Específicas)
            </h3>
            <div className="flex flex-wrap gap-2">
              <TagBadge tag="WhatsApp Bot" variant="technical" />
              <TagBadge tag="Document Processing" variant="technical" />
              <TagBadge tag="PDF Export" variant="technical" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">
          📦 Cards de Projeto
        </h2>
        <p className="text-neutral-400 text-sm mb-4">
          👆 Passe o mouse sobre as tags para ver o efeito de expansão
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleProjects.map((project) => (
            <div
              key={project.id}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-[280px] flex flex-col"
            >
              <div className="mb-4">
                <h3 className="font-bold text-white text-lg mb-2">
                  {project.title}
                </h3>
                <div className="text-xs text-neutral-400 line-clamp-3">
                  {project.overview}
                </div>
              </div>

              <div className="mt-auto">
                <SmartTags
                  className="w-full"
                  maxVisibleTags={3}
                  tags={project.tags}
                  tools={project.tools}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <h2 className="text-xl font-semibold text-white mb-4">
          ✅ Benefícios Implementados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                Consistência visual entre cards
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                Hierarquia clara de informações
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                Animações fluidas e responsivas
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                UX intuitiva com hover states
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                Cores semânticas por categoria
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-neutral-300">
                Escalabilidade para muitas tags
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
