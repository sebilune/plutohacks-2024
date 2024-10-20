import PlutoHacksLogo from "../assets/img/png/PlutoHacks-HeadTitle-1280x414.png";
import Accordion from "../components/Accordion";

const Summary = () => {
  return (
    <>
      <div className="summary">
        <section className="summary-hero">
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
              <Accordion title="Challenges ⚡" description={
              <p>One of the biggest challenges we faced at the beginning of our project was choosing the right idea to move forward with. As a team, we had two very different concepts on the table. The first was the project we eventually chose, while the second involved creating a system with offline capabilities to assist with hurricane relief efforts. This system would use QR codes to help delivery drivers distrubute packages to specific locations, which seemed innovative but also came with significant risks.
              <br /><br />If we encountered major issues or ran out of time, we realized we wouldn&apos;t have a strong foundation for the project. The offline concept was appealing, but with limited time it could leave us without a solid end product if things didn&apos;t go as planned. 
              <br /><br />In the end, we decided to go with the first idea because it felt like the safer option. This choice allowed us to build a strong foundation for our project, ensuring that even if we faced time constraints, we could still implement various components and have something solid to present.
              </p>} />
              <hr />
              <Accordion title="Finale 🎉" description={<p>Our app serves as a vital resource for individuals facing the threat of hurricanes. We aim to enhance community preparedness, ensuring that everyone has the information they need to stay safe during significant weather events, potentially saving lives.
              <br /><br />Working together as a team has been a rewarding experience, and we are grateful for everyone&apos;s important contributions to this project. Despite the limited time, we made the most of every moment and feel confident that our app can make a positive impact on others.
              </p>}/>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default Summary;
