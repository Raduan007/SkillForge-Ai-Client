"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { apiClient } from "@/services/apiClient";
import { Input, ImageUrlInput } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { Compass, Sparkles } from "lucide-react";

// ─── Validation Schema ────────────────────────────────────────────────────────

const itemSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long")
    .trim(),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description is too long")
    .trim(),
  fullDescription: z
    .string()
    .min(30, "Full description must be at least 30 characters")
    .trim(),
  category: z
    .string()
    .min(1, "Category is required"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  duration: z
    .string()
    .min(1, "Duration description is required")
    .trim(),
  rating: z.coerce
    .number()
    .min(1.0, "Rating must be at least 1.0")
    .max(5.0, "Rating cannot exceed 5.0"),
  coverImage: z
    .string()
    .min(1, "Cover image URL is required")
    .trim(),
});



const STANDARD_CATEGORIES = [
  "Frontend",
  "Backend",
  "DevOps",
  "Data Science",
  "Design",
  "Full Stack",
  "Mobile",
  "AI",
  "Cybersecurity",
  "Management",
  "Databases",
  "Solutions Architecture",
];

export default function AddItemPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);

  // ─── Route Protection ───────────────────────────────────────────────────────

  React.useEffect(() => {
    if (!isAuthLoading && !user) {
      toast.error("Please sign in to add new career roadmaps.");
      router.push("/login?redirect=/items/add");
    }
  }, [user, isAuthLoading, router]);

  // ─── Form Handlers ──────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      category: "Frontend",
      difficulty: "Beginner",
      duration: "",
      rating: 4.5,
      coverImage: "",
    },
  });

  const coverImageVal = watch("coverImage");

  const onSubmit = async (data: z.infer<typeof itemSchema>) => {
    setIsSubmittingForm(true);
    const loadingToastId = toast.loading("Saving new roadmap item...");

    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        data?: unknown;
      }>("/roadmaps", data);

      if (response.data?.success) {
        toast.success("Roadmap item created successfully!", { id: loadingToastId });
        reset();
        router.push("/items/manage");
      } else {
        toast.error("Failed to create roadmap item.", { id: loadingToastId });
      }
    } catch (err: unknown) {
      console.error("[AddItem] Error:", err);
      let errorMsg = "An unexpected error occurred while saving the item.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          errorMsg = axiosError.response.data.error;
        }
      }
      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Render centered spinner during initial authentication check
  if (isAuthLoading || !user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="flex flex-col items-center gap-3">
          <Compass className="h-10 w-10 text-primary animate-spin" />
          <span className="text-sm font-semibold text-secondary-text">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#090d16] select-none">
      <div className="max-w-3xl mx-auto">
        
        {/* Header segment */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md shadow-primary/10 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#090d16]">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Create Career Roadmap
          </h1>
          <p className="mt-2 text-sm text-secondary-text max-w-md leading-relaxed">
            Configure metadata, tags, difficulty, and cover parameters to build a new discoverable roadmap path.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#0c1220] py-8 px-6 shadow-xl rounded-xl border border-border-color dark:border-slate-800/50 sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            
            {/* Title Field */}
            <Input
              label="Roadmap Title"
              placeholder="e.g. Senior DevOps Systems Specialist"
              error={errors.title?.message}
              disabled={isSubmittingForm}
              {...register("title")}
            />

            {/* Short Description */}
            <Textarea
              label="Short Description"
              placeholder="Provide a concise summary displayed in cards..."
              error={errors.shortDescription?.message}
              disabled={isSubmittingForm}
              {...register("shortDescription")}
            />

            {/* Full Description */}
            <Textarea
              label="Full Description"
              placeholder="Provide a detailed roadmap overview, objectives, and targeted learning goals..."
              className="min-h-[120px]"
              error={errors.fullDescription?.message}
              disabled={isSubmittingForm}
              {...register("fullDescription")}
            />

            {/* Grid for parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category */}
              <Select
                label="Category"
                error={errors.category?.message}
                disabled={isSubmittingForm}
                {...register("category")}
              >
                {STANDARD_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>

              {/* Difficulty */}
              <Select
                label="Difficulty Level"
                error={errors.difficulty?.message}
                disabled={isSubmittingForm}
                {...register("difficulty")}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>

              {/* Duration */}
              <Input
                label="Estimated Duration"
                placeholder="e.g. 6 Months"
                error={errors.duration?.message}
                disabled={isSubmittingForm}
                {...register("duration")}
              />

              {/* Rating */}
              <Input
                label="Default User Rating"
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                placeholder="4.5"
                error={errors.rating?.message}
                disabled={isSubmittingForm}
                {...register("rating")}
              />
            </div>

            {/* Image Preview Field */}
            <ImageUrlInput
              label="Cover Image URL"
              placeholder="https://example.com/images/cover.png"
              value={coverImageVal}
              error={errors.coverImage?.message}
              disabled={isSubmittingForm}
              {...register("coverImage")}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t border-border-color dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="large"
                disabled={isSubmittingForm}
                onClick={() => reset()}
                className="flex-1 text-xs font-semibold"
              >
                Reset Fields
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="large"
                isLoading={isSubmittingForm}
                className="flex-1 text-xs font-bold"
              >
                Create Roadmap
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
