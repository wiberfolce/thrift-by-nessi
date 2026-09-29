import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  MoveDownRight,
  PackageCheck,
  Truck,
  X,
} from 'lucide-react';
import { products, categories } from '@/data/products';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  status: string;
  label: string;
  description: string;
};

const waNumbers = ['233242304326', '233501218442'];

function money(value: number) {
  return `GH₵ ${value.toLocaleString('en-GH')}`;
}

function whatsappUrl(product?: Product, number = waNumbers[0]) {
  const message = product
    ? `Hi, I'm interested in the ${product.name}. Is it still available?`
    : 'Hi, I would like to see the latest available pieces from thrift by Nessi.';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId('top')}
      className={`group flex items-center gap-2 text-left ${compact ? '' : 'shrink-0'}`}
      data-testid={compact ? 'footer-logo' : 'button-logo'}
    >
      <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] transition-transform duration-300 group-hover:rotate-6">
        <span className="font-display text-lg font-bold leading-none">N</span>
      </span>
      <span className="font-display text-[13px] font-bold uppercase leading-[.95] tracking-[-.03em]">
        thrift by
        <br />
        <span className="text-[hsl(var(--accent))]">Nessi</span>
      </span>
    </button>
  );
}

function Nav({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (value: boolean) => void }) {
  const links = [
    ['Shop', 'shop'],
    ['New Drops', 'drops'],
    ['About', 'about'],
    ['Delivery', 'delivery'],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background)/.9)] backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1360px] items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollToId(id)}
              className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
              data-testid={`nav-${id}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 bg-[hsl(var(--foreground))] px-4 py-3 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5 sm:flex"
            data-testid="nav-whatsapp"
          >
            <MessageCircle size={14} strokeWidth={1.8} />
            WhatsApp order
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[hsl(var(--foreground)/.15)] md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <div className={`overflow-hidden border-t border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--background))] transition-[max-height,opacity] duration-300 md:hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-5 py-5" aria-label="Mobile navigation">
          {links.map(([label, id]) => (
            <button
              type="button"
              key={id}
              onClick={() => {
                scrollToId(id);
                setMobileOpen(false);
              }}
              className="flex items-center justify-between border-b border-[hsl(var(--foreground)/.1)] py-4 text-left font-display text-2xl font-semibold"
              data-testid={`mobile-nav-${id}`}
            >
              {label}
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[hsl(var(--primary))] pt-[74px] text-[hsl(var(--primary-foreground))]">
      <div className="mx-auto grid min-h-[680px] max-w-[1360px] grid-cols-1 lg:grid-cols-[.92fr_1.08fr]">
        <div className="relative flex flex-col justify-between px-5 pb-12 pt-16 sm:px-10 lg:px-16 lg:pb-16 lg:pt-24">
          <div className="animate-rise">
            <p className="mb-6 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.18em] text-[hsl(var(--secondary))]">
              <span className="h-px w-8 bg-[hsl(var(--secondary))]" />
              Kwashieman / Accra
            </p>
            <h1 className="max-w-[650px] font-display text-[clamp(4rem,10vw,9.5rem)] font-semibold leading-[.82] tracking-[-.08em]">
              Good Fits.
              <br />
              <span className="text-[hsl(var(--secondary))]">Better Finds.</span>
            </h1>
            <p className="mt-9 max-w-[425px] text-base leading-7 text-[hsl(var(--primary-foreground)/.7)] sm:text-lg">
              Cargo pants, joggers, jeans, khakis and standout thrift pieces — carefully selected for your everyday style.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId('shop')}
                className="group flex items-center gap-4 bg-[hsl(var(--secondary))] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground))] transition-transform hover:-translate-y-1"
                data-testid="hero-shop"
              >
                Shop the collection
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-4 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground)/.78)] transition-colors hover:text-[hsl(var(--secondary))]"
                data-testid="hero-whatsapp"
              >
                <MessageCircle size={15} />
                Order on WhatsApp
              </a>
            </div>
          </div>
          <div className="mt-16 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[hsl(var(--primary-foreground)/.55)] lg:mt-0">
            <MapPin size={14} className="text-[hsl(var(--secondary))]" />
            Nationwide delivery across Ghana
          </div>
        </div>
        <div className="relative min-h-[430px] overflow-hidden bg-[hsl(var(--secondary))] lg:min-h-0">
          <img src="/images/hero-streetwear.jpg" alt="Editorial streetwear styling with relaxed cargo trousers" className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply transition-transform duration-700 hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.55)] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-5 flex items-center gap-3 sm:left-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--background)/.7)] text-[hsl(var(--background))]">
              <MoveDownRight size={18} />
            </span>
            <span className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background))]">Scroll to explore</span>
          </div>
          <span className="absolute right-5 top-6 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--background)/.75)] sm:right-10">01 / 06</span>
        </div>
      </div>
      <div className="border-t border-[hsl(var(--primary-foreground)/.15)]">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-9 gap-y-3 px-5 py-4 font-mono-custom text-[9px] uppercase tracking-[.14em] text-[hsl(var(--primary-foreground)/.55)] sm:px-10">
          <span>Curated thrift</span><span>Everyday style</span><span>Easy WhatsApp ordering</span><span>Limited finds</span>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onView }: { product: Product; onView: (product: Product) => void }) {
  return (
    <article className="group" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[hsl(var(--muted))]">
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" data-testid={`img-product-${product.id}`} />
        <div className="absolute left-3 top-3 bg-[hsl(var(--background)/.9)] px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.12em]">{product.label}</div>
        <button
          type="button"
          onClick={() => onView(product)}
          className="absolute bottom-3 left-3 right-3 translate-y-2 bg-[hsl(var(--background)/.94)] px-4 py-3 text-left font-mono-custom text-[10px] uppercase tracking-[.1em] opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          data-testid={`button-view-${product.id}`}
        >
          View details <ArrowUpRight className="float-right" size={14} />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 border-b border-[hsl(var(--foreground)/.14)] py-4">
        <div>
          <h3 className="font-display text-base font-semibold tracking-[-.02em]" data-testid={`text-product-name-${product.id}`}>{product.name}</h3>
          <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.13em] text-[hsl(var(--muted-foreground))]">{product.category} <span className="mx-1">/</span> {product.status}</p>
        </div>
        <p className="font-mono-custom text-xs font-medium" data-testid={`text-price-${product.id}`}>{money(product.price)}</p>
      </div>
      <a
        href={whatsappUrl(product)}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between py-3 font-mono-custom text-[9px] uppercase tracking-[.1em] text-[hsl(var(--accent))] transition-colors hover:text-[hsl(var(--foreground))]"
        data-testid={`link-order-${product.id}`}
      >
        Order on WhatsApp <MessageCircle size={14} />
      </a>
    </article>
  );
}

