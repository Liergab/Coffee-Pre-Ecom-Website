import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
 
const reviews = [
  {
    name: "Café Latte",
    body: "A smooth, creamy combination of espresso and steamed milk, topped with a small layer of foam. This classic drink is a staple in most coffee shops.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Cappuccino",
    body: "A perfect balance of espresso, steamed milk, and a thick layer of milk foam. It is often sprinkled with cocoa powder or cinnamon.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Cold Brew",
    body: "Coffee steeped in cold water for 12-24 hours, resulting in a smoother, less acidic flavor. It’s served over ice and can be customized with milk or sweeteners.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Iced Mocha",
    body: "A decadent blend of espresso, chocolate syrup, cold milk, and ice, topped with whipped cream and chocolate drizzle for an indulgent coffee experience.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Espresso",
    body: "A concentrated shot of coffee brewed by forcing hot water through finely-ground coffee beans. It’s strong, bold, and often the base for many coffee drinks.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Mocha",
    body: "A mix of espresso, steamed milk, and chocolate syrup, topped with whipped cream. It’s a great option for those who enjoy a chocolatey twist to their coffee.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Dalgona Coffee",
    body: "A whipped coffee drink made by vigorously mixing instant coffee, sugar, and water until frothy, then served over cold or hot milk. It became popular during the pandemic.",
    img: "https://avatar.vercel.sh/james",
  },
];
 


 
const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
 
const CoffeeList = () => {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

export default CoffeeList