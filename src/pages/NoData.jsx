import React from 'react'

export default function NoData() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      background: '#f5f5f5'
    }}>
      <div style={{ fontSize: '2rem', color: '#333' }}>NO-Data</div>
    </div>
  )
}
