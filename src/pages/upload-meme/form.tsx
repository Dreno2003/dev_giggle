import {  useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUtils } from "@/utils/file.utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import {
  uploadValidationSchema,
  initUploadValues,
} from "./schema/formik-validation.schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDropZone } from "./upload-drag-drop-zone";
import { TagInput } from "./tag-input";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUploadMeme from "@/hooks/useUploadMeme.hook";
import { useAppSelector } from "@/store/redux-state-hook";
import { Meme } from "@/models/meme.model";
import { AlertToaster } from "@/components/aleart-toaster";

export default function MemeUploadForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [Files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: initUploadValues,
    validationSchema: uploadValidationSchema,
    onSubmit: async (_values, { resetForm }) => {
      try {
        await userUploadMeme.mutateAsync();
        toast.success("Hurrah! Done Cooking Meme 🎉");
        setTags([]);
        setPreviews([]);
        setFiles([]);
        formik.setFieldValue("tags", []);
        resetForm();
      } catch (error) {
        toast.error("O... Fire went Off! Please Ignite again");
      }
    },
  });

  const userUploadMeme = useUploadMeme({
    files: Files,
    meme: formik.values as Meme,
    user: user!,
  });

  const handleImagesChange = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFiles(files);
    setPreviews(newPreviews);
    // setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagsChange = (newTags: string[]) => {
    if (tags.length >= 5) return
    setTags((prev) => {
      if (prev.includes(newTags[0])) return prev;
      const xTags = [...prev, ...newTags];
      formik.setFieldValue("tags", xTags);
      return xTags;
    });
    // setMemeDetails((prev) => ({ ...prev, tags: newTags }));
  };
  // useEffect(() => {
  //   if (userUploadMeme.isSuccess && isCreated) {
  //     // setIsCreated(true);
  //     toast.success("Hurrah! Done Cooking Meme");
  //     console.log("this is called  after toast");
  //     setTimeout(() => {
  //       setIsCreated(false);
  //     }, 3200);
  //   }
  // }, [userUploadMeme.isSuccess]);

  return (
    <>
      <AlertToaster position="top-center" />
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

            <Card className="border">
              <CardContent className="p-6">
                <form
                  //  onSubmit={handleSubmit}
                  onSubmit={formik.handleSubmit}
                >
                  <Tabs defaultValue="upload" className="space-y-6">
                    <TabsList className="grid grid-cols-2 gap-x-2 *:shadow-none w-full max-w-md mx-auto">
                      <TabsTrigger value="upload" className="sha">
                        Upload
                      </TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-4">
                      <FileDropZone
                        previews={previews}
                        onImagesChange={handleImagesChange}
                        onRemove={handleRemoveImage}
                      />
                    </TabsContent>

                    <TabsContent value="details" className="">
                      <div className=" px-1  w-full ">
                        <div className="space-y-4 md:space-y-5">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                name="title"
                                value={formik.values.title}
                                // value={memeDetails.title}
                                // onChange={handleInputChange}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Give your meme a catchy title"
                              />

                              {formik.touched.title && formik.errors.title ? (
                                <div className="text-red-500 mt-1 text-xs">
                                  {formik.errors.title}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // value={memeDetails.description}
                                // onChange={handleInputChange}
                                placeholder="Tell us about your meme..."
                                className="h-24"
                              />
                            </div>

                            <div>
                              <TagInput
                                tags={tags}
                                onChange={handleTagsChange}
                              />

                              {formik.touched.tags && formik.errors.tags ? (
                                <div className="text-red-500 -mt-7 text-xs">
                                  {formik.errors.tags}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                Attribution
                              </h3>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="!bg-white hover:border-white p-0 hover:border-none ">
                                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Include </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>

                            <div className="space-y-5  w-full rounded-xl  bg-card ">
                              <div className="flex w-full md:gap-x-4 flex-col md:flex-row gap-y-5 md:gap-y-0">
                                <div className="w-full">
                                  <Label htmlFor="creator">
                                    Original Creator
                                  </Label>
                                  <Input
                                    id="creator"
                                    name="creator"
                                    className="w-full"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.attribution?.originalCreator
                                    }
                                    // value={memeDetails.creator}
                                    // onChange={handleInputChange}
                                    placeholder="Credit the original creator"
                                  />
                                </div>

                                <div className="w-full">
                                  <Label htmlFor="source">Source URL</Label>
                                  <Input
                                    id="source"
                                    name="source"
                                    className="w-full"
                                    value={formik.values.attribution?.source}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // value={memeDetails.source}
                                    // onChange={handleInputChange}
                                    placeholder="Link to the original content"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6"
                  >
                    <Button
                      type="submit"
                      disabled={userUploadMeme.isPending || Files.length === 0}
                      className="w-full"
                      size="lg"
                    >
                      {userUploadMeme.isPending
                        ? "Cooking Meme Please wait"
                        : "                    Upload Memes"}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </>
  );
}