function Shop({ onView }: { onView: (product: Product) => void }) {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? products : filter === 'New Drops' ? products.filter((p) => p.label === 'NEW' || p.label === 'JUST IN') : products.filter((p) => p.category === filter), [filter]);
  return (
    <section id="shop" className="mx-auto max-w-[1360px] scroll-mt-20 px-5 py-24 sm:px-10 lg:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">01 / The edit</p>
          <h2 className="font-display text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[.86] tracking-[-.08em]">Find Your<br /><span className="text-[hsl(var(--accent))]">Next Fit.</span></h2>
          <p className="mt-6 max-w-[430px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Fresh thrift pieces for everyday wear. Stock moves fast, so if you see something you like, grab it.</p>
        </div>
        <div className="hide-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap border px-4 py-3 font-mono-custom text-[9px] uppercase tracking-[.11em] transition-colors ${filter === category ? 'border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'border-[hsl(var(--foreground)/.18)] hover:border-[hsl(var(--foreground))]'}`}
              data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-14">
        {filtered.map((product) => <ProductCard key={product.id} product={product} onView={onView} />)}
      </div>
      {filtered.length === 0 && <div className="border border-dashed border-[hsl(var(--foreground)/.2)] py-20 text-center font-mono-custom text-xs uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">New pieces are being added soon.</div>}
    </section>
  );
}

