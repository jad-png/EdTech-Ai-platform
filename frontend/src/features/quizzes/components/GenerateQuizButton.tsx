import { Button } from "../../../shared/components/ui/Button";
export function GenerateQuizButton({
  onGenerate,
  loading = false,
}: {
  onGenerate?: () => void;
  loading?: boolean;
}) {
  return (
    <Button type="button" onClick={onGenerate} loading={loading}>
      {loading ? "Preparing quiz…" : "Generate quiz"}
    </Button>
  );
}
