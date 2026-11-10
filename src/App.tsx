import { useRef } from "react";
import { AnnouncementBar, Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ServiceMarquee } from "./components/ServiceMarquee";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { HoursLocation } from "./components/HoursLocation";
import { About } from "./components/About";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { PrivacyDialog, type PrivacyDialogHandle } from "./components/PrivacyDialog";

export default function App() {
  const privacy = useRef<PrivacyDialogHandle>(null);
  const openPrivacy = () => privacy.current?.open();

  return (
    <>
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-fjord-800 focus:px-5 focus:py-3 focus:text-white"
      >
        Hopp til innhold
      </a>
      <AnnouncementBar />
      <Header />
      <main id="innhold">
        <Hero />
        <ServiceMarquee />
        <Services />
        <HowItWorks />
        <HoursLocation />
        <About />
        <Faq />
        <Contact onOpenPrivacy={openPrivacy} />
      </main>
      <Footer onOpenPrivacy={openPrivacy} />
      <PrivacyDialog ref={privacy} />
    </>
  );
}
