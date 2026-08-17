import { useEffect, useState } from "react";
import { LoadingState } from "../../../shared/components/LoadingState";
import { documentsApi } from "../../documents/api/documentsApi";
import { QuizGenerator } from "../components/QuizGenerator";
import { QuizHeader } from "../components/QuizHeader";
import { QuizProgress } from "../components/QuizProgress";
import { QuestionCard } from "../components/QuestionCard";
import { QuizActions } from "../components/QuizActions";
import { QuestionNavigation } from "../components/QuestionNavigation";
import { QuizResult } from "../components/QuizResult";
import { quizzesApi } from "../api/quizzesApi";
import type {
  QuizAttempt,
  QuizQuestion,
  QuizRecord,
} from "../components/types";
import { Card } from "../../../shared/components/ui/Card";
import styles from "../components/quizzes.module.css";

function mapQuestion(question: QuizRecord["questions"][number]): QuizQuestion {
  const isTrueFalse =
    question.options.length === 2 &&
    question.options.every((option) => /^(true|false)$/i.test(option.text));
  return {
    id: question.id,
    type:
      question.options.length === 0
        ? "open"
        : isTrueFalse
          ? "true-false"
          : "multiple-choice",
    prompt: question.text,
    options: question.options.map((option) => option.text),
    explanation: question.explanation ?? undefined,
  };
}

export function QuizzesPage() {
  const [mode, setMode] = useState<"configure" | "quiz" | "result">(
    "configure",
  );
  const [documents, setDocuments] = useState<
    Array<{ id: string; title: string }>
  >([]);
  const [quiz, setQuiz] = useState<QuizRecord | null>(null);
  const [savedQuizzes, setSavedQuizzes] = useState<QuizRecord[]>([]);
  const [history, setHistory] = useState<QuizAttempt[]>([]);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    Promise.all([documentsApi.list(), quizzesApi.list(), quizzesApi.history()])
      .then(([documentsResponse, quizzesResponse, historyResponse]) => {
        setDocuments(
          documentsResponse.data.map((document) => ({
            id: document.id,
            title: document.title,
          })),
        );
        setSavedQuizzes(quizzesResponse.data);
        setHistory(historyResponse.data);
      })
      .catch(() => setError("Unable to load quiz data."))
      .finally(() => setLoading(false));
  }, []);
  async function generate(payload: {
    documentId: string;
    numQuestions: number;
    difficulty: string;
  }) {
    setWorking(true);
    setError("");
    try {
      const { data } = await quizzesApi.generate({
        document_id: payload.documentId,
        num_questions: payload.numQuestions,
        difficulty: payload.difficulty.toUpperCase(),
      });
      const started = await quizzesApi.start(data.id);
      setQuiz(data);
      setAttempt(started.data);
      setCurrent(0);
      setAnswers({});
      setMode("quiz");
    } catch {
      setError("Unable to generate this quiz. Please try again.");
    } finally {
      setWorking(false);
    }
  }
  async function finish() {
    if (!quiz || !attempt) return;
    setWorking(true);
    try {
      const submitted = await quizzesApi.submit(
        attempt.id,
        quiz.questions.map((question) => ({
          question_id: question.id,
          selected_option_id:
            question.options.find(
              (option) => option.text === answers[question.id],
            )?.id ?? null,
        })),
      );
      setAttempt(submitted.data);
      setMode("result");
    } catch {
      setError("Unable to submit your answers.");
    } finally {
      setWorking(false);
    }
  }
  if (loading) return <LoadingState label="Loading quiz options…" />;
  if (mode === "configure")
    return (
      <div className={styles.stack}>
        {error && <p role="alert">{error}</p>}
        {documents.length ? (
          <QuizGenerator
            documents={documents}
            loading={working}
            onGenerate={generate}
          />
        ) : (
          <p>No documents are ready for quiz generation.</p>
        )}
        <Card className={styles.resultItem}>
          <h2>Saved quizzes</h2>
          {savedQuizzes.length ? (
            savedQuizzes.map((item) => (
              <p key={item.id}>
                {item.title} · {item.difficulty}
              </p>
            ))
          ) : (
            <p>No quizzes generated yet.</p>
          )}
          <h2>Attempt history</h2>
          {history.length ? (
            history.slice(0, 5).map((item) => (
              <p key={item.id}>
                {item.status} · {item.percentage}%
              </p>
            ))
          ) : (
            <p>No attempts yet.</p>
          )}
        </Card>
      </div>
    );
  if (mode === "result" && attempt)
    return (
      <div className={styles.stack}>
        {error && <p role="alert">{error}</p>}
        <QuizResult attempt={attempt} />
      </div>
    );
  if (!quiz || !attempt) return null;
  const question = mapQuestion(quiz.questions[current]);
  const answerKeys = quiz.questions
    .map((item) => item.id)
    .filter((id) => answers[id]);
  return (
    <div className={styles.stack}>
      {error && <p role="alert">{error}</p>}
      <Card>
        <QuizHeader title={quiz.title} difficulty={quiz.difficulty} />
        <QuizProgress current={current + 1} total={quiz.questions.length} />
        <QuestionCard
          question={question}
          value={answers[question.id]}
          onChange={(value) => setAnswers({ ...answers, [question.id]: value })}
        />
        <QuizActions
          onPrevious={() => setCurrent(Math.max(0, current - 1))}
          onNext={() =>
            current === quiz.questions.length - 1
              ? void finish()
              : setCurrent(current + 1)
          }
          isLast={current === quiz.questions.length - 1}
        />
        <QuestionNavigation
          total={quiz.questions.length}
          current={current}
          answered={quiz.questions
            .map((item, index) => (answerKeys.includes(item.id) ? index : -1))
            .filter((index) => index >= 0)}
          onSelect={setCurrent}
        />
      </Card>
    </div>
  );
}
