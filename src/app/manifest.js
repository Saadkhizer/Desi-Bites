import { site } from "@/lib/site";

export default function manifest() {
  return {
    name: `${site.name} — Homemade Pakistani Food`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f1e4",
    theme_color: "#8c2a12",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
