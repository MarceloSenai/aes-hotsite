const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 5
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

// Periodic cleanup of expired entries
if (typeof globalThis !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, CLEANUP_INTERVAL_MS)
  // Don't block process exit
  if (timer.unref) timer.unref()
}

export function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  let entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS }
    store.set(key, entry)
  }

  entry.count++
  const allowed = entry.count <= MAX_ATTEMPTS
  const remaining = Math.max(0, MAX_ATTEMPTS - entry.count)

  return { allowed, remaining, resetAt: entry.resetAt }
}
