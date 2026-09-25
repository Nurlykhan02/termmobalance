import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { PaletteSwitcher } from "@/components/palette-switcher";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

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
      className={`${manrope.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var brands=/\\/brands(\\/|$)/.test(location.pathname);var key=brands?"termmo-palette-brands":"termmo-palette";var p=JSON.parse(localStorage.getItem(key)||"null");if(!p&&brands)p={accent:"#c4a574",surface:"#2c2824",background:"#141210"};if(!p||!p.surface)return;var r=document.documentElement;var h=String(p.surface).replace("#","");if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];var n=parseInt(h,16);var lum=((n>>16)&255)*0.2126+((n>>8)&255)*0.7152+(n&255)*0.0722;var dark=lum/255<0.5;r.style.setProperty("--accent",p.accent);r.style.setProperty("--surface",p.surface);r.style.setProperty("--background",p.background);if(dark){r.style.setProperty("--ink","#f4f0ea");r.style.setProperty("--foreground","#f4f0ea");r.style.setProperty("--muted","#b7ab9f");var mix=function(ch){return Math.round(ch+(255-ch)*0.08).toString(16).padStart(2,"0")};r.style.setProperty("--raised","#"+mix((n>>16)&255)+mix((n>>8)&255)+mix(n&255));return}r.style.setProperty("--ink","#210e03");r.style.setProperty("--foreground",p.surface);r.style.setProperty("--muted","#6d635c");r.style.setProperty("--raised","#ffffff")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        {children}
        <PaletteSwitcher />
      </body>
    </html>
  );
}
