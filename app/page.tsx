import Image from "next/image";
import Welcome from "@/components/start/welcome";
import About from "@/components/start/about";
import Navbar from "@/components/navbar";
import Footer from "@/components/start/footer";

export default function Home() {
  return (
    <main>    
            <Navbar /> 
          
      <div className="flex items-center bgimage">
     <Welcome />
      </div>

       <About/>
   
    <Footer/>
     </main>

  );
}
