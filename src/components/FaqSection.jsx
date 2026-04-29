const faqs = [
  {
    question: 'How can I join the tech club?',
    answer: 'Use the Join Club button or contact the student coordinators in person during orientation week.',
  },
  {
    question: 'Do beginners get support?',
    answer: 'Yes. We run starter sessions for web, AI, and design before advanced project tracks begin.',
  },
  {
    question: 'Can I propose my own event idea?',
    answer: 'Absolutely. Submit your event brief and the team reviews logistics and mentor availability.',
  },
]

function FaqSection() {
  return (
    <section id="faq" className="reveal-root mt-10">
      <p className="reveal font-clean text-xs tracking-[0.24em] text-tech-muted">FAQ</p>
      <h2 className="reveal mt-2 font-display text-4xl font-semibold md:text-6xl">
        Questions <span className="text-tech-pink">Answered</span>
      </h2>
      <div className="mt-4 grid gap-4">
        {faqs.map((item) => (
          <article key={item.question} className="tilt-3d reveal p-2">
            <h3 className="font-display text-2xl font-medium">{item.question}</h3>
            <p className="mt-2 font-clean text-tech-muted">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
