import { Card } from '../../../shared/components/ui/Card'
import { ProgressChart } from './ProgressChart'
import styles from './dashboard.module.css'
export function ProgressOverview({ average }: { average: number }) { return <Card className={styles.panel}><div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="mb-1">Learning progress</h2><p className="m-0 text-xs text-[var(--color-text-muted)]">Your practice score over the last week</p></div><strong className="font-[Space_Grotesk] text-2xl">{average}%</strong></div><ProgressChart /></Card> }
