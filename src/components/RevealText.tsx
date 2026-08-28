import { ReactNode, createElement } from 'react';
import { motion } from 'framer-motion';
import { maskChild, staggerContainer, viewportOnce } from '../lib/motion';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

interface Props {
  text: string;
  as?: Tag;
  className?: string;
  /** Rendered inside the final word's mask so punctuation rides with it. */
  accent?: ReactNode;
  /** Rendered inside the first word's mask (e.g. a section number). */
  lead?: ReactNode;
  delay?: number;
  stagger?: number;
  /**
   * `view` self-triggers on scroll, `inherit` lets a parent variant tree drive
   * it (so the hero can sequence it), `mount` fires immediately.
   */
  trigger?: 'view' | 'inherit' | 'mount';
}

/**
 * Word-by-word masked reveal: each word sits in a clipped box and slides up
 * from behind it. Words stay intact so screen readers and text selection are
 * unaffected.
 *
 * Under `prefers-reduced-motion` the `y` transform is dropped by MotionConfig
 * and this degrades to a plain fade.
 */
const RevealText = ({
  text,
  as = 'span',
  className,
  accent,
  lead,
  delay = 0,
  stagger = 0.055,
  trigger = 'view',
}: Props) => {
  const words = text.split(' ');

  const inner = (
    <motion.span
      variants={staggerContainer(stagger, delay)}
      {...(trigger === 'view'
        ? { initial: 'hidden', whileInView: 'show', viewport: viewportOnce }
        : trigger === 'mount'
        ? { initial: 'hidden', animate: 'show' }
        : {})}
      className="inline"
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // Padding + matching negative margin gives descenders room without
          // changing the line box the mask occupies.
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]"
        >
          <motion.span variants={maskChild} className="inline-block">
            {i === 0 && lead}
            {word}
            {i === words.length - 1 && accent}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

  return createElement(as, { className }, inner);
};

export default RevealText;
