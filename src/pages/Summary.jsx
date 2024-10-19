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
                description="Our project is designed to help people stay safe and informed during natural disasters. The webapp uses advanced geolocation technology and integrates real-time weather alerts to ensure users are aware of any dangerous conditions nearby. Whether it's avoiding hazardous weather or finding safe locations during emergencies, our tool empowers users with the information they need to make quick, informed decisions."
                isOpen={true}
              />
              <hr />
              <Accordion
                title="Our Vision 👓"
                description="Our vision is to create a world where no one is caught unprepared in the face of natural disasters. Through a seamless blend of real-time data, AI-driven chat assistance, and interactive mapping, we aim to make disaster preparedness accessible to everyone. Whether it's finding open gas stations, shelters, or preparing for incoming storms, our platform delivers essential resources at the click of a button."
              />
              <hr />
              <Accordion
                title="Challenges ⚡"
                description="Creating this platform posed some unique challenges, from integrating multiple real-time APIs to ensuring the accuracy of location-based alerts. We tackled issues like data overload, balancing user interface simplicity, and making sure the chatbot's AI was intuitive enough to assist people in moments of high stress. Despite these obstacles, our team was able to push through and deliver a dynamic, reliable app."
              />
              <hr />
              <Accordion
                title="Finale 🎉"
                description="We are incredibly proud of what we achieved with this project. By combining real-time data analytics, AI-driven chat functionality, and an intuitive user interface, we’ve built a tool that can save lives in critical moments. This app is more than just a tool—it's a lifeline for those facing emergencies, providing them with crucial resources and timely information to make the best decisions possible."
              />
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default Summary;
