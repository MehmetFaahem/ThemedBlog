import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface User {
  id: number
  name: string
  email: string
}

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 }
  })
  if (!res.ok) return null
  return res.json()
}

async function getUser(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: { revalidate: 3600 }
  })
  if (!res.ok) return null
  return res.json()
}

export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  return posts.map((post: Post) => ({
    id: post.id.toString()
  }))
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const [post, author] = await Promise.all([
    getPost(params.id),
    getUser(params.id)
  ])

  if (!post || !author) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to posts
      </Link>
      <Suspense fallback={<PostSkeleton />}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              By {author.name} ({author.email})
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{post.body}</p>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}

function PostSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  )
}