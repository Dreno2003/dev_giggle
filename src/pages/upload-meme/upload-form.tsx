import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUtils } from "@/utils/file.utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDropZone } from "./upload-drag-drop-zone";
import { TagInput } from "./tag-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InfoIcon, Sparkles } from "lucide-react";

interface MemeDetails {
  title: string;
  description: string;
  tags: string[];
  creator: string;
  license: string;
  source: string;
}

export default function MemeUploadForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [memeDetails, setMemeDetails] = useState<MemeDetails>({
    title: "",
    description: "",
    tags: [],
    creator: "",
    license: "",
    source: "",
  });

  const handleImagesChange = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMemeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setMemeDetails((prev) => ({ ...prev, license: value }));
  };

  const handleTagsChange = (newTags: string[]) => {
    setMemeDetails((prev) => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted meme details:", memeDetails);
    console.log("Number of images:", previews.length);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl flex justify-center gap-x-3 font-bold tracking-tight">
              <span className="inline-block">Create Your Memes</span>
              <img
                src={FileUtils.absoluteUrl("/images/smile_emoji.png")}
                className=" size-10"
              />

              {/* <Sparkles className="inline-block ml-2 h-8 w-8 text-primary" /> */}
            </h1>
            <p className="text-muted-foreground">
              Share your creativity with proper attribution and help grow our
              community
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="upload" className="space-y-6">
                  <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <FileDropZone
                      previews={previews}
                      onImagesChange={handleImagesChange}
                      onRemove={handleRemoveImage}
                    />
                  </TabsContent>

                  <TabsContent value="details">
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              name="title"
                              value={memeDetails.title}
                              onChange={handleInputChange}
                              placeholder="Give your meme a catchy title"
                            />
                          </div>

                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={memeDetails.description}
                              onChange={handleInputChange}
                              placeholder="Tell us about your meme..."
                              className="h-24"
                            />
                          </div>

                          <TagInput
                            tags={memeDetails.tags}
                            onChange={handleTagsChange}
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              Attribution
                            </h3>
                            <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          </div>

                          <div className="space-y-4 rounded-xl border bg-card p-4">
                            <div>
                              <Label htmlFor="creator">Original Creator</Label>
                              <Input
                                id="creator"
                                name="creator"
                                value={memeDetails.creator}
                                onChange={handleInputChange}
                                placeholder="Credit the original creator"
                              />
                            </div>

                            <div>
                              <Label htmlFor="license">License Type</Label>
                              <Select
                                onValueChange={handleSelectChange}
                                value={memeDetails.license}
                              >
                                <SelectTrigger id="license">
                                  <SelectValue placeholder="Select a license" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cc0">
                                    CC0 (Public Domain)
                                  </SelectItem>
                                  <SelectItem value="cc-by">
                                    CC BY (Attribution)
                                  </SelectItem>
                                  <SelectItem value="cc-by-sa">
                                    CC BY-SA (Attribution-ShareAlike)
                                  </SelectItem>
                                  <SelectItem value="fair-use">
                                    Fair Use
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="source">Source URL</Label>
                              <Input
                                id="source"
                                name="source"
                                value={memeDetails.source}
                                onChange={handleInputChange}
                                placeholder="Link to the original content"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <Button type="submit" className="w-full" size="lg">
                    Upload Memes
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
