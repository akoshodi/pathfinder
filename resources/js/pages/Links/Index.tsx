import { Form, Link as InertiaLink, useForm, router } from '@inertiajs/react'
import React from 'react'

interface User {
  id: number
  name: string
}

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

interface Paginator<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url?: string | null
  prev_page_url?: string | null
}

export default function LinksIndex({ links, voted = [], auth, sort = 'hot' }: { links: Paginator<LinkItem>, voted: number[], auth?: { user?: User | null }, sort?: string }) {
  const isAuthed = Boolean(auth?.user)

  const form = useForm({
    title: '',
    url: '',
    description: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    form.post('/links', {
      onSuccess: () => form.reset(),
    })
  }

  const handleVote = (id: number) => {
    if (!isAuthed) {
      router.visit('/login')
      return
    }
    router.post(`/links/${id}/vote`)
  }

  const sortTabs = [
    { label: 'Hot', value: 'hot' },
    { label: 'New', value: 'new' },
    { label: 'Top', value: 'top' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Links</h1>
        <p className="text-sm text-gray-600">A simple, fast link list like Hacker News/Lobsters.</p>
      </div>

      {/* Sort Tabs */}
      <div className="mb-6 flex gap-4 border-b">
        {sortTabs.map((tab) => (
          <InertiaLink
            key={tab.value}
            href={`/links?sort=${tab.value}`}
            className={`pb-2 text-sm font-medium ${
              sort === tab.value
                ? 'border-b-2 border-emerald-600 text-emerald-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </InertiaLink>
        ))}
      </div>

      {isAuthed && (
        <form onSubmit={submit} className="mb-10 rounded-lg border p-4">
          <h2 className="mb-3 font-medium">Submit a link</h2>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input name="title" value={form.data.title} onChange={e => form.setData('title', e.target.value)} className="w-full rounded border px-3 py-2" required />
              {form.errors.title && <p className="mt-1 text-sm text-red-600">{form.errors.title}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">URL</label>
              <input name="url" type="url" value={form.data.url} onChange={e => form.setData('url', e.target.value)} className="w-full rounded border px-3 py-2" required />
              {form.errors.url && <p className="mt-1 text-sm text-red-600">{form.errors.url}</p>}
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-1 block text-sm font-medium">Description (optional)</label>
            <textarea name="description" value={form.data.description} onChange={e => form.setData('description', e.target.value)} className="w-full rounded border px-3 py-2" rows={3} />
            {form.errors.description && <p className="mt-1 text-sm text-red-600">{form.errors.description}</p>}
          </div>
          <button type="submit" disabled={form.processing} className="rounded bg-black px-4 py-2 text-white disabled:opacity-60">
            {form.processing ? 'Submitting…' : 'Submit'}
          </button>
          {form.recentlySuccessful && <span className="ml-2 text-sm text-green-700">Submitted!</span>}
        </form>
      )}

      <ol className="space-y-3">
        {links.data.map((l, idx) => {
          const hasVoted = voted.includes(l.id)
          return (
            <li key={l.id} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-emerald-200 hover:bg-gray-50">
              <button
                onClick={() => handleVote(l.id)}
                aria-label={hasVoted ? 'Unvote' : 'Upvote'}
                className={`mt-1 h-6 w-6 shrink-0 rounded border text-center text-sm leading-5 ${hasVoted ? 'bg-amber-200 border-amber-500' : 'hover:border-emerald-600 hover:bg-emerald-50'}`}
                title={isAuthed ? (hasVoted ? 'Unvote' : 'Upvote') : 'Sign in to vote'}
              >▲</button>
              <div className="min-w-0 flex-1">
                <a href={l.url} target="_blank" rel="noreferrer" className="truncate font-medium text-gray-900 hover:text-emerald-700 hover:underline">{l.title}</a>
                {l.domain && <span className="ml-2 text-sm text-gray-500">({l.domain})</span>}
                <div className="text-xs text-gray-600">
                  {l.votes_count} points by {l.user.name} · <InertiaLink href={`/links/${l.id}`} className="hover:underline">{l.comments_count} comments</InertiaLink>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex items-center justify-between text-sm">
        {links.prev_page_url ? (
          <InertiaLink href={links.prev_page_url} className="rounded border px-3 py-1">Prev</InertiaLink>
        ) : <span />}
        {links.next_page_url ? (
          <InertiaLink href={links.next_page_url} className="rounded border px-3 py-1">Next</InertiaLink>
        ) : <span />}
      </div>
    </div>
  )
}
