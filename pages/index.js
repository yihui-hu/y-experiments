import ImageBox from "../components/ImageBox"
import Image from "next/image"
import yexperiments from "../public/yexperiments.svg"
import yexperience from "../public/yexperience.svg"
import logo from "../public/experiments.svg"
import logoEnd from "../public/experiments-end.svg"

import Head from 'next/head'

function Main(props) {
  let works = props.works;

  return (
    <>
    <Head>
      <title>y-experiments</title>
    </Head>
    <div className="container">
      <div className="header-box">
        <Image src={yexperiments} />
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
      {works.map((work, i) => {
        return (
          <ImageBox key={i} work={work} delay={i}/>
        );
      })}
      <div className="footer-box">
        <Image src={yexperience} />
        <Image src={logoEnd} />
        <div className="links">
          <div>2022 ©</div>
          <div>/</div>
          <div>Hu Yihui</div>
        </div>
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps() {
  const Airtable = require("airtable");
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  const table = base("Works");
  let works = await table.select(
    { sort: [{ field: "ID", direction: "asc" }] }
  ).all(); // get all entries from table

  // convert entries into an array of useful data
  works = await Promise.all(
    works.map(async ({ fields }) => {
      return {
        name: fields.Name,
        image: fields.Attachments[0].thumbnails.full.url,
        width: fields.Attachments[0].thumbnails.large.width,
        height: fields.Attachments[0].thumbnails.large.height,
      };
    })
  );

  // return array of data as props to home function
  return { props: { works } };
}

export default Main;
