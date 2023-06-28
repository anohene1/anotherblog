"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {useLoginMutation} from "@/generated/graphql";
import {useContext} from "react";
import {useLocalStorage} from "@/lib/useLocalStorage";
import { useRouter } from 'next/navigation'

// import { ReloadIcon } from "@radix-ui/react-icons"




const formSchema = z.object({
    identifier: z.string(),
    password: z.string()
})

export default function Page() {
    const router = useRouter()
    const [user, setUser] = useLocalStorage('user', {})


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    })

    const [login, {data, loading, error}] = useLoginMutation({variables: {
            password: form.getValues().password,
            identifier: form.getValues().identifier,
        }})


    function onSubmit(values: z.infer<typeof formSchema>) {
        login().then((res) => {
            setUser(res?.data?.login.user)
            router.push('/my-articles')
        }).catch((e: any) => {
            console.log(e)
        })
    }

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col space-y-8">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Welcome back
                                </h1>
                                <p className="text-sm text-muted-foreground mt-4">
                                    Enter your email/username and password to sign in to your account
                                </p>
                            </div>
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username or Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="●●●●●●●" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading}>Login</Button>
                        </form>
                    </Form>
            </div>
        </div>
    )
}
