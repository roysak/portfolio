import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl";
import FlowField from "../components/bgfx/FlowField";
import { ArrowIcon } from "../components/Button";
import { Col, Grid, Plate, Register, Rule } from "../components/system";
import { useSpreadMotion } from "../hooks/useMotion";

const items = [
  {
    to: "/works/applications",
    title: "Applications",
    text: "Side projects and applications I've built.",
    meta: "4 builds · Product",
    art: <img src={assetUrl("/img/works/app-01.png")} alt="" width={1600} height={1200} loading="lazy" />,
  },
  {
    to: "/works/creative-coding",
    title: "Creative coding",
    text: "Interactive background effects created using AI tools.",
    meta: "6 effects · WebGL",
    art: <FlowField count={350} scale={0.006} colors={["#b8390a", "#1e3a5f"]} fade={0.08} />,
  },
  {
    to: "/works/digital-paintings",
    title: "Digital paintings",
    text: "A collection of digital artwork and illustrations.",
    meta: "9 pieces · Digital",
    art: <img src={assetUrl("/img/dp/Forest01.webp")} alt="" width={655} height={1000} loading="lazy" />,
  },
];

/** The Works contents page — three plates, one per gallery. */
export default function Works() {
  const ref = useSpreadMotion<HTMLElement>();

  return (
    <main ref={ref} className="relative px-margin pt-[clamp(28px,5vw,56px)] pb-[clamp(64px,9vw,128px)]">
      <Register className="left-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />
      <Register className="right-[calc(var(--margin)-22px)] top-[clamp(28px,5vw,56px)]" />

      <Grid className="gap-y-[clamp(32px,5vw,64px)]">
        <Col span={12}>
          <p className="label m-0 mb-5">
            <span className="text-accent">§ 02</span> <span className="ml-3">Plates</span>
          </p>
          <h1 data-set className="m-0 font-display font-medium text-display leading-[0.95] tracking-[-0.045em]">
            Works
          </h1>
          <p className="mt-5 m-0 font-serif text-lead text-ink-2 max-w-[46ch]">
            A curated gallery of craft and code — things built, things painted, things that only
            exist while the page is open.
          </p>
          <div className="mt-8">
            <Rule />
          </div>
        </Col>

        {items.map((it, i) => (
          <Col key={it.to} span={4}>
            <Link to={it.to} className="group block">
              <Plate no={i + 1} total={items.length} title={it.title} meta={it.meta} zoom>
                {it.art}
              </Plate>
              <p className="mt-3 mb-0 font-serif text-small text-ink-2">{it.text}</p>
              <span className="label inline-flex items-center gap-2 mt-3 group-hover:text-accent transition-colors">
                Open plate <ArrowIcon />
              </span>
            </Link>
          </Col>
        ))}
      </Grid>
    </main>
  );
}
