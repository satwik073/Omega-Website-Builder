# Deprecated: in-house funnel editor

Everything in this directory (`funnel-editor`, `funnel-editor-sidebar`,
`funnel-editor-navigation`, `funnel-editor-layers`) is the original hand-rolled
page editor. It is **no longer routed to**. The editor route now renders
`@/components/builder/editor`, which is built on Puck.

The code is kept rather than deleted because:

- Pages saved before the switch still hold this editor's document format in
  `FunnelPage.content`. Nothing rewrites those rows, so the old tree is intact
  and this renderer is the only thing that can read it.
- It documents the element schema used by `providers/editor/editor-provider`,
  which those legacy rows depend on.

Do not add features here. New block work belongs in
`src/components/builder/blocks/`.