function Featured() {
  const featured = products.slice(0, 4);
  return (
    <section className="bg-[hsl(var(--secondary))] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--foreground)/.6)]">02 / The favourites</p>
            <h2 className="max-w-[580px] font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.87] tracking-[-.08em]">The Pieces<br /><span className="text-[hsl(var(--accent))]">Everyone Wants</span></h2>
          </div>
          <p className="max-w-[290px] text-sm leading-6 text-[hsl(var(--foreground)/.65)]">From cargos that complete the fit to everyday jeans you can wear anywhere — find pieces that work with your wardrobe.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.18fr_.82fr_.82fr]">
          <div className="relative col-span-2 aspect-[1.18/1] overflow-hidden bg-[hsl(var(--primary))] lg:col-span-1 lg:row-span-2 lg:aspect-auto">
            <img src={featured[0].image} alt={featured[0].name} className="h-full w-full object-cover mix-blend-screen transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[hsl(var(--primary)/.8)] to-transparent p-5 pt-16 text-[hsl(var(--background))]">
              <span className="font-display text-xl font-semibold">{featured[0].name}</span><ArrowUpRight size={18} />
            </div>
          </div>
          {featured.slice(1).map((product) => (
            <div key={product.id} className="relative aspect-[4/5] overflow-hidden bg-[hsl(var(--muted))]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[hsl(var(--primary)/.75)] to-transparent p-3 pt-12 text-[hsl(var(--background))]">
                <span className="font-display text-sm font-semibold">{product.name}</span><ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Drops({ onView }: { onView: (product: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: number) => ref.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  return (
    <section id="drops" className="scroll-mt-20 bg-[hsl(var(--primary))] px-5 py-24 text-[hsl(var(--primary-foreground))] sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--secondary))]">03 / Just landed</p>
            <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.84] tracking-[-.08em]">Fresh Drops.<br /><span className="text-[hsl(var(--secondary))]">Limited Pieces.</span></h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center border border-[hsl(var(--primary-foreground)/.25)] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]" aria-label="Previous drops" data-testid="button-drops-previous"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center border border-[hsl(var(--primary-foreground)/.25)] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]" aria-label="Next drops" data-testid="button-drops-next"><ChevronRight size={18} /></button>
          </div>
        </div>
        <p className="mt-7 max-w-[430px] text-sm leading-6 text-[hsl(var(--primary-foreground)/.65)]">Thrift stock changes quickly. New pieces come in, good pieces go out. Check the latest drop before it's gone.</p>
        <div ref={ref} className="hide-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto pb-2">
          {products.map((product) => (
            <div key={product.id} className="min-w-[72vw] snap-start sm:min-w-[300px] lg:min-w-[340px]">
              <ProductCard product={product} onView={onView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['01', 'Find Your Fit', 'Browse the latest cargos, joggers, jeans and thrift finds.'],
    ['02', 'Message Us', 'Tap the WhatsApp button and send the item you are interested in.'],
    ['03', 'Get It Delivered', 'Confirm your details and receive your order anywhere in Ghana.'],
  ];
  return (
    <section className="border-b border-[hsl(var(--foreground)/.15)] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">04 / No guesswork</p><h2 className="font-display text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[.86] tracking-[-.08em]">Your fit,<br /><span className="text-[hsl(var(--accent))]">sorted.</span></h2></div>
          <div className="grid border-t border-[hsl(var(--foreground)/.18)]">
            {steps.map(([number, title, copy]) => <div key={number} className="grid grid-cols-[50px_1fr] gap-5 border-b border-[hsl(var(--foreground)/.18)] py-7 sm:grid-cols-[75px_1fr_1fr] sm:gap-8"><span className="font-mono-custom text-xs text-[hsl(var(--accent))]">{number}</span><h3 className="font-display text-xl font-semibold">{title}</h3><p className="col-start-2 text-sm leading-6 text-[hsl(var(--muted-foreground))] sm:col-start-auto">{copy}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryAndAbout() {
  return (
    <>
      <section id="delivery" className="scroll-mt-20 overflow-hidden bg-[hsl(var(--accent))] px-5 py-24 text-[hsl(var(--background))] sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--background)/.7)]">05 / On the move</p><h2 className="max-w-[800px] font-display text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.83] tracking-[-.09em]">From Kwashieman<br /><span className="text-[hsl(var(--secondary))]">to Your Door.</span></h2></div>
          <div><div className="mb-7 flex h-24 w-24 items-center justify-center border border-[hsl(var(--background)/.4)]"><Truck size={37} strokeWidth={1} /></div><p className="max-w-[340px] text-base leading-7 text-[hsl(var(--background)/.8)]">We're based in Kwashieman, Accra and deliver nationwide across Ghana. Message us to confirm delivery details for your order.</p></div>
        </div>
      </section>
      <section id="about" className="scroll-mt-20 px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">06 / The reason</p><h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.85] tracking-[-.08em]">Thrift, But<br /><span className="text-[hsl(var(--accent))]">Make It Your Style.</span></h2></div>
          <div className="border-l-2 border-[hsl(var(--secondary))] pl-6 sm:pl-10"><p className="max-w-[490px] text-lg leading-8">We source pieces for people who want everyday clothes with personality — from relaxed cargos and joggers to jeans, khakis and other standout finds.</p><div className="mt-9 grid gap-3 font-mono-custom text-[10px] uppercase tracking-[.11em] text-[hsl(var(--muted-foreground))]"><span className="flex items-center gap-3"><MapPin size={15} className="text-[hsl(var(--accent))]" /> Kwashieman, Accra</span><span className="flex items-center gap-3"><PackageCheck size={15} className="text-[hsl(var(--accent))]" /> Nationwide delivery</span><span className="flex items-center gap-3"><MessageCircle size={15} className="text-[hsl(var(--accent))]" /> Order via WhatsApp</span></div></div>
        </div>
      </section>
    </>
  );
}

function SocialAndCta() {
  return (
    <>
      <section className="border-y border-[hsl(var(--foreground)/.15)] px-5 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">07 / From the timeline</p><h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.85] tracking-[-.08em]">Seen It on X?<br /><span className="text-[hsl(var(--accent))]">Shop It Here.</span></h2></div>
          <div className="flex flex-col gap-7 lg:items-end"><p className="max-w-[470px] text-base leading-7 text-[hsl(var(--muted-foreground))] lg:text-right">We post new pieces and fresh finds on social. When something catches your eye, you can now shop it directly through the store.</p><a href="https://x.com/Esinkumabakofi/status/2104648800073556128/video/1" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 border-b border-[hsl(var(--foreground))] pb-2 font-mono-custom text-[10px] uppercase tracking-[.12em] transition-colors hover:text-[hsl(var(--accent))]" data-testid="link-x-reference">See more on X <ExternalLink size={14} /></a></div>
        </div>
      </section>
      <section className="bg-[hsl(var(--secondary))] px-5 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div><p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-[hsl(var(--foreground)/.55)]">Ready when you are</p><h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.84] tracking-[-.08em]">See Something<br /><span className="text-[hsl(var(--accent))]">You Like?</span></h2><p className="mt-7 max-w-[420px] text-sm leading-6 text-[hsl(var(--foreground)/.7)]">Send us a message with the piece you're interested in. We'll confirm availability, size and delivery details on WhatsApp.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={whatsappUrl(undefined, waNumbers[0])} target="_blank" rel="noreferrer" className="flex min-w-[220px] items-center justify-between bg-[hsl(var(--foreground))] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.11em] text-[hsl(var(--background))] transition-transform hover:-translate-y-1" data-testid="cta-whatsapp-primary">Chat on WhatsApp <MessageCircle size={16} /></a><a href={whatsappUrl(undefined, waNumbers[1])} target="_blank" rel="noreferrer" className="flex min-w-[220px] items-center justify-between border border-[hsl(var(--foreground)/.3)] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.11em] transition-colors hover:bg-[hsl(var(--background)/.25)]" data-testid="cta-whatsapp-secondary">Use second line <ArrowRight size={16} /></a></div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--primary))] px-5 pb-28 pt-16 text-[hsl(var(--primary-foreground))] sm:px-10 sm:pb-10">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col justify-between gap-12 border-b border-[hsl(var(--primary-foreground)/.18)] pb-16 lg:flex-row">
          <div><Logo compact /><p className="mt-7 max-w-[250px] text-sm leading-6 text-[hsl(var(--primary-foreground)/.6)]">Curated thrift. Everyday style. Better finds.</p></div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-mono-custom text-[10px] uppercase tracking-[.11em] text-[hsl(var(--primary-foreground)/.68)]"><button type="button" onClick={() => scrollToId('shop')} className="text-left hover:text-[hsl(var(--secondary))]" data-testid="footer-shop">Shop</button><button type="button" onClick={() => scrollToId('drops')} className="text-left hover:text-[hsl(var(--secondary))]" data-testid="footer-drops">New drops</button><button type="button" onClick={() => scrollToId('delivery')} className="text-left hover:text-[hsl(var(--secondary))]" data-testid="footer-delivery">Delivery</button><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--secondary))]" data-testid="footer-whatsapp">WhatsApp</a><a href="https://x.com/Esinkumabakofi/status/2104648800073556128/video/1" target="_blank" rel="noreferrer" className="hover:text-[hsl(var(--secondary))]" data-testid="footer-x">X reference</a></div>
          <div className="font-mono-custom text-[10px] uppercase tracking-[.11em] text-[hsl(var(--primary-foreground)/.68)]"><p className="mb-4 text-[hsl(var(--secondary))]">Find us</p><p>Kwashieman, Accra</p><p className="mt-2">Nationwide delivery across Ghana</p><p className="mt-4">+233 24 230 4326</p><p className="mt-2">+233 50 121 8442</p></div>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-6 font-mono-custom text-[9px] uppercase tracking-[.1em] text-[hsl(var(--primary-foreground)/.42)] sm:flex-row"><span>thrift by Nessi</span><span>© {new Date().getFullYear()} / All finds reserved</span></div>
      </div>
    </footer>
  );
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[hsl(var(--primary)/.72)] p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${product.name} details`} data-testid="product-modal">
      <button type="button" onClick={onClose} className="absolute inset-0 cursor-default" aria-label="Close product details" data-testid="button-modal-overlay" />
      <div className="relative z-10 grid max-h-[92dvh] w-full max-w-[900px] overflow-auto bg-[hsl(var(--background))] sm:grid-cols-2">
        <div className="relative aspect-square bg-[hsl(var(--muted))] sm:aspect-auto"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /><span className="absolute left-4 top-4 bg-[hsl(var(--background)/.92)] px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[.1em]">{product.label}</span></div>
        <div className="relative flex flex-col p-6 sm:p-10"><button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-[hsl(var(--foreground)/.18)] transition-colors hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]" aria-label="Close product details" data-testid="button-close-modal"><X size={16} /></button><p className="mt-9 font-mono-custom text-[10px] uppercase tracking-[.14em] text-[hsl(var(--accent))]">{product.category}</p><h2 className="mt-4 max-w-[330px] font-display text-4xl font-semibold leading-[.9] tracking-[-.06em]" data-testid="modal-product-name">{product.name}</h2><p className="mt-5 font-mono-custom text-lg" data-testid="modal-product-price">{money(product.price)}</p><p className="mt-8 text-sm leading-7 text-[hsl(var(--muted-foreground))]" data-testid="modal-product-description">{product.description}</p><div className="mt-8 flex items-center gap-2 border-y border-[hsl(var(--foreground)/.15)] py-4 font-mono-custom text-[10px] uppercase tracking-[.1em]"><Check size={15} className="text-[hsl(var(--accent))]" /> {product.status}</div><a href={whatsappUrl(product)} target="_blank" rel="noreferrer" className="mt-auto flex items-center justify-between bg-[hsl(var(--foreground))] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[hsl(var(--background))] transition-transform hover:-translate-y-1" data-testid="modal-order-whatsapp">Check availability on WhatsApp <MessageCircle size={16} /></a></div>
      </div>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <div className="grain min-h-[100dvh] bg-[hsl(var(--background))]">
      <Nav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Hero />
        <Shop onView={setSelected} />
        <Featured />
        <Drops onView={setSelected} />
        <HowItWorks />
        <DeliveryAndAbout />
        <SocialAndCta />
      </main>
      <Footer />
      <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-3 bg-[hsl(var(--secondary))] px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground))] shadow-lg sm:hidden" data-testid="mobile-whatsapp-cta"><MessageCircle size={17} /> Order on WhatsApp</a>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;