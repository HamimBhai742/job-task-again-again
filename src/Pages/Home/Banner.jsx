import React from "react";
import { useTypewriter } from "react-simple-typewriter";
const Banner = () => {
  const [text] = useTypewriter({
    words: [
      `e-Commerce, standing for electronic commerce, is the process of
          customers shopping online and processing their payment. An eCommerce
          website allows visitors to find their products, add them to their
          cart and securely enter their payment information to complete their
          purchase.`,
    ],
    loop: 1,
    typeSpeed: 60,
  });
  return (
    <div className="relative bgBanner rounded-lg">
      <h3 className="absolute left-[450px] top-36 text-2xl font-semibold p-5 font-playwrite leading-[50px]">
        {text}
      </h3>
    </div>
  );
};

export default Banner;
