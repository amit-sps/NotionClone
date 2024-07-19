import documents  from "../../assets/documents.png";
import documentsDark from "../../assets/documents-dark.png";
import reading from "../../assets/reading.png";
import readingDark from "../../assets/reading-dark.png";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <img
            src={documents}
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <img
            src={documentsDark}
            className="object-contain hidden dark:block"
            alt="Documents"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <img
            src={reading}
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <img
            src={readingDark}
            className="object-contain hidden dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
