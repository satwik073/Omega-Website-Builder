import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStripeOAuthLink(
  accountType: 'agency' | 'subaccount',
  state: string
) {
  return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_URL}${accountType}&state=${state}`
}


/**
 * Builds a display name from Clerk's optional name parts.
 *
 * Clerk leaves `firstName`/`lastName` null for email-only sign-ups, and the
 * template literal `${firstName} ${lastName}` was persisting names like
 * "Satwik null" straight into the database.
 */
export const buildUserName = (
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null
) => {
  const name = [firstName, lastName].filter(Boolean).join(' ').trim()
  if (name) return name
  // Fall back to the email local part rather than an empty string, so the
  // team table and avatars always have something to show.
  return email?.split('@')[0] ?? 'User'
}

/**
 * Strips the "null"/"undefined" fragments that older rows persisted into
 * free-text strings such as activity-log entries.
 */
export const cleanText = (text?: string | null) =>
  (text ?? '')
    .replace(/\b(null|undefined)\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

/** Cleans up names already persisted in the broken "First null" form. */
export const displayName = (name?: string | null, email?: string | null) => {
  const cleaned = (name ?? '')
    .replace(/\b(null|undefined)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned || email?.split('@')[0] || 'User'
}
