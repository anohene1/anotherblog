"use client";
import React from "react";
import { useGetLoggedInUserQuery } from "@/generated/graphql";
import ArticleCard from "@/components/custom/ArticleCard";
import { Sora } from "next/font/google";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { redirect } from "next/navigation";

const sora = Sora({ subsets: ["latin"] });

function Page() {
  const [user, setUser] = useLocalStorage("user", {});
  if (!user || !user?.id) redirect("/login");
  const { data, loading } = useGetLoggedInUserQuery({
    variables: { id: user.id },
  });

  return (
    <div className="mx-auto mt-40 min-h-full max-w-6xl px-4">
      <h2
        className={`${sora.className} scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors my-8`}
      >
        My Articles
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.usersPermissionsUser?.data?.attributes?.articles?.data.map(
          (article) => (
            // @ts-ignore
            <ArticleCard article={article} />
          )
        )}
      </div>
    </div>
  );
}

export default Page;
