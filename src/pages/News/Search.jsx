import React from 'react';
import styled from 'styled-components';

const Search = () => {
  return (
    <StyledWrapper>
      <div className="form">
        <input className="input" placeholder="Search..." required type="text" />
        <span className="input-border" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
   --width-of-input: 300px;
   --border-height: 1px;
   --border-before-color: rgba(221, 221, 221, 0.39);
   --border-after-color: #5891ff;
   --input-hovered-color: #4985e01f;
   position: relative;
   width: var(--width-of-input);
  }
  /* styling of Input */
  .input {
   color: #000000;
   font-size: 1.5rem;
   background-color: transparent;
   width: 100%;
   box-sizing: border-box;
   padding-inline: 0.5em;
   padding-block: 0.7em;
   border: none;
   border-bottom: var(--border-height) solid var(--border-before-color);
  }
  /* styling of animated border */
  .input-border {
   position: absolute;
   background: var(--border-after-color);
   width: 0%;
   height: 3px;
   bottom: 0;
   left: 0;
   transition: 0.3s;
  }
  /* Hover on Input */
  input:hover {
   background: var(--input-hovered-color);
  }

  input:focus {
   outline: none;
  }
  /* here is code of animated border */
  input:focus ~ .input-border {
   width: 100%;
  }
  /* === if you want to do animated border on typing === */
  /* remove input:focus code and uncomment below code */
  /* input:valid ~ .input-border{
    width: 100%;
  } */`;

export default Search;
