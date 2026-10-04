import { Link } from 'react-router-dom';
import { assetUrl } from '../utils/assetUrl';
const categories = [
  { path: 'applications', title: 'Applications', label: '01 / FUNCTION MEETS FORM', description: 'Side projects and applications, built from idea to interface. Thoughtful experiences brought to life with code.', image: 'works/app-01.png', alt: 'An application designed and developed by Roys' },
  { path: 'creative-coding', title: 'Creative coding', label: '02 / CODE AS A CANVAS', description: 'A playground of generative forms, unexpected patterns, and interactive experiments. Making room for the unexpected.', image: 'works/concentric-circle.png', alt: 'Generative concentric-circle artwork' },
  { path: 'digital-paintings', title: 'Digital paintings', label: '03 / BEYOND THE INTERFACE', description: 'Studies in color, light, and imagination. A collection of digital artwork and illustrations.', image: 'dp/SeaShore01.png', alt: 'A digitally painted seashore' },
];
export default function Works() {
  return <main className="work-index studio-container"><p className="eyebrow">THE EXPLORATIONS</p><h1>Curiosity,<br /><em>made tangible.</em></h1><p className="work-intro">A collection of things I’ve built, painted, and discovered along the way. Because the best ideas often start with play.</p>{categories.map(item => <Link key={item.path} to={`/works/${item.path}`} className="work-category"><div><span className="eyebrow">{item.label}</span><h2>{item.title}</h2><p>{item.description}</p><span className="text-link">Explore collection ↗</span></div><img src={assetUrl(`/img/${item.image}`)} alt={item.alt} loading="lazy" /></Link>)}</main>;
}
