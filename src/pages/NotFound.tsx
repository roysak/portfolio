import { useLocation } from "react-router-dom";
import Button, { ArrowIcon } from "../components/Button";
import { Col, Grid, Register } from "../components/system";

/** A mis-registered sheet — the plate that never made it into the book. */
export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="relative px-margin pt-[clamp(48px,9vw,120px)] pb-[clamp(64px,9vw,128px)] min-h-[62svh]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(48px,9vw,120px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(48px,9vw,120px)]" />

      <Grid className="gap-y-8">
        <Col span={12} className="pb-4 border-b border-rule">
          <span className="label text-accent">Error 404</span>
        </Col>

        <Col span={7}>
          {/* Two off-register impressions of the same word — a printing misfeed. */}
          <h1 className="relative m-0 font-display font-medium text-display leading-[0.9] tracking-[-0.045em]">
            <span aria-hidden="true" className="absolute inset-0 text-accent/45 translate-x-[0.07em] translate-y-[0.03em]">
              Plate not found
            </span>
            <span className="relative">Plate not found</span>
          </h1>

          <p className="mt-6 mb-0 font-serif text-lead text-ink-2 max-w-[42ch]">
            This one never made it to press. The plate you asked for isn't in the book.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button to="/" primary>
              <ArrowIcon /> Return to cover
            </Button>
            <Button to="/works">Browse the plates</Button>
          </div>
        </Col>

        <Col span={4} start={9} className="self-end">
          <dl className="m-0 border-t border-rule">
            <div className="flex items-baseline gap-4 py-2.5 border-b border-rule">
              <dt className="label shrink-0 w-20">Requested</dt>
              <dd className="m-0 font-mono text-small break-all">{pathname}</dd>
            </div>
            <div className="flex items-baseline gap-4 py-2.5 border-b border-rule">
              <dt className="label shrink-0 w-20">Status</dt>
              <dd className="m-0 text-small text-ink-2">Not in this edition</dd>
            </div>
          </dl>
        </Col>
      </Grid>
    </main>
  );
}
