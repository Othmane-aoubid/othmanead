import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Othmane Aoubid | Full-Stack Developer",
    short_name: "Othmane Aoubid",
    description:
      "Full-Stack Developer & Cloud Engineer specializing in building secure web applications, scalable backend systems, and cloud-ready solutions. Based in Morocco.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#6c63ff",
    icons: [],
  };
}
