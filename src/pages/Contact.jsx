import github from "../assets/img/png/github.svg";

function Contact() {
  return (
    <>
      <footer>
        <section id="contact">
          <div className="contact-div">
          <h2>Contact Us</h2>
          <p>
            Want to get in touch or learn more about our project? Feel free to
            reach out to us via our social media or email for more information.
          </p>
          <div className="grid github-container">
            <div className="github-item">
              <div className="git-name">
                <p className="github-name">sebilune</p>
              </div>
              <a
                href="https://github.com/sebilune"
                target="_blank"
                className="github-logo"
              >
                <img src={github} alt="GitHub Logo" />
              </a>
              <p>Sebi</p>
            </div>

            <div className="github-item">
              <div className="git-name">
                <p className="github-name">erickferpinedo</p>
              </div>
              <a
                href="https://github.com/Erickferpinedo"
                target="_blank"
                className="github-logo"
              >
                <img src={github} alt="GitHub Logo" />
              </a>
              <p>Erick</p>
            </div>

            <div className="github-item">
              <div className="git-name">
                <p className="github-name">monicaalyssa</p>
              </div>
              <a
                href="https://github.com/monicaalyssa"
                target="_blank"
                className="github-logo"
              >
                <img src={github} alt="GitHub Logo" />
              </a>
              <p>Monica</p>
            </div>

            <div className="github-item">
              <div className="git-name">
                <p className="github-name">legacyhardware</p>
              </div>
              <a
                href="https://github.com/legacyhardware"
                target="_blank"
                className="github-logo"
              >
                <img src={github} alt="GitHub Logo" />
              </a>
              <p>Aspen</p>
            </div>
          </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Contact;
