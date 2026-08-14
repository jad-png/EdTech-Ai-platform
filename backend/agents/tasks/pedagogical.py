from crewai import Agent, Task


def build_pedagogical_task(agent: Agent) -> Task:
    return Task(
        description=(
            "Generate the final educational answer for {request}.\n"
            "Conversation history:\n{history}\n"
            "Retrieved context:\n{retrieved_context}\n"
            "Use the retrieved context when it is available. If it is not available, "
            "answer from general knowledge and be transparent when uncertain. Answer only the user."
        ),
        expected_output="The final educational answer.",
        agent=agent,
    )
