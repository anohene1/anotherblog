import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Article, ArticleEntity} from "@/generated/graphql";
import Link from "next/link";

interface Props {
    article: ArticleEntity
}

function ArticleCard({article}: Props) {

    return (
      <Card className={cn("overflow-hidden min-h-[450px] flex flex-col")}>
        <div className="relative aspect-video w-full">
          <Image
            alt="an image"
            fill={true}
            src={`${article?.attributes?.cover?.data?.attributes?.url}`}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="flex flex-1 flex-col justify-between">
            <div>
                <h4 className="text-lg font-bold">{article?.attributes?.title}</h4>
                <p className="mt-4 text-gray-500 text-md">
                    {article?.attributes?.description}
                </p>
            </div>
            <div className="my-6 flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    article?.attributes?.author?.data?.attributes
                      ?.profilePicture?.data?.attributes?.url
                  }
                  alt={`${article?.attributes?.author?.data?.attributes?.firstName} ${article?.attributes?.author?.data?.attributes?.lastName}`}
                />
                <AvatarFallback>{`${article?.attributes?.author?.data?.attributes?.firstName?.[0]}${article?.attributes?.author?.data?.attributes?.lastName?.[0]}`}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">Authored By</p>
                <p className="text-sm">{`${article?.attributes?.author?.data?.attributes?.firstName} ${article?.attributes?.author?.data?.attributes?.lastName}`}</p>
              </div>
            </div>
          </div>
          <Button variant="outline" asChild>
              <Link href={`/articles/${article?.attributes?.slug}`}>Read More</Link>
          </Button>
        </div>
      </Card>
    );
}

export default ArticleCard;