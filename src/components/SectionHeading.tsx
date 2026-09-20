import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import RevealText from './RevealText';
import Squiggle from './Squiggle';
import { staggerContainer, staggerItem, viewportOnce } from '../lib/motion';

interface Props {
  title: string;
  /** Short lead paragraph shown between the title and the squiggle. */
  intro?: ReactNode;
}

/** Page-level section header: title, optional intro, accent wave. */
const SectionHeading = ({ title, intro }: Props) => (
  <motion.div
    variants={staggerContainer(0.07)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
    className="mb-10"
  >
    <RevealText
      as="h2"
      trigger="inherit"
      text={title}
      className="text-3xl font-extrabold tracking-tight text-body sm:text-[2.1rem]"
    />

    {intro && (
      <motion.p
        variants={staggerItem}
        className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
      >
        {intro}
      </motion.p>
    )}

    <Squiggle className="mt-5" />
  </motion.div>
);

/** Smaller heading for blocks inside a section (Skills, Work History, …). */
export const SubHeading = ({
  title,
  intro,
}: {
  title: string;
  intro?: ReactNode;
}) => (
  <motion.div
    variants={staggerContainer(0.06)}
    initial="hidden"
    whileInView="show"
    viewport={viewportOnce}
    className="mb-6"
  >
    <motion.h3
      variants={staggerItem}
      className="text-xl font-bold tracking-tight text-body"
    >
      {title}
    </motion.h3>
    {intro && (
      <motion.p
        variants={staggerItem}
        className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted"
      >
        {intro}
      </motion.p>
    )}
  </motion.div>
);

export default SectionHeading;
