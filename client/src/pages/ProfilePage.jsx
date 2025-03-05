import React from "react";
import "../styles/pages-styles/profile-page.css";

function Profile() {
  return (
    <div className="cv-container">
      <h1 className="cv-title" style={{ animationDelay: "1s" }}>
        Navid Elyasi
      </h1>

      <div className="cv-section">
        <div className="contact">
          <p>
            Email:
            <a href="mailto:navid.elyasi@gmail.com">navid.elyasi@gmail.com</a>
          </p>
          <p>Phone: (+47) 48637867</p>
          <p>Location: Oslo, Norway</p>
          <p>
            LinkedIn:
            <a href="https://www.linkedin.com/in/navidelyasi/" target="_blank">
              https://www.linkedin.com/in/navidelyasi/
            </a>
          </p>
        </div>
      </div>

      <div className="cv-section">
        <h2 className="cv-title">Profile</h2>
        <p>
          Experienced professional with a proven track record in project
          planning, IT, and consulting. With over 7 years of experience,
          supported by two master’s degrees—Master’s of Project Management from
          NTNU, Trondheim (2022), and Master’s of Industrial Engineering (2013).
          Skilled in analyzing project risks, optimizing resource allocation,
          and ensuring on-time project delivery by aligning with key performance
          indicators (KPIs). Adept at improving process efficiency through
          data-driven decision-making and fostering cross-functional
          collaboration to meet project objectives.
        </p>
        <br />
        <p>
          Skilled in identifying and solving technical challenges to ensure that
          solutions meet requirements. I contribute to maintaining documentation
          and establishing best practices in development and integration, while
          closely collaborating with customers and teams through workshops to
          define requirements and achieve project goals.
        </p>
        <br />
        <p>
          I am also working on a web application (full stack) aimed at teaching
          the Persian language. You can visit{" "}
          <a href="navidelyasi.com">my application</a> for more information.
        </p>
      </div>

      <div className="cv-section">
        <h2 className="cv-title">Skills</h2>
        <h3>Soft Skills:</h3>
        <ul className="skills">
          <li>Project Planning</li>
          <li>Cost Management</li>
          <li>Scheduling</li>
          <li>Resource Planning</li>
          <li>Project Delivery</li>
          <li>Result Oriented</li>
          <li>Teamwork</li>
          <li>Risk Management</li>
          <li>Change Management</li>
          <li>Agile Project Management</li>
        </ul>
        <h3>IT Skills:</h3>
        <ul className="skills">
          <li>Primavera</li>
          <li>MS Project</li>
          <li>Power BI</li>
          <li>Microsoft 365</li>
          <li>SAP / ERP / CRM</li>
          <li>Microsoft Dynamics</li>
          <li>Microsoft Office</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>React JS</li>
          <li>Express JS</li>
          <li>API / REST API</li>
          <li>Git</li>
          <li>SQL / MSSQL / PostgreSQL</li>
          <li>Cloud Services / AWS </li>
        </ul>
      </div>

      <div className="cv-section">
        <h2 className="cv-title">
          Work Experience
          <img
            className="content-png"
            src="/pictures/general/work-exp.png"
            alt="work-exp"
          />
        </h2>

        <div className="cv-section">
          <h3>
            Project Planner at MW Group Norge AS, Oslo / Norway
            <span className="dates">
              Dec 2021 – Present
              <img
                className="content-png"
                src="/pictures/general/cal.png"
                alt="work-exp"
              />
            </span>
          </h3>
          <ul>
            <li>
              Provided input for tenders by analyzing project risks, financial
              impacts, and tender specifications.
            </li>
            <li>
              Developed baseline schedules, monitored progress, and updated
              stakeholders to ensure on-time delivery.
            </li>
            <li>
              Performed resource forecasting and risk-based assessments for
              major scope changes, revising plans and improving process
              efficiency through data analysis.
            </li>
            <li>
              Collaborated with teams to coordinate inputs, monitor progress,
              and update stakeholders, ensuring alignment with key performance
              indicators (KPIs).
            </li>
            <li>
              Forecasted resource needs, performed risk-based assessments, and
              revised schedules for major scope changes.
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h3>
            Integration Support Engineer at Interactor (Remote, USA)
            <span className="dates">
              Jan 2021 – Oct 2021
              <img
                className="content-png"
                src="/pictures/general/cal.png"
                alt="work-exp"
              />
            </span>
          </h3>
          <ul>
            <li>
              Created and deployed use cases using API AutoFlow platform for
              multiple customers.
            </li>
            <li>
              Tested and developed RESTful APIs for no-code/low-code
              development.
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h3>
            Customer Consultant at Parseh Group
            <span className="dates">
              June 2018 – Feb 2019
              <img
                className="content-png"
                src="/pictures/general/cal.png"
                alt="work-exp"
              />
            </span>
          </h3>
          <ul>
            <li>
              Implemented ERP systems for various customers, ensuring alignment
              with business requirements.
            </li>
            <li>
              Managed multiple projects simultaneously, coordinating with
              developers and customers.
            </li>
            <li>
              Organized customer databases, generated tailored reports, and
              provided actionable insights for clients.
            </li>
            <li>
              Customized applications within the Parseh Business Technology
              Platform to meet specific customer and business needs.
            </li>
            <li>
              Identified and resolved technical challenges to ensure that
              solutions met requirements.
            </li>
            <li>
              Participated in workshops and collaborated closely with customers
              and teams to define requirements and project goals.
            </li>
            <li>
              Maintained documentation and contributed to establishing best
              practices in development and integration.
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h3>
            Coordinator at Sepehr Service
            <span className="dates">
              Feb 2016 – June 2018
              <img
                className="content-png"
                src="/pictures/general/cal.png"
                alt="work-exp"
              />
            </span>
          </h3>
          <ul>
            <li>
              Coordinated team activities for Telecom Systems, ensuring
              alignment with schedules and project goals.
            </li>
            <li>
              Managed communication between technicians and stakeholders,
              ensuring alignment with project timelines.
            </li>
            <li>
              Planned technical site surveys, analyzing risks and forecasting
              resource requirements for smooth execution.
            </li>
          </ul>
        </div>
      </div>
      <div className="cv-section">
        <h2 className="cv-title">
          Education
          <img
            className="content-png"
            src="/pictures/general/edu.png"
            alt="work-exp"
          />
        </h2>
        <h3>
          Master’s of Project Management at NTNU Trondheim / Norway
          <span className="dates">
            Aug 2020 – Dec 2022
            <img
              className="content-png"
              src="/pictures/general/cal.png"
              alt="work-exp"
            />
          </span>
        </h3>

        <ul>
          <li>
            worked on digital twins and their application in facility management
            as part of my master’s thesis. This work resulted in a publication
            presented at the{" "}
            <a href="https://doi.org/10.1088/1755-1315/1176/1/012001">
              NTNU Conference in May 2023.
            </a>
          </li>
        </ul>

        <h3>
          Master’s of Industrial Engineering at Tafresh University
          <span className="dates">
            Aug 2011 – June 2013
            <img
              className="content-png"
              src="/pictures/general/cal.png"
              alt="work-exp"
            />
          </span>
        </h3>
        <h3>
          Bachelor of Industrial Engineering at Azad University
          <span className="dates">
            Aug 2007 – June 2011
            <img
              className="content-png"
              src="/pictures/general/cal.png"
              alt="work-exp"
            />
          </span>
        </h3>
      </div>

      <div className="cv-section">
        <div className="cv-section">
          <h2 className="cv-title">Certificates</h2>
          <ul>
            <li>Agile Project Management</li>
            <li>Safety Representative</li>
            <li>Distributing System and Cloud Computing with Java</li>
            <li>Developing SQL Database</li>
          </ul>
        </div>
        <div className="cv-section">
          <h2 className="cv-title">Languages</h2>
          <ul>
            <li>English (Fluent)</li>
            <li>Norwegian (B2)</li>
            <li>Persian (Native)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
