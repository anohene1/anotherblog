"use client";

import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import { Sora } from "next/font/google";
import Image from "next/image"
import {cn} from "@/lib/utils";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import ArticleCard from "@/components/custom/ArticleCard";

const sora = Sora({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="mx-auto min-h-full max-w-6xl">
      <h1
        className={`${sora.className} scroll-m-20 text-4xl text-center font-bold tracking-tight mt-52 mx-4 lg:text-5xl`}
      >
        Embark on a Journey of Endless Discovery and Unforgettable Adventures!
      </h1>
      <p className="text-center text-gray-500 leading-7 [&:not(:first-child)]:mt-6 mx-4">
        Unleash your curiosity, dive into captivating stories, and explore the
        extraordinary. Join us on AnotherBlog, where we unravel hidden gems and
        embark on unforgettable adventures. Get ready to ignite your imagination
        and embrace a world of endless discovery!
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button>Read Articles</Button>
        <Button variant="secondary">Create Article</Button>
      </div>
      <h4 className="mx-4 mt-40 scroll-m-20 text-xl font-semibold tracking-tight">
        Recent Tech Articles
      </h4>
      <div className="mx-4 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>

        <h4 className="mx-4 mt-40 scroll-m-20 text-xl font-semibold tracking-tight">
            Recent Food Articles
        </h4>
        <div className="mx-4 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
        </div>

        <h4 className="mx-4 mt-40 scroll-m-20 text-xl font-semibold tracking-tight">
            Recent Sports Blogs
        </h4>
        <div className="mx-4 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
        </div>
    </main>
  );
}
