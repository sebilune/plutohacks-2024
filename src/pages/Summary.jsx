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
          <div className="project-accordions">
            <article>
              <Accordion
                title="Project Overview 📖"
                description="SEMA is an all-in-one emergency preparedness platform designed to keep users informed and safe during disasters. It provides real-time weather notifications sourced from the National Weather Service, ensuring timely alerts about severe weather conditions. SEMA highlights nearby shelters, displays the nearest gas stations, and features a chatbot for quick access to disaster-related information."
                isOpen={true}
              />
              <hr />
              <Accordion
                title="Our Vision 👓"
                description="Our goal is to create a user-friendly platform that provides timely information and essential resources, enabling users to make informed decisions during crises. We hope SEMA offers valuable insights that empower users to make the best choices, including timely evacuation, ultimately protecting lives from life-threatening situations."
              />
              <hr />
              <Accordion
                title="Challenges ⚡"
                description= ""/>
              <hr />
              <Accordion
                title="Finale 🎉"
                description=""
              />
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default Summary;
