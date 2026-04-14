function inlineFormat(text: string, keyBase: string) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/);
    if (m) {
      return (
        <strong key={`${keyBase}-${i}`} className="font-semibold text-zinc-900">
          {m[1]}
        </strong>
      );
    }
    return part;
  });
}

function blockKey(i: number) {
  return `b-${i}`;
}

export function SimpleArticleBody({ body }: { body: string }) {
  const rawBlocks = body.trim().split(/\n\s*\n/);

  return (
    <div className="article-prose space-y-4 text-[17px] leading-[1.7] text-zinc-800">
      {rawBlocks.map((block, blockIndex) => {
        const lines = block.split("\n").map((l) => l.trimEnd());
        const nonEmpty = lines.filter((l) => l.length > 0);
        if (nonEmpty.length === 0) return null;

        const first = nonEmpty[0];
        const key = blockKey(blockIndex);

        if (first.startsWith("### ")) {
          return (
            <h3 key={key} className="!mt-8 text-xl font-bold tracking-tight text-zinc-900">
              {inlineFormat(first.slice(4), `${key}-h3`)}
            </h3>
          );
        }

        if (first.startsWith("## ") && !first.startsWith("###")) {
          return (
            <h2 key={key} className="!mt-10 text-2xl font-bold tracking-tight text-zinc-900 first:!mt-0">
              {inlineFormat(first.slice(3), `${key}-h2`)}
            </h2>
          );
        }

        if (nonEmpty.every((l) => /^-\s+/.test(l))) {
          return (
            <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-zinc-800">
              {nonEmpty.map((l, j) => (
                <li key={`${key}-li-${j}`}>{inlineFormat(l.replace(/^-\s+/, ""), `${key}-li-${j}`)}</li>
              ))}
            </ul>
          );
        }

        if (nonEmpty.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={key} className="my-4 list-decimal space-y-2 pl-6 text-zinc-800">
              {nonEmpty.map((l, j) => (
                <li key={`${key}-oli-${j}`}>{inlineFormat(l.replace(/^\d+\.\s+/, ""), `${key}-oli-${j}`)}</li>
              ))}
            </ol>
          );
        }

        if (first.startsWith("> ")) {
          const quoteLines = nonEmpty.map((l) => (l.startsWith("> ") ? l.slice(2) : l));
          return (
            <blockquote
              key={key}
              className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-5 py-4 text-[16px] leading-relaxed text-amber-950"
            >
              {quoteLines.map((line, j) => (
                <p key={`${key}-q-${j}`} className={j > 0 ? "mt-2" : ""}>
                  {inlineFormat(line, `${key}-q-${j}`)}
                </p>
              ))}
            </blockquote>
          );
        }

        return (
          <p key={key} className="text-zinc-800">
            {nonEmpty.map((line, j) => (
              <span key={`${key}-p-${j}`}>
                {j > 0 ? (
                  <>
                    <br />
                  </>
                ) : null}
                {inlineFormat(line, `${key}-p-${j}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
