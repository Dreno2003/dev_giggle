'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

export function TagInput({ tags, onChange }: TagInputProps) {
  const [currentTag, setCurrentTag] = useState('')

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        onChange([...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Tags</Label>
      <Input
        id="tags"
        placeholder="Type a tag and press Enter"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleTagAdd}
      />
      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        <AnimatePresence>
          {tags.map(tag => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Badge 
                variant="secondary" 
                className="px-2 py-1 text-sm hover:bg-secondary/80"
              >
                {tag}
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

