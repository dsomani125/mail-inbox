import { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, TextField } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { useRouter } from "next/router";

type tagType = {
  index: number;
  img: JSX.Element;
  name: string;
  queryName: string;
};

type NavBarProps = {
  setSearch: (value: string) => void;
  search: string;
};

const NavBar = ({
  setSearch,
  search,
}: NavBarProps) => {
  const router = useRouter();
  const { query } = router.query;
  const [openSideBar, setOpenSideBar] = useState(false);
  const tagsData = [
    {
      index: 1,
      name: "Inbox",
      img: <InboxIcon />,
      queryName: "inbox",
    },
    {
      index: 2,
      name: "Draft",
      img: <DraftsIcon />,
      queryName: "draft",
    },
    {
      index: 3,
      name: "Spam",
      img: <ReportGmailerrorredIcon />,
      queryName: "spam",
    },
    {
      index: 4,
      name: "Trash",
      img: <DeleteIcon />,
      queryName: "trash",
    },
  ];

  const updateTagFilter = (name: string, queryName: string) => {
    router.push(`/?query=${queryName}`);
  };

  return (
    <div>
      <LogoContainer>
        <MenuIcon
          onClick={() => setOpenSideBar(!openSideBar)}
          fontSize="medium"
        />
        <img src="./icon/gmail.png" alt="gmail logo" width={100} />
        <h3 className="gmail">Gmail</h3>
        <SearchContainer>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </LogoContainer>

      <Drawer
        anchor="left"
        open={openSideBar}
        onClose={() => setOpenSideBar(!openSideBar)}
      >
        <DrawerContainer>
          {tagsData.map(({ index, img, name, queryName }: tagType) => (
            <TagContainer
              key={index}
              name={name}
              tagFilter={typeof query === 'string' ? query : "inbox"}
              onClick={() => updateTagFilter(name, queryName)}
            >
              {img}
              {name}
            </TagContainer>
          ))}
        </DrawerContainer>
      </Drawer>
    </div>
  );
};

export default NavBar;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  .gmail {
    margin-left: -20px;
  }
`;

const SearchContainer = styled.div`
  margin-left: 200px;
`;

const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 60px 50px 20px 30px;
`;

const TagContainer = styled.div<{
  tagFilter: string;
  name: string;
}>`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 10px 100px 10px 10px;
  border-radius: 8px;
  ${(props: any) =>
    props.name.toLowerCase() === props.tagFilter ? `background : #80bfff` : ""}
`;
