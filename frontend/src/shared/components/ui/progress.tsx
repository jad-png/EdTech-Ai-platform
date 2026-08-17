import type { HTMLAttributes } from 'react'

export function Progress({ value = 0, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { value?: number }) { return <div className={`h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-alt)] ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} {...props}><div className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div> }
