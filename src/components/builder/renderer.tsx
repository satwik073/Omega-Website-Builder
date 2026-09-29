'use client'

import { Render, type Data } from '@puckeditor/core'
import React from 'react'

import { puckConfig } from './config'

/**
 * Public page renderer.
 *
 * Runs the same config as the editor, so what an editor arranges is exactly
 * what visitors get. Client-side because several blocks (FAQ) are interactive
 * and Puck's slot rendering needs React context.
 */
const PageRenderer = ({ data }: { data: Data }) => (
  <Render config={puckConfig} data={data} />
)

export default PageRenderer
