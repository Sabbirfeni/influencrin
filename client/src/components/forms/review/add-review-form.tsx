"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import clsx from "clsx";

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(300, { message: "Bio must not be longer than 300 characters." }),
  rating: z.number().min(1, "Rating must be at least 1").max(5),
});

export default function AddReviewForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted", data);
  }

  return (
    <div className="w-full md:w-2/3 mt-12 md:mt-0">
      <h3 className="text-xl font-semibold text-center md:text-left">
        Rate the Influencer
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-5"
        >
          {/* Rating Field */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-center md:justify-start">
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        // stroke="none"
                        className={clsx(
                          "w-6 h-6 cursor-pointer transition-colors",
                          star <= field.value
                            ? "fill-primary stroke-0"
                            : "stroke-1 text-primary"
                        )}
                        onClick={() => field.onChange(star)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Comment Field */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center md:items-start justify-center md:justify-start">
                <FormLabel>
                  <div>
                    What you think about{" "}
                    <span className="text-primary font-semibold">
                      Influencer Name
                    </span>{" "}
                    ?
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="start writing here..."
                    className="h-32 resize-none text-sm md:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center md:justify-start">
            <Button type="submit">Add Review</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
