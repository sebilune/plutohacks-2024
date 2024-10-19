import PlutoHacksLogo from "../assets/img/png/PlutoHacks-HeadTitle-1280x414.png";

import Accordion from "../components/Accordion";

const Summary = () => {
  return (
    <>
      <div className="summary">
        <section className="hero">
          <h1>
            <div className="img-container">
              <img
                src={PlutoHacksLogo}
                alt="description"
                loading="lazy"
                className="pluto-img"
              />
            </div>
          </h1>
          <section id="home" className="centered">
            <hgroup className="text-center">
              <h1>
                Welcome to our submission for
                <div>
                  <span className="anim-rainbow">&nbsp;PlutoHacks&nbsp;</span>
                  2024!
                </div>
              </h1>
              <p className="text-center">A Broward College Hackathon</p>
            </hgroup>
            <p className="text-center">
              This webapp is dedicated to our hackathon project. You can find
              all the information from our start to finish here. We&apos;re
              excited to share our journey!
            </p>
          </section>
          <div className="project-accordions centered-stacked">
            <article>
              <Accordion
                title="Project Overview 📖"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              animi rem vero saepe totam odio dicta iste accusantium explicabo
              ut! Exercitationem, cupiditate nostrum itaque perspiciatis
              voluptates illo ut eius illum."
                isOpen={true}
              />
              <hr />
              <Accordion
                title="Our Vision 👓"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              animi rem vero saepe totam odio dicta iste accusantium explicabo
              ut! Exercitationem, cupiditate nostrum itaque perspiciatis
              voluptates illo ut eius illum."
              />
              <hr />
              <Accordion
                title="Challenges ⚡"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              animi rem vero saepe totam odio dicta iste accusantium explicabo
              ut! Exercitationem, cupiditate nostrum itaque perspiciatis
              voluptates illo ut eius illum."
              />
              <hr />
              <Accordion
                title="Finale 🎉"
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              animi rem vero saepe totam odio dicta iste accusantium explicabo
              ut! Exercitationem, cupiditate nostrum itaque perspiciatis
              voluptates illo ut eius illum."
              />
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default Summary;
