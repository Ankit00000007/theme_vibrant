import React from 'react';
import MainBanner from "../images/gif/main-science-banner.png";
import Pill1 from "../images/gif/Pills_Contents_69b2131f-973e-4677-8663-1171b49e748e_1024x1024e511.png";
import Pill2 from "../images/gif/Liposome_Structure_-_Banner_1024x10244f6b.png";
import gif1 from "../images/gif/How_Liposomal_Technology_Worksa6b5.gif";
import gif2 from "../images/gif/Liposome_Structure54b4.gif";
import "./science.css";

const Science = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7fffd4] to-[#98fb98] p-8">
      <div className="max-w-6xl mx-auto space-y-12 mb-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="font-medium">
            Alec Douglas Bangham, <span className="text-blue-700">a British hematologist</span>,
            first described liposomes in 1961 at the Babraham Institute in Cambridge.
          </h1>
          <p className="text-2xl">
            The name comes from the Greek words lipos, meaning fat, and soma, meaning body.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 ">
          {/* Left Column */}
          <div className="bg-white/30 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-lg space-y-4">
              <p>
                Liposomes are spherical vesicles that are biodegradable, biocompatible, non-toxic,
                and non-immunogenic. They can also be used to transport substances into the
                body by facilitating absorption in the mouth or by preventing breakdown by
                stomach acid.
              </p>
              {/* <p className="text-blue-700 italic">Let's see how...</p> */}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white/30 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-lg space-y-4">
              <p>
                The Science Behind Achieving excellent Results with Oral Sprays, particularly those utilizing 
                liposomal technology, have gained attention for their remarkable ability to enhance
                nutrient absorption especially those using liposomal technology, are so effective? 
                Here's a friendly breakdown of how they can deliver best and better results compared to
                traditional supplements!
              </p>
              {/* <p className="text-blue-700 italic">Let's see how...</p> */}
            </div>
          </div>
        </div>
          </div>
          <div className="text-center space-y-4">
              <img src={MainBanner} alt='banner-main' />
              <p className='main-banner-para'>Oral sprays represent a revolutionary approach to nutrient delivery, achieving significantly enhanced results—often 5 to 10 times greater than traditional supplements. At the heart of this effectiveness lies the advanced technology used to formulate these sprays.</p>
          </div>
          <div className="min-h-screen mt-12  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Pie Chart */}
          <div className="w-full max-w-md mx-auto">
                          <img src={Pill1} alt='pill'/>
          </div>

          {/* Right side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-medium mb-6">
              What a <span className="text-red-500">pill</span> contains?
            </h2>
            <p className="text-lg">
              Fillers like the name suggests are (literally) used to fill the size of the capsule,
              without which the capsule would appear empty and the consumer would be
              unable to take in any of it. Binders are the agents that bind the supplements
              together to protect them from chipping, cracking, breaking, crumbling apart.
            </p>
            <p className="text-lg">
              And Dyes are supposed to make the pill more desirable by adding a flavourful
              taste.
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 mb-12 text-center text-lg max-w-4xl mx-auto">
          <p>
            Therefore, while the pill may contain many components, it often lacks sufficient nutrients. In fact, only a small fraction
            of the active ingredient is actually available to your body from the large pill you consume.
          </p>
        </div>
      </div>
          </div>
          <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-medium">
              Our sublingual <span className="text-orange-400">sprays</span> contain NO
              binders, filler & dyes.
            </h2>
            <p className="text-lg">
              Vibrant sublingual sprays are crafted without any binders, fillers, or dyes. We
              prioritize keeping the ingredients as natural as possible, ensuring you receive only
              what's essential—no unnecessary fluff!
            </p>
          </div>

          {/* Right side - Circular Diagram */}
          <div className="w-full max-w-md mx-auto relative">
            <img src={Pill2} alt='pill'/>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center max-w-4xl mx-auto text-lg space-y-2">
          <p>
            Oral spray liposomal ingredients boast significantly higher absorption rates compared to traditional vitamins. This
            enhanced efficacy stems from the fact that the nutrients are pre-emulsified, 
            <span className="text-blue-600"> meaning they are already broken down into smaller, </span> 
            more bioavailable particles.
          </p>
          <p>
            As a result, these nutrients are prepared for immediate absorption
            by the body, bypassing the need for digestive juices to dismantle binders, fillers, and other inactive ingredients that
            often hinder nutrient uptake. This innovative delivery method ensures that your body can harness the full nutritional
            benefits quickly and effectively, promoting overall wellness in a more efficient manner.
          </p>
        </div>
          </div>
          <div className="max-w-6xl mt-24 mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-medium">
            Let's see how our oral spray achieves better results with liposomal technology
          </h1>
          <h2 className="text-2xl md:text-3xl">
            Liposomes: Facilitating Rapid Absorption
          </h2>
          <p className="text-lg max-w-4xl mx-auto">
            Better Utilization: Thanks to their design, your body can use more of the nutrients, delivering impressive health benefits whether you need a boost for immunity or overall wellness.
          </p>
        </div>

        {/* Illustrations and Descriptions */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Liposome Structure */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 aspect-square flex items-center justify-center">
              <img src={gif1} alt='gif'/>
            </div>
            <p className="text-center text-lg">
              Targeted Support: Many sprays focus on specific health needs, making it easy to find one that
              fits your goals. In summary, liposomal oral sprays offer a fun and effective way to enhance your
              health with up to four times better results. Why not give them a try?
            </p>
          </div>

          {/* Right Column - Hydrophobic Tail */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 aspect-square flex items-center justify-center">
              <img src={gif2} alt='gif'/>
            </div>
            <p className="text-center text-lg">
              Efficiency in Absorption: Oral sprays work fast. When you spray them in your mouth, nutrients
              are quickly absorbed through your mouth's tissues—no waiting for digestion. With oral spray
              liposomal formulations, you're ensuring that your body gets the maximum benefit from each
              dose, making it a highly effective choice for those seeking to optimize their nutrient intake.
            </p>
          </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Liposome Structure */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 aspect-square flex items-center justify-center">
              <img src={gif1} alt='gif'/>
            </div>
            <p className="text-center text-lg">
              Liposomal Protection: Nutrients are encapsulated in tiny bubbles called liposomes, shielding them from damage. This means more of the good stuff reaches your bloodstream!
            </p>
          </div>

          {/* Right Column - Hydrophobic Tail */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-8 aspect-square flex items-center justify-center">
              <img src={gif2} alt='gif'/>
            </div>
            <p className="text-center text-lg">
              Convenience: Oral sprays are easy to carry, and there’s no need for water—just a quick spray, and you’re good to go!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Science;