import ImageBox from "../components/ImageBox"

function Main(props) {
  let works = props.works;

  return (
    <div className="container">
      <div className="header-box">
        <div className="title">Experiments, Everywhere, All At Once</div>
        <div className="desc">
          Miscellaneous design / type / anything-goes work.
        </div>
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
      {works.map((work, i) => {
        return (
          <ImageBox key={i} work={work} delay={i}/>
        );
      })}
      <div className="footer-box">
        <div className="title">End of Everything, All At Once</div>
        <div className="desc">
          More works coming soon.
        </div>
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
