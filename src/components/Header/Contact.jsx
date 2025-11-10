/*
Copyright for this button
Copyright - 2025 cssbuttons-io (cssbuttons.io) 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import styled, {css} from "styled-components";
import buildMailto from "../../utils/buildMailto";

// Give different colors base on the class_name_location from StyledWrapper <-- Contact <-- Header
const give_different_color = (class_name_location) => {
  if (class_name_location === 'project_column'){
    return css`
    background-image: linear-gradient(36deg, #B786FF, #6F58F9 50%, #364DFA);
    box-shadow: #a494ffde 0 15px 30px -5px;
    `
  }
  else if (class_name_location === 'news'){
    return css`
    background-image: linear-gradient(36deg, #B786FF, #6F58F9 50%, #364DFA);
    box-shadow: #a494ffde 0 15px 30px -5px;
    `
  }
  else if (class_name_location === 'projects'){
    return css`
    background-image: linear-gradient(36deg, #FFC23A, #FF6D4C);
    box-shadow: #e7b71787 0 15px 30px -5px;
    `
  }
  else if (class_name_location === 'leader'){
    return css`
    background-image: linear-gradient(36deg, #FFC23A, #FF6D4C);
    box-shadow: #e7b71787 0 15px 30px -5px;
    `
  }
  else if (class_name_location === 'members'){
    return css`
    background-image: linear-gradient(36deg, #B786FF, #6F58F9 50%, #364DFA);
    box-shadow: #a494ffde 0 15px 30px -5px;
    `
  }
  else{
    return css`
    background-image: linear-gradient(36deg, #FFC23A, #FF6D4C);
    box-shadow: #e7b71787 0 15px 30px -5px;
    `
  }
}


const StyledWrapper = styled.div`
  text-decoration: none; /* 確保 a 不會出現底線 */
  button {
    align-items: center;
    // Call give_different_color
    ${props => give_different_color(props.class_name_location) };
    
    border: 0;
    border-radius: 8px;
    
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    font-size: 1.3em;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;
    margin-right:1.6rem;
  }

  button:active,
  button:hover {
    outline: 0;
  }

  button span {
    background-color: rgb(5, 6, 45);
    padding: 16px 24px;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
  }

  button:hover span {
    background: none;
  }

  button:active {
    transform: scale(0.9);
  }
`;

// Todo: Alter the Contact component
const Contact = ({class_name_location}) => {
  // TODO: Change border color depending on class_name_location
  console.log("Contact.jsx: ", class_name_location)
  const email="Amy@example.edu"
  const subject="Inquiry About Lab Information and Scheduling a Meeting / Request for a Meeting with Professor / (Other request...)"
  const body="Hi there \nPlease briefly describe your request below. \nIf you are asking to schedule an appointment, please provide at least three time slots when you are available (include date, start time, and time zone). \nPlease sign your full name — anonymous messages will not be answered. \nOptional contact info (if different from this email): [phone / alternative email] \nThanks, \n[Your full name]"
  const cc="shaomanlee@gs.ncku.edu.tw"

  const href = buildMailto(email, { subject, body, cc });

  return (
    <StyledWrapper as="a" href={href} aria-label="Contact via email" title="Contact via email" class_name_location={class_name_location}>
      <button type="button" onClick={(e)=>{ /* 防止 double-submit 或額外效果 */ }}>
        <span className="inter-bold">Contact</span>
      </button>
    </StyledWrapper>
  );
}



export default Contact;
