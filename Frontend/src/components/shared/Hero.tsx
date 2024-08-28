import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision"
import { TypewriterEffectSmooth }       from "../ui/typewriter-effect";
import coffeeBeans                      from '../../assets/icons/coffeeBeans.png'
import coffeeToGo                       from '../../assets/icons/coffeeToGo.png'
import coffeeCup                        from '../../assets/icons/coffeeCup.png'
const Hero = () => {
    const words = [
        {
          text: "Discover ",
        },
        {
          text: "the ",
        },
        {
          text: "Magic ",
        },
        {
          text: "in ",
        },
        {
          text: "Every",
          
        },
        {
            text: "Sip",
            
          },
      ];
  return (
    <div>
        <BackgroundBeamsWithCollision className="relative">
            <div className="absolute top-[50%]">
                <img src={coffeeBeans} alt=""  className="w-10 h-10"/>
            </div>
            <div className="absolute top-[25%] left-20 transform -rotate-45">
                <img src={coffeeBeans} alt=""  className="w-14 h-14"/>
            </div>
            <div className="absolute top-[15%] right-20 transform rotate-45">
                <img src={coffeeBeans} alt="" className="w-14 h-14" />
            </div>
            <div className="absolute top-[75%] right-60 transform rotate-45">
                <img src={coffeeToGo} alt="" className="w-14 h-14 animate-bounce " />
            </div>
            <div className="absolute top-[75%] left-60 ">
                <img src={coffeeCup} alt="" className="w-14 h-14" />
            </div>
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                <TypewriterEffectSmooth words={words} />
                <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                    <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-black dark:text-white bg-gradient-to-r py-4 from-brown-500 via-brown-600 to-brown-700 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                        <span className="">Freshly Roasted Coffee.</span>
                    </div>
                    <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-brown-500 via-brown-600 to-brown-700 py-4">
                        <span className="">Freshly Roasted Coffee.</span>
                    </div>
                </div>
            </h2>
        </BackgroundBeamsWithCollision>
    </div>
  )
}

export default Hero