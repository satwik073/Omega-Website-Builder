/**
 * How the flat sidebar options from the database are grouped in the nav.
 *
 * `SidebarOption` rows are seeded as a flat list with no grouping, but a flat
 * list of eight links reads as a pile rather than a structure. Grouping is
 * declared here, keyed by the option name as seeded in `lib/queries`.
 *
 * Anything unmatched falls into the trailing "More" group rather than being
 * dropped, so a newly seeded option always appears somewhere.
 */

export type NavGroup = {
  /** Omitted for the leading group, which needs no heading. */
  label?: string
  /** Option names, in the order they should appear. */
  items: string[]
}

/** Options pinned to the footer, away from the primary navigation. */
export const FOOTER_ITEMS = ['Settings', 'Launchpad']

export const AGENCY_GROUPS: NavGroup[] = [
  { items: ['Dashboard'] },
  { label: 'Workspace', items: ['Sub Accounts', 'Team'] },
  { label: 'Account', items: ['Billing'] },
]

export const SUBACCOUNT_GROUPS: NavGroup[] = [
  { items: ['Dashboard'] },
  { label: 'Content', items: ['Funnels', 'Media'] },
  { label: 'Customers', items: ['Contacts', 'Pipelines', 'Automations'] },
]

/**
 * Splits options into grouped primary nav and footer items, preserving the
 * declared order and appending anything unrecognised.
 */
export const buildNav = <T extends { name: string }>(
  options: T[],
  groups: NavGroup[]
) => {
  const byName = new Map(options.map((o) => [o.name, o]))
  const used = new Set<string>()

  const primary = groups
    .map((group) => ({
      label: group.label,
      items: group.items
        .map((name) => {
          const option = byName.get(name)
          if (option) used.add(name)
          return option
        })
        .filter(Boolean) as T[],
    }))
    .filter((group) => group.items.length > 0)

  const footer = FOOTER_ITEMS.map((name) => {
    const option = byName.get(name)
    if (option) used.add(name)
    return option
  }).filter(Boolean) as T[]

  const leftovers = options.filter((o) => !used.has(o.name))
  if (leftovers.length) primary.push({ label: 'More', items: leftovers })

  return { primary, footer }
}
