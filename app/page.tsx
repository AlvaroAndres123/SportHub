import Image from "next/image";
import Welcome from "@/components/start/welcome";

export default function Home() {
  return (
    <div className="flex items-center bgimage">
      <Welcome />
    </div>
  );
}
