import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './BlogBody.module.css';

/**
 * Article body. Server component: the text is in the HTML crawlers and AI agents receive.
 * react-markdown does not interpret raw HTML and drops unsafe URL schemes (javascript:, data:),
 * which matters because the text is produced by a copywriter/generator, not by us.
 */
const isExternal = (href?: string) => !!href && /^https?:\/\//i.test(href) && !/\/\/(www\.)?ipropietas\.com\.ar/i.test(href);

export default function BlogBody({markdown}: {markdown: string}) {
  return (
    <div className={styles.body}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({href, children}) => (
            <a href={href} {...(isExternal(href) ? {target: '_blank', rel: 'noopener noreferrer'} : {})}>
              {children}
            </a>
          ),
          // Images live in dedicated fields (cover / second image), never inside the text.
          img: () => null,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
