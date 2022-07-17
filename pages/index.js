import ImageBox from "../components/ImageBox"
import Image from "next/image"
import logo from "../public/experiments.svg"
import logoEnd from "../public/experiments-end.svg"

function Main(props) {
  let works = props.works;

  return (
    <div className="container">
      <div className="header-box">
        <div className="title">yexperiments</div>
        <Image src={logo} />
        <div className="links">
          <a href="mailto: yyihui.hu@gmail.com" target="_blank" rel="noreferrer">
            Email
          </a>
          <div>/</div>
          <a href="https://twitter.com/_yihui" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <div>/</div>
          <a href="https://yhhu.design" target="_blank" rel="noreferrer">
            Main Site
          </a>
        </div>
      </div>
      {/* <div className="logo-box">
        <Image src={logo} />
      </div> */}
      {works.map((work, i) => {
        return (
          <ImageBox key={i} work={work} delay={i}/>
        );
      })}
      <div className="footer-box">
        <div className="title">end of yexperience</div>
        <Image src={logoEnd} />
        <div className="links">
          <div>2022 ©</div>
          <div>/</div>
          <div>Hu Yihui</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  const table = base("Works");
  let works = await table.select().all(); // get all entries from table

  // convert entries into an array of useful data
  works = await Promise.all(
    works.map(async ({ fields }) => {
      return {
        name: fields.Name,
        image: fields.Attachments[0].thumbnails.large.url,
        width: fields.Attachments[0].thumbnails.large.width,
        height: fields.Attachments[0].thumbnails.large.height,
      };
    })
  );

  // return array of data as props to home function
  return { props: { works } };
}

export default Main;
