"use client";
import React from "react";
import { useGetArticlesQuery } from "@/generated/graphql";
import ArticleCard from "@/components/custom/ArticleCard";

function Page() {
  const { data, loading } = useGetArticlesQuery();

  return (
    <div className="mx-auto mt-20 grid min-h-full max-w-6xl grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.articles?.data.map((article) => (
        // @ts-ignore
        <ArticleCard article={article} />
      ))}
    </div>
  );
}

export default Page;
