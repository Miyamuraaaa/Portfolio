import { favoriteWords } from "@/data/favoriteWords";
import "@/app/words.css";

/** Ten favorite words with their meanings. Reveals use the same data-reveal system as the rest of the page. */
export default function FavoriteWords() {
  return (
    <section id="words" className="words-section editorial-shell" aria-labelledby="words-title">
      <div className="section-heading" data-reveal-group>
        <div>
          <p className="eyebrow" data-reveal="label">TEN FAVORITE WORDS</p>
          <h2 id="words-title" data-reveal="title">Words I <em>keep close.</em></h2>
        </div>
        <p data-reveal="description">Ten words,<br />and what they mean.</p>
      </div>
      <ol className="words-list">
        {favoriteWords.map((item, index) => (
          <li key={item.word} className="word-row" data-reveal-group data-reveal-offset={index % 3 * 12}>
            <span className="word-divider" data-reveal="line" aria-hidden="true" />
            <span className="eyebrow word-number" data-reveal="label">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="word-term" data-reveal="title">{item.word}</h3>
            <p className="word-meaning" data-reveal="description">{item.meaning}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
