import React from 'react'
import Spinner from 'ui/spinner'

export default function LoadingSlate() {
  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner />
    </div>
  )
}
