type Span = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

type Block = {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: Span[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PTNode = Block | { _type: string; _key: string; [key: string]: any };

function renderChildren(children: Span[] | undefined): React.ReactNode {
  return children?.map((span, i) => {
    const key = `${span._key}-${i}`;
    let text: React.ReactNode = span.text;
    if (span.marks?.includes("strong")) text = <strong key={`${key}-b`}>{text}</strong>;
    if (span.marks?.includes("em")) text = <em key={`${key}-i`}>{text}</em>;
    return <span key={key}>{text}</span>;
  });
}

export default function PortableTextRenderer({ blocks }: { blocks: PTNode[] }) {
  const result: React.ReactNode[] = [];
  let bulletBuffer: React.ReactNode[] = [];
  let numberBuffer: React.ReactNode[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      result.push(
        <ul key={`ul-${result.length}`} className="my-5 space-y-2 pl-5 list-none">
          {bulletBuffer}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  const flushNumbers = () => {
    if (numberBuffer.length > 0) {
      result.push(
        <ol key={`ol-${result.length}`} className="my-5 list-decimal space-y-2 pl-6">
          {numberBuffer}
        </ol>
      );
      numberBuffer = [];
    }
  };

  for (const node of blocks) {
    if (node._type !== "block") continue;
    const block = node as Block;
    const children = renderChildren(block.children);

    if (block.listItem === "bullet") {
      flushNumbers();
      bulletBuffer.push(
        <li key={block._key} className="flex items-start gap-2.5 text-foreground-muted leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bapps-purple/60" />
          <span>{children}</span>
        </li>
      );
      continue;
    }

    if (block.listItem === "number") {
      flushBullets();
      numberBuffer.push(
        <li key={block._key} className="text-foreground-muted leading-relaxed">
          {children}
        </li>
      );
      continue;
    }

    flushBullets();
    flushNumbers();

    switch (block.style) {
      case "h2":
        result.push(
          <h2 key={block._key} className="font-[family-name:var(--font-display)] mt-12 mb-4 text-2xl tracking-tight text-foreground sm:text-3xl">
            {children}
          </h2>
        );
        break;
      case "h3":
        result.push(
          <h3 key={block._key} className="font-[family-name:var(--font-display)] mt-8 mb-3 text-xl font-semibold text-foreground">
            {children}
          </h3>
        );
        break;
      case "blockquote":
        result.push(
          <blockquote key={block._key} className="my-6 border-l-2 border-bapps-purple pl-6 text-foreground-muted italic">
            {children}
          </blockquote>
        );
        break;
      default: {
        const hasText = block.children?.some((s) => s.text.trim().length > 0);
        if (hasText) {
          result.push(
            <p key={block._key} className="my-4 leading-[1.8] text-foreground-muted">
              {children}
            </p>
          );
        }
        break;
      }
    }
  }

  flushBullets();
  flushNumbers();

  return <div className="text-base">{result}</div>;
}
