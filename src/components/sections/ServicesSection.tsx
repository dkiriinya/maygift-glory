import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";

const services = [
  {
    num: "01",
    title: "Legal VA",
    items: [
      "Legal Document Drafting & Formatting",
      "Case & Matter Management",
      "Deadline & Court Date Tracking",
      "Legal Research & Summarisation",
      "Client Intake & Confidential Communications",
    ],
    tools: "Clio · DocuSign · Adobe Sign · G-Suite",
  },
  {
    num: "02",
    title: "Executive VA",
    items: [
      "Calendar & Schedule Management",
      "Executive Inbox Management",
      "Travel & Itinerary Coordination",
      "Research & Executive Briefings",
      "Stakeholder & Client Liaison",
      "Meeting Coordination & Follow-Through",
    ],
    tools: "Google Calendar · Outlook · Calendly · Zoom",
  },
  {
    num: "03",
    title: "Administrative VA",
    items: [
      "Document & File Management",
      "Data Entry & Database Management",
      "Invoicing & Expense Tracking",
      "Process Documentation & SOPs",
      "Vendor & Procurement Support",
      "Customer Support & Communications",
    ],
    tools: "Asana · Trello · ClickUp · Notion · G-Suite",
  },
  {
    num: "04",
    title: "SMM VA",
    items: [
      "Content Creation",
      "Content Calendar Planning & Scheduling",
      "Graphic Design for Social Media",
      "Community Management & Engagement",
      "Analytics & Performance Reporting",
      "Hashtag Research & SEO Optimisation",
    ],
    tools: "Canva · Meta Business Suite · CapCut · Later",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="px-[6vw] bg-bg flex-col justify-center items-start gap-[3.5rem] min-h-screen flex max-[900px]:pt-24 max-[900px]:pb-16"
    >
      <div className="w-full flex justify-between items-end max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4">
        <RevealWrapper>
          <div>
            <Label>What I Do</Label>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3.6rem)] font-bold text-text leading-[1.1] tracking-[-0.02em] max-w-[460px]">
              Core services &
              <br />
              <em className="text-accent">niches.</em>
            </h2>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <Button href="https://calendly.com/maygiftgloryvirtualassistance" external variant="primary">
            Book a Call
          </Button>
        </RevealWrapper>
      </div>

      <div className="grid grid-cols-4 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1 gap-6 w-full">
        {services.map((svc, idx) => (
          <RevealWrapper key={svc.num} delay={(idx + 1) * 100}>
            <div
              className="relative bg-white p-[2.5rem_2rem] overflow-hidden transition-all duration-300 ease-spring cursor-default hover:-translate-y-1 hover:shadow-xl
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-accent after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-400 after:ease-spring"
            >
              <p className="font-serif text-[4rem] font-black text-card-bg leading-none mb-4 select-none">
                {svc.num}
              </p>
              <h3 className="font-serif text-[1.3rem] font-bold text-text mb-[1.2rem] leading-[1.2]">
                {svc.title}
              </h3>
              <ul className="flex flex-col gap-2 mb-[1.8rem] list-none">
                {svc.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-[0.82rem] text-text opacity-70 flex items-start gap-2.5 leading-[1.5]"
                  >
                    <span className="text-rose text-[0.82rem] select-none flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-card-bg pt-[1.2rem]">
                <p className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase text-rose mb-2">
                  Tools
                </p>
                <p className="text-[0.78rem] text-accent font-medium leading-[1.6]">
                  {svc.tools}
                </p>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  );
}
