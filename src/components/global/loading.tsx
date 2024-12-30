import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div role="status">
      <CircularProgress size={60} />
    </div>
  )
}

export default Loading
