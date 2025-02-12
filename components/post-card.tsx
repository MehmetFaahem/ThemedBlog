import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostCardProps {
  id: number
  title: string
  body: string
}

export function PostCard({ id, title, body }: PostCardProps) {
  return (
    <Link href={`/post/${id}`}>
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">{body}</p>
        </CardContent>
      </Card>
    </Link>
  )
}