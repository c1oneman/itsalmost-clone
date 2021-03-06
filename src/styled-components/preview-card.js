import styled from "styled-components";

export const Card = styled.div`
  width: 45%;
  max-width: 450px;
  display: flex;
  padding: 8px;
  margin: 12px;
  /* background-color: #f0f0f0; */

  border: 2px solid #8f8f8f;
  border-radius: 5px;
  color: black;
  .timebox {
    margin: 0;
    margin-left: 5px;
    p {
      font-size: 1em;
    }
  }
  h1 {
    font-size: 2rem;
    font-weight: 400;
  }
  h2 {
    font-size: 1rem;
  }
  p {
    margin: 0;
  }
  .left {
    width: 70%;
  }
  .right {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  .shadow-4 {
  }
  .bubble {
    background-color: #8a8a8a;
    border-radius: 25px;
    padding: 3px 15px;
    color: white;
    user-select: none;
  }
  .bubble:hover {
    background-color: #2d2d2d;
  }

  @media (max-width: 680px) {
    width: 100%;
    min-width: 0;
  }
`;
