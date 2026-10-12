import Link from 'next/link';
import type {PostLink, PropertyLink} from '@/lib/crawlable';

interface BlockProps<T> {
  title: string;
  intro?: string;
  items: T[];
}

/**
 * Plain, visible link list rendered on the server. It gives crawlers (and people) a direct path to every
 * listing/article from the main pages. Renders nothing when there is nothing to list.
 * Heading uses `h2.h4` so it takes the template's h4 size instead of the huge global h2 size.
 */
function LinkBlock({title, intro, items}: {title: string; intro?: string; items: Array<{id: string; href: string; title: string; detail: string}>}) {
  if (items.length === 0) return null;
  return (
    <section className='pt-80 pb-60 border-top' aria-label={title}>
      <div className='container'>
        <h2 className='h4 mb-10'>{title}</h2>
        {intro && <p className='mb-30 text-muted'>{intro}</p>}
        <ul className='style-none row gx-4 gy-3 m-0'>
          {items.map((item) => (
            <li key={item.id} className='col-md-6 col-lg-4'>
              <Link href={item.href} className='d-block'>
                <strong className='d-block fw-500'>{item.title}</strong>
                {item.detail && <span className='d-block fs-14 text-muted'>{item.detail}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PropertyLinkIndex({title, intro, items}: BlockProps<PropertyLink>) {
  return <LinkBlock title={title} intro={intro} items={items} />;
}

export function PostLinkIndex({title, intro, items}: BlockProps<PostLink>) {
  return <LinkBlock title={title} intro={intro} items={items} />;
}
