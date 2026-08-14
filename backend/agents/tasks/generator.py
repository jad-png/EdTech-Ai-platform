from crewai import Agent, Task


def build_generator_task(agent: Agent) -> Task:
    return Task(
        description=(
            "Generate a structured JSON quiz based only on the retrieved context below.\n"
            "Retrieved context:\n{retrieved_context}\n"
            "Number of questions: {num_questions}\n"
            "Difficulty level: {difficulty}\n"
            "Topic: {topic}\n"
            "Return STRICT JSON ONLY with no markdown formatting, using this schema:\n"
            '{{"quiz_title":"Title based on context","questions":['
            '{{"question":"Question text?","explanation":"Why the correct option is right",'
            '"options":[{{"text":"Option A","is_correct":true}},'
            '{{"text":"Option B","is_correct":false}},'
            '{{"text":"Option C","is_correct":false}},'
            '{{"text":"Option D","is_correct":false}}]}}]}}'
        ),
        expected_output="Strict JSON containing quiz_title and questions with options.",
        agent=agent,
    )
