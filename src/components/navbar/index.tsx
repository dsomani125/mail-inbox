import { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, TextField } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

type tagType = {
  index: number;
  img: JSX.Element;
  name: string;
};

type NavBarProps = {
  tagFilter: string;
  setTagFilter: (value: string) => void;
  setSearch: (value: string) => void;
  search: string;
};

const NavBar = ({
  setTagFilter,
  tagFilter,
  setSearch,
  search,
}: NavBarProps) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const tagsData = [
    {
      index: 0,
      name: "All",
      img: <AllInclusiveIcon />,
    },
    {
      index: 1,
      name: "Inbox",
      img: <InboxIcon />,
    },
    {
      index: 2,
      name: "Draft",
      img: <DraftsIcon />,
    },
    {
      index: 3,
      name: "Spam",
      img: <ReportGmailerrorredIcon />,
    },
    {
      index: 4,
      name: "Trash",
      img: <DeleteIcon />,
    },
  ];

  const updateTagFilter = (name: string) => {
    setTagFilter(name.toUpperCase());
    sessionStorage.setItem("tag", name.toUpperCase());
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
          {tagsData.map(({ index, img, name }: tagType) => (
            <TagContainer
              key={index}
              name={name}
              tagFilter={tagFilter}
              onClick={() => updateTagFilter(name)}
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
    props.name.toUpperCase() === props.tagFilter ? `background : #80bfff` : ""}
`;
