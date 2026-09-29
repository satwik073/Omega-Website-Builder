import type { Data } from '@puckeditor/core'

/**
 * Reading and writing the page document.
 *
 * `FunnelPage.content` is a single JSON string column that previously held the
 * legacy editor's element tree (an array whose first node is `__body`). Puck
 * stores a different shape — `{ root, content, zones }` — so anything read out
 * of the column has to be sniffed before it is trusted, otherwise opening an
 * old page would hand Puck an array and crash the editor.
 *
 * Legacy documents are not converted. The two formats describe different
 * component sets, so a silent "migration" would quietly change what a page
 * looks like. Instead an old page opens as a blank Puck document and the
 * original JSON is left untouched in the database until it is saved over.
 */

export const emptyPuckData = (title = 'Untitled page'): Data =>
  ({
    // Root props are typed against the default Config; ours adds description
    // and background, so the shape is widened here rather than loosening the
    // Data type everywhere it is used.
    root: { props: { title, description: '', background: 'page' } },
    content: [],
    zones: {},
  }) as Data

/** True when the parsed JSON looks like a Puck document. */
const isPuckData = (value: unknown): value is Data =>
  !!value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Array.isArray((value as Data).content)

/** True when the parsed JSON is a legacy element tree. */
export const isLegacyDocument = (value: unknown): boolean =>
  Array.isArray(value) &&
  (value.length === 0 || (value as any[])[0]?.type === '__body')

export type ParsedPage = {
  data: Data
  /** The stored document was from the retired editor and was not imported. */
  legacy: boolean
}

export const parsePageContent = (
  content: string | null | undefined,
  title = 'Untitled page'
): ParsedPage => {
  if (!content?.trim()) return { data: emptyPuckData(title), legacy: false }

  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    // Corrupt JSON should not take the editor down with it.
    return { data: emptyPuckData(title), legacy: false }
  }

  if (isPuckData(parsed)) {
    const data = parsed as Data
    return {
      data: {
        ...data,
        root: data.root ?? { props: { title } },
        content: data.content ?? [],
      },
      legacy: false,
    }
  }

  return { data: emptyPuckData(title), legacy: isLegacyDocument(parsed) }
}

export const serializePageContent = (data: Data) => JSON.stringify(data)
