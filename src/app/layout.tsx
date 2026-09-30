import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter_Tight, Manrope } from "next/font/google";
import { PaletteSwitcher } from "@/components/palette-switcher";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  preload: false,
});

const isDev = process.env.NODE_ENV === "development";

/** Dev-only: re-apply the palette picked in PaletteSwitcher before first paint. */
const DEV_PALETTE_SCRIPT = `(function(){try{if(/\\/brands(\\/|$)/.test(location.pathname))return;var p=JSON.parse(localStorage.getItem("termmo-palette")||"null");if(!p||!p.surface)return;var r=document.documentElement;var h=String(p.surface).replace("#","");if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];var n=parseInt(h,16);var lum=((n>>16)&255)*0.2126+((n>>8)&255)*0.7152+(n&255)*0.0722;var dark=lum/255<0.5;r.style.setProperty("--accent",p.accent);r.style.setProperty("--surface",p.surface);r.style.setProperty("--background",p.background);if(dark){r.style.setProperty("--ink","#f4f0ea");r.style.setProperty("--foreground","#f4f0ea");r.style.setProperty("--muted","#b7ab9f");var mix=function(ch){return Math.round(ch+(255-ch)*0.08).toString(16).padStart(2,"0")};r.style.setProperty("--raised","#"+mix((n>>16)&255)+mix((n>>8)&255)+mix(n&255));return}r.style.setProperty("--ink","#210e03");r.style.setProperty("--foreground",p.surface);r.style.setProperty("--muted","#6d635c");r.style.setProperty("--raised","#ffffff")}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Termmo Balance — производство утеплителей и наполнителей",
  description:
    "Производство утеплителей, наполнителей и спецодежды в Казахстане с 2008 года. Сотрудничаем со швейными фабриками и государственными структурами.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${interTight.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {isDev ? (
        <head>
          <script dangerouslySetInnerHTML={{ __html: DEV_PALETTE_SCRIPT }} />
        </head>
      ) : null}
      <body className="min-h-full font-sans">
        {children}
        {isDev ? <PaletteSwitcher /> : null}
      </body>
    </html>
  );
}
