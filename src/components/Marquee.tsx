const techs = [
  'TypeScript',
  'Node.js',
  'React',
  'Next.js',
  'NestJS',
  'Apache Kafka',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'gRPC',
  'Kubernetes',
  'FastAPI',
  'Redis',
  'GraphQL',
  'AWS',
  'Framer Motion',
];

const Marquee = () => {
  return (
    <div className="group relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
        {[...techs, ...techs].map((tech, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 font-mono text-sm text-slate-500"
          >
            {tech}
            <span className="h-1 w-1 rounded-full bg-cyan-500/50" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
