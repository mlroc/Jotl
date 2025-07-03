'use client'

import { useState } from 'react'
import { Button } from './ui/button'

export function InteractiveCounter() {
  const [count, setCount] = useState(0)

  return (
    <div className="my-6 rounded-lg border bg-card text-card-foreground p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <p className="m-0 font-medium">
        This is an interactive component. You've clicked the button{' '}
        <span className="font-bold text-primary">{count}</span> times!
      </p>
      <Button onClick={() => setCount(count + 1)}>Click Me</Button>
    </div>
  )
} 