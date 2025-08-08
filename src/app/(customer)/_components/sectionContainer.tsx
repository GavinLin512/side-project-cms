import type { SectionContainerProps } from "@/customer/_types/type";


const SectionContainer = ({ children }: SectionContainerProps) => {
  return(
    <section className="bg-background pt-40 px-8">
      <div className="container mx-auto flex flex-col items-center">
        {children}
      </div>
    </section>
  )
}

export default SectionContainer;
