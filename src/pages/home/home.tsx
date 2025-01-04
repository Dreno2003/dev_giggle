import { Search } from 'lucide-react'
import MemeGrid from "../../components/meme-grid"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-primary-foreground">
        <div className="container flex flex-col items-center justify-center h-full space-y-6 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Developer & Designer Memes
          </h1>
          <p className="max-w-2xl text-lg text-white/90">
            Find and share the best memes for developers and designers
          </p>
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search memes..."
              className="w-full pl-10 bg-background/95 h-12"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["JavaScript", "CSS", "React", "UI/UX", "Git", "Python"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-white/10 rounded-full text-white hover:bg-white/20 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-2">
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
              Latest
            </button>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
              Popular
            </button>
          </div>
          <select className="px-4 py-2 text-sm border rounded-md bg-background">
            <option>All Categories</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>DevOps</option>
            <option>Design</option>
          </select>
        </div>
        <MemeGrid />
      </section>
    </main>
  )
}

