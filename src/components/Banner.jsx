
const Banner = () => {
  return (
    <div>
      <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full">
    <img
      src="https://img.freepik.com/premium-psd/black-friday-sale-social-media-post-instagram-post-web-banner-facebook-cover-template_220443-1071.jpg?semt=ais_hybrid"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://img.pikbest.com/origin/10/01/82/867pIkbEsTAIq.png!w700wp"
      className="w-full" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <img
      src="https://images.all-free-download.com/images/thumbjpg/ecommerce_website_banner_template_shoppers_sketch_6920121.jpg"
      className="w-full" />
  </div>
  <div id="item4" className="carousel-item w-full">
    <img
      src="https://static.vecteezy.com/system/resources/thumbnails/006/642/998/small/online-shopping-on-website-e-commerce-applications-and-digital-marketing-hand-holding-smartphonwith-the-delivery-man-template-for-banner-web-landing-page-social-media-flat-design-concept-vector.jpg"
      className="w-full" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>
    </div>
  );
};

export default Banner;