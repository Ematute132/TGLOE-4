import HomePhone from "@/components/HomePhone";
import HomePC from "@/components/HomePC";

export default function HomePage() {
  // Both layouts render; Tailwind breakpoints (md:) decide which is visible.
  // This avoids a layout flash from client-side device detection.
  return (
    <>
      <HomePhone />
      <HomePC />
    </>
  );
}
