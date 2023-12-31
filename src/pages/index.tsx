import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/navbar";
import styled from "styled-components";
import MailData from "@/components/maildata";
import { mailDataType } from "@/types";
import { Drawer } from "@mui/material";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const { query } = router.query;
  const [mailData, setMailData] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [searchData, setSearchData] = useState<any>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const values = useRef({
    subject: "",
    body: "",
  });

  const handleOnClick = (data: mailDataType) => {
    setOpenDrawer(true);
    values.current.subject = data.subject;
    values.current.body = data.body;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/15a3a1c3-1cda-4409-b1b1-2f39f5f25123"
        );
        const jsonData = await response.json();
        setMailData(jsonData);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const newSearchData: any = [];
    mailData
      .filter((data: mailDataType) =>
        query ? data.tag.toLowerCase() === query : data
      )
      .map((data: mailDataType) => {
        const joinData = data.subject.toLowerCase();
        if (joinData.includes(search.toLowerCase())) {
          newSearchData.push(data);
          setSearchData(newSearchData);
        }
      });
  }, [search]);

  return (
    <>
      {openDrawer && (
        <Drawer
          anchor="bottom"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <DrawerContainer>
            <p>{`Subject: ${values.current.subject}`}</p>
            <p className="body">{`Body: ${values.current.body}`}</p>
          </DrawerContainer>
        </Drawer>
      )}
      <NavBar setSearch={setSearch} search={search} />
      <Parent>
        {search.length &&
          searchData.map((data: mailDataType) => (
            <MailData
              userId={data.userId}
              id={data.id}
              tag={data.tag}
              subject={data.subject}
              body={data.body}
              key={data.id}
              onClick={() => handleOnClick(data)}
            />
          ))}
        {!search.length &&
          mailData
            .filter((data: mailDataType) =>
              query ? data.tag.toLowerCase() === query : data
            )
            .map((data: mailDataType) => (
              <MailData
                userId={data.userId}
                id={data.id}
                tag={data.tag}
                subject={data.subject}
                body={data.body}
                key={data.id}
                onClick={() => handleOnClick(data)}
              />
            ))}
      </Parent>
    </>
  );
};

export default Home;

const Parent = styled.div``;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  font-weight: bold;

  .body {
    font-size: 15px;
    font-weight: 300;
  }
`;
