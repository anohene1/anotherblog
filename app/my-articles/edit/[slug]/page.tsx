"use client";

import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Sora } from "next/font/google";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { redirect, useRouter } from "next/navigation";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGetArticleBySlugQuery,
  useGetCategoriesQuery,
  useUpdateArticleMutation,
} from "@/generated/graphql";
import { cn } from "@/lib/utils";

const sora = Sora({ subsets: ["latin"] });
const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  category: z.string(),
});

function Page({ params }: { params: { slug: string } }) {
  const { data: articleData, loading: fetching } = useGetArticleBySlugQuery({
    variables: { slug: params.slug },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
    },
  });

  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", {});
  if (!user || !user?.id) redirect("/login");
  const editorRef = useRef(null);
  const { data: categoriesData, loading } = useGetCategoriesQuery();
  const [content, setContent] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const [updateArticle, { data, loading: submitting, error }] =
    useUpdateArticleMutation({
      variables: {
        description: form.getValues().description,
        title: form.getValues().title,
        content: content,
        category: categoryValue,
        id: `${articleData?.articles?.data[0].id}`,
      },
    });

  const [deleteArticle, { data: deletedArticleData, loading: deleting }] =
    useDeleteArticleMutation({
      variables: {
        id: `${articleData?.articles?.data[0].id}`,
      },
    });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateArticle()
      .then(() => {
        router.push("/my-articles");
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (articleData) {
      form.setValue(
        "title",
        `${articleData?.articles?.data[0].attributes?.title}`
      );
      form.setValue(
        "description",
        `${articleData?.articles?.data[0].attributes?.description}`
      );
      setCategoryValue(
        `${articleData?.articles?.data[0].attributes?.category?.data?.id}`
      );
    }
  }, [articleData]);

  return (
    <div className="mx-auto mt-40 min-h-full max-w-6xl px-4">
      <h2
        className={`${sora.className} scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors my-8`}
      >
        Create Article
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="A Cool Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(val) => {
                    setCategoryValue(val);
                  }}
                  defaultValue={field.value}
                  value={categoryValue}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the category of your article" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData?.categories?.data.map((category) => (
                      <SelectItem value={`${category.id}`}>
                        {category.attributes?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the category of your article from the available options
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Editor
            // @ts-ignore
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(val) => {
              setContent(val);
            }}
            initialValue={`${articleData?.articles?.data[0].attributes?.content}`}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount quickbars preview",
              ],
              toolbar:
                "undo redo | blocks | formatselect | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | link quickimage",
              quickbars_selection_toolbar:
                "bold italic | h2 h3 blockquote link",
              content_style:
                "@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap'); body { font-family: 'Nunito', sans-serif; } h1,h2,h3,h4,h5,h6 { font-family: 'Nunito', sans-serif; }",
            }}
          />
          <div className="mt-12 flex items-center justify-end gap-4">
            <Button
              onClick={() => {
                router.back();
              }}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="destructive">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your article.
                  </DialogDescription>
                  <DialogFooter className={cn("custom-mt-10")}>
                    <Button
                      disabled={deleting}
                      onClick={() => {
                        deleteArticle()
                          .then(() => {
                            router.push("/my-articles");
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      }}
                      type="button"
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button type="submit" disabled={submitting}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Page;
