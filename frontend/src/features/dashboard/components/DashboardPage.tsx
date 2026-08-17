import { useEffect, useState } from "react";
import { useAuthStore } from "../../../features/auth/store/authStore";
import { LoadingState } from "../../../shared/components/LoadingState";
import { dashboardApi } from "../api/dashboardApi";
import { ConceptPerformance } from "./ConceptPerformance";
import { LearningJourney } from "./LearningJourney";
import { ProgressOverview } from "./ProgressOverview";
import { RecentActivity } from "./RecentActivity";
import { RecommendedActions } from "./RecommendedActions";
import { StatsGrid } from "./StatsGrid";
import { WeakConcepts } from "./WeakConcepts";
import { WelcomeHeader } from "./WelcomeHeader";
import styles from "./dashboard.module.css";

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [period, setPeriod] = useState("All time");
  const [analytics, setAnalytics] = useState<{
    total_attempts: number;
    average_score_percentage: number;
    best_score_percentage: number;
    worst_score_percentage: number;
    total_questions_answered: number;
    total_correct: number;
    total_incorrect: number;
  } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    dashboardApi
      .analytics()
      .then(({ data }) => setAnalytics(data))
      .catch(() => setError("Unable to load learning analytics."));
  }, []);
  if (!analytics && !error)
    return <LoadingState label="Loading your learning analytics…" />;
  if (!analytics) return <p role="alert">{error}</p>;
  return (
    <div className={`${styles.stack} mx-auto max-w-6xl`}>
      <WelcomeHeader
        name={user?.username ?? "there"}
        period={period}
        onPeriodChange={setPeriod}
      />
      <LearningJourney />
      <StatsGrid
        questions={analytics.total_questions_answered}
        quizzes={analytics.total_attempts}
        average={analytics.average_score_percentage}
      />
      <div className={`${styles.grid} lg:grid-cols-[1.35fr_.65fr]`}>
        <ProgressOverview average={analytics.average_score_percentage} />
        <ConceptPerformance
          correct={analytics.total_correct}
          incorrect={analytics.total_incorrect}
        />
      </div>
      <div className={styles.grid}>
        <WeakConcepts />
        <RecommendedActions />
      </div>
      <RecentActivity />
    </div>
  );
}

