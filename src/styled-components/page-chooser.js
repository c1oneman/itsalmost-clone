import styled from "styled-components";

export const Pager = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;

  color: white;
  user-select: none;
  font-weight: 700;
  .next {
    border-radius: 0px 25px 25px 0px;
    background-color: #3458fc;
    padding: 5px 10px;
  }
  .next:hover {
    background-color: #6782ff;
  }
  .center {
    background-color: #3458fc;
    padding: 5px 10px;
    border-right: 1px solid #acacac;
    border-left: 1px solid #acacac;
  }
  .back {
    border-radius: 25px 0 0 25px;
    background-color: #3458fc;
    padding: 5px 10px;
  }
  .back:hover {
    background-color: #6782ff;
  }
  .button {
    cursor: pointer;
  }
`;
