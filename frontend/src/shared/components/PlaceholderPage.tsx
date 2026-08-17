import { Card } from "./ui/Card";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Card className="placeholder-card">
      <p className="placeholder-card__label">Coming next</p>
      <h2>{title} workspace</h2>
      <p>This area is ready for the next implementation phase.</p>
    </Card>
  );
}
