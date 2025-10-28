import { Form, Link as InertiaLink, useForm, router } from '@inertiajs/react'
import React from 'react'

interface User { id: number; name: string }

interface LinkItem {
  id: number
  title: string
  url: string
  description?: string | null
  domain?: string | null
  user: User
  votes_count: number
  comments_count: number
  created_at: string
}

interface CommentItem {
  id: number
  body: string
  user: User
  created_at: string
  children?: CommentItem[]
}

export default function LinkShow({ link, comments, auth }: { link: LinkItem, comments: CommentItem[], auth?: { user?: User | null } }) {
  const isAuthed = Boolean(auth?.user)

  const form = useForm({ body: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post(`/links/${link.id}/comments`, { onSuccess: () => form.reset() })
  }

  const vote = () => {
    if (!isAuthed) { router.visit('/login'); return }
    router.post(`/links/${link.id}/vote`)
  }

  const [replyOpen, setReplyOpen] = React.useState<Record<number, boolean>>({})
  const [collapsed, setCollapsed] = React.useState<Record<number, boolean>>({})

  const CommentNode: React.FC<{ node: CommentItem; depth?: number }> = ({ node, depth = 0 }) => {
    const reply = useForm({ body: '', parent_id: node.id })
    const submitReply = (e: React.FormEvent) => {
      e.preventDefault()
      reply.post(`/links/${link.id}/comments`, {
        onSuccess: () => {
          reply.reset()
          setReplyOpen((s) => ({ ...s, [node.id]: false }))
        },
      })
    }
    const isCollapsed = collapsed[node.id] || false
    const hasChildren = node.children && node.children.length > 0

    return (
      <li className="rounded border p-3" style={{ marginLeft: depth * 16 }}>
        <div className="mb-1 flex items-center gap-2 text-xs text-gray-600">
          <span>{node.user.name}</span>
          {hasChildren && (
            <button
              onClick={() => setCollapsed((s) => ({ ...s, [node.id]: !s[node.id] }))}
              className="text-emerald-600 underline"
            >
              [{isCollapsed ? '+' : '−'}]
            </button>
          )}
        </div>
        {!isCollapsed && (
          <>
            <div className="whitespace-pre-wrap text-sm">{node.body}</div>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
              {isAuthed ? (
                <button className="underline" onClick={() => setReplyOpen((s) => ({ ...s, [node.id]: !s[node.id] }))}>
                  {replyOpen[node.id] ? 'Cancel' : 'Reply'}
                </button>
              ) : null}
            </div>
            {isAuthed && replyOpen[node.id] && (
              <form onSubmit={submitReply} className="mt-2">
                <textarea
                  name="body"
                  value={reply.data.body}
                  onChange={(e) => reply.setData('body', e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  rows={3}
                  placeholder="Write a reply"
                  required
                />
                {reply.errors.body && <p className="mt-1 text-sm text-red-600">{reply.errors.body}</p>}
                <button type="submit" disabled={reply.processing} className="mt-2 rounded bg-black px-3 py-1 text-white disabled:opacity-60">
                  {reply.processing ? 'Posting…' : 'Post reply'}
                </button>
              </form>
            )}
            {hasChildren && !isCollapsed && (
              <ul className="mt-3 space-y-3">
                {node.children!.map((child) => (
                  <CommentNode key={child.id} node={child} depth={depth + 1} />
                ))}
              </ul>
            )}
          </>
        )}
      </li>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold"><a href={link.url} target="_blank" rel="noreferrer" className="hover:underline">{link.title}</a> {link.domain && <span className="ml-2 text-sm text-gray-500">({link.domain})</span>}</h1>
        {link.description && <p className="mt-2 text-gray-700">{link.description}</p>}
        <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
          <button onClick={vote} className="rounded border px-2 py-1">▲ Upvote ({link.votes_count})</button>
          <span>by {link.user.name}</span>
        </div>
      </div>

      <div className="mb-6 border-t pt-4">
        <h2 className="mb-3 font-medium">Comments ({link.comments_count})</h2>
        {isAuthed ? (
          <form onSubmit={submit} className="mb-6">
            <textarea name="body" value={form.data.body} onChange={e => form.setData('body', e.target.value)} className="w-full rounded border px-3 py-2" rows={3} placeholder="Add a comment" required />
            {form.errors.body && <p className="mt-1 text-sm text-red-600">{form.errors.body}</p>}
            <button type="submit" disabled={form.processing} className="mt-2 rounded bg-black px-4 py-2 text-white disabled:opacity-60">Post</button>
          </form>
        ) : (
          <p className="text-sm text-gray-600">Please <InertiaLink href="/login" className="underline">sign in</InertiaLink> to comment.</p>
        )}

        <ul className="space-y-4">
          {comments.map((c) => (
            <CommentNode key={c.id} node={c} />
          ))}
        </ul>
      </div>
    </div>
  )
}
