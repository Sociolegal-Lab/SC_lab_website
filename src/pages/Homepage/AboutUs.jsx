export default function AboutUs() {
  return (
    <section className="mr-about">
      <div className="mr-about__inner">
        <h2 className="mr-about__title">About Us</h2>

        <div className="mr-about__grid">
          {/* DATA */}
          <div className="mr-about__item">
            <img
              src="/images/circle.png"
              alt="circle"
              className="mr-shape-img"
            />
            <div className="mr-about__label">DATA</div>
            <div className="mr-about__lines">
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* LAW */}
          <div className="mr-about__item">
            <img
              src="/images/triangle.png"
              alt="triangle"
              className="mr-shape-img"
            />
            <div className="mr-about__label">LAW</div>
            <div className="mr-about__lines">
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>

          {/* SOCIETY */}
          <div className="mr-about__item">
            <img
              src="/images/star.png"
              alt="star"
              className="mr-shape-img"
            />
            <div className="mr-about__label">SOCIETY</div>
            <div className="mr-about__lines">
              <div>50465406845</div>
              <div>05306543032</div>
              <div>053022000</div>
              <div>000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
