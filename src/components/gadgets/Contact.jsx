// Contact.jsx
import styled from "styled-components";

// Todo: Alter the Contact component
const Contact = ({ email = "someone@example.com", subject = "", body = "", cc = "", bcc = "" }) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  if (cc) params.set("cc", cc);
  if (bcc) params.set("bcc", bcc);

  // 把 + 改成 %20，確保空格顯示正確
  const queryString = params.toString().replace(/\+/g, "%20");
  const href = `mailto:${email}?${queryString}`;

  return (
    <StyledWrapper as="a" href={href} aria-label="Contact via email" title="Contact">
      <button type="button" onClick={(e)=>{ /* 防止 double-submit 或額外效果 */ }}>
        <span className="inter-bold">Contact</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  text-decoration: none; /* 確保 a 不會出現底線 */
  button {
    align-items: center;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
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

export default Contact;
