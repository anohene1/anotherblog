"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGetArticleBySlugQuery } from "@/generated/graphql";
import Image from "next/image";
import { Sora } from "next/font/google";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import moment from "moment";

const sora = Sora({ subsets: ["latin"] });

function Page({ params }: { params: { slug: string } }) {
  const { data, loading } = useGetArticleBySlugQuery({
    variables: { slug: params.slug },
  });

  return (
    <div className="mx-auto mt-20 min-h-full max-w-prose px-4">
      {loading ? (
        <p>Loading wai</p>
      ) : (
        <>
          <Image
            width={
              +data?.articles?.data[0].attributes?.cover?.data?.attributes
                ?.width
            }
            height={
              +data?.articles?.data[0].attributes?.cover?.data?.attributes
                ?.height
            }
            src={`${data?.articles?.data[0].attributes?.cover?.data?.attributes?.url}`}
            alt={`${data?.articles?.data[0].attributes?.cover?.data?.attributes?.name}`}
          />
          <div className="border-b mb-8">
              <h2
                  className={`${sora.className} scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors mt-8`}
              >
                  {data?.articles?.data[0].attributes?.title}
              </h2>
              <div className="flex items-center justify-between">
                  <div className="my-6 flex items-center gap-2">
                      <Avatar>
                          <AvatarImage
                              src={
                                  data?.articles?.data[0]?.attributes?.author?.data?.attributes
                                      ?.profilePicture?.data?.attributes?.url
                              }
                              alt={`${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.firstName} ${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.lastName}`}
                          />
                          <AvatarFallback>{`${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.firstName?.[0]}${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.lastName?.[0]}`}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                          <p className="text-xs text-gray-400">Authored By</p>
                          <p className="text-sm">{`${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.firstName} ${data?.articles?.data[0]?.attributes?.author?.data?.attributes?.lastName}`}</p>
                      </div>
                  </div>
                  <p className="text-sm text-gray-400">{moment(data?.articles?.data[0]?.attributes?.updatedAt).fromNow()}</p>
              </div>
          </div>
          <ReactMarkdown
            className="prose"
            children={`${data?.articles?.data[0].attributes?.content}`}
            remarkPlugins={[remarkGfm]}
          />
        </>
      )}
    </div>
  );
}

export default Page;
