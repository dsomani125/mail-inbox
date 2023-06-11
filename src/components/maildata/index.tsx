import { mailDataType } from "@/types";
import styled from "styled-components";

const MailData = ({ userId, subject, body, onClick }: mailDataType) => {
  return (
    <Parent>
      <p>{userId}</p>
      <div className="subject-body" onClick={onClick}>
        <p>{`${subject} -`}</p>
        <p className="body">{body}</p>
      </div>
    </Parent>
  );
};

export default MailData;

const Parent = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  white-space: nowrap;
  padding: 10px 20px 0px 70px;\
  cursor: pointer;

  .subject-body {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: bold;
  }

  .body {
    font-size: 15px;
    font-weight: 300;
  }
`;
