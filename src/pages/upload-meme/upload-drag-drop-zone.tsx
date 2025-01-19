"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropZoneProps {
  onImagesChange: (files: File[]) => void;
  previews: string[];
  onRemove: (index: number) => void;
}

export function FileDropZone({
  onImagesChange,
  previews,
  onRemove,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [memeFiles, setMemeFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setMemeFiles((prev) => {
        const newFiles = [...prev, ...files];

        onImagesChange(newFiles);
        return newFiles;
      });
      // setMemeFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setMemeFiles((prev) => {
        const newFiles = [...prev, ...files];

        onImagesChange(newFiles);
        return newFiles;
      });
    }
  };

  return (
    <div
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-xl transition-all duration-200 min-h-[300px]",
        isDragging ? "border-primary bg-primary/5" : "border-muted"
      )}
    >
      <AnimatePresence mode="popLayout">
        {previews.length > 0 ? (
          <motion.div
            key="previews"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 cur grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {previews.map((preview, index) => (
              <motion.div
                key={preview}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square"
              >
                <img
                  draggable={false}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full  object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setMemeFiles((prev) => prev.filter((_, i) => i !== index));
                    onRemove(index);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
                  aria-label={`Remove image ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
            <motion.label
              htmlFor="image-upload"
              className="flex items-center justify-center aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </motion.label>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            </motion.div>
            <p className="text-xl font-medium mb-2">Drop your memes here</p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              or click to browse
            </p>
            <Button variant="outline" asChild>
              <label htmlFor="image-upload" className="cursor-pointer">
                Select Files
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports: JPG, PNG, GIF up to 10MB each
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
