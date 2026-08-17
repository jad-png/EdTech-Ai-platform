import { useState, type FormEvent } from "react";
import { Button } from "../../../shared/components/ui/Button";
import { FollowUpActions } from "./FollowUpActions";
import { SuggestedPrompt } from "./SuggestedPrompt";
import styles from "./chat.module.css";
export function ChatInput({
  onSend,
  isLoading = false,
  suggestions = [],
  followUps = [],
}: {
  onSend?: (message: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
  followUps?: string[];
}) {
  const [value, setValue] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  }
  return (
    <form className={styles.inputArea} onSubmit={submit}>
      {suggestions.length > 0 && (
        <div className={styles.followups}>
          {suggestions.map((suggestion) => (
            <SuggestedPrompt
              key={suggestion}
              prompt={suggestion}
              onSelect={setValue}
            />
          ))}
        </div>
      )}
      {followUps.length > 0 && <FollowUpActions actions={followUps} />}
      <div className={styles.inputRow}>
        <textarea
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ask about your learning material…"
          aria-label="Message"
          rows={1}
        />
        <Button type="submit" loading={isLoading} disabled={!value.trim()}>
          {isLoading ? "Sending…" : "Send"}
        </Button>
      </div>
    </form>
  );
}
