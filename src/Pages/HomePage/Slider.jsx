import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const Slider = () => {
    return (
       <div className="w-full">
  <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
    

    <div className="relative">
      <img
        className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
        src="https://img-cdn.inc.com/image/upload/f_webp,c_fit,w_1920,q_auto/v1718742317/cms/getty_179504838_126297.jpg"
        alt=""
      />
     
    </div>

    <div className="relative">
      <img
        className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
        src="https://cdn.geckoandfly.com/wp-content/uploads/2017/05/life-lesson-quotes-01.jpg"
        alt=""
      />
     
    </div>


    <div className="relative">
      <img
        className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
        src="https://quotefancy.com/media/wallpaper/3840x2160/6946671-Frank-Sonnenberg-Quote-Lessons-in-life-will-be-repeated-until-they.jpg"
        alt=""
      />
    </div>
    <div className="relative">
      <img
        className="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover"
        src="https://i0.wp.com/returntowellness.co.uk/wp-content/uploads/2019/01/When-dealing-with-life-lessons-learned-from-illness-the-ground-may-not-feel-firm.png?resize=1080%2C675&ssl=1"
        alt=""
      />
    </div>

  </Carousel>
</div>
    );
};

export default Slider;