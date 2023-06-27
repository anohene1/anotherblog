import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

function ArticleCard() {
    return (
        <Card className={cn("overflow-hidden min-h-[450px] flex flex-col")}>
            <div className="relative aspect-video w-full">
                <Image alt='an image' fill={true} src="https://images.unsplash.com/photo-1654157925394-4b7809721149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2060&q=80"/>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                    <h4 className="text-lg font-bold">This is some article title</h4>
                    <p className="mt-4 text-gray-500 text-md">This is the description of the article. The story is quite funny to be honest. It's shocking. Let's just make this text a little longer for no reason at all hehehe.</p>
                    <div className="my-6 flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="@shadcn" />
                            <AvatarFallback>LM</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-400">Authored By</p>
                            <p className="text-sm">Ligma Ballz</p>
                        </div>
                    </div>
                </div>
                <Button variant="outline">Read More</Button>
            </div>
        </Card>
    );
}

export default ArticleCard;