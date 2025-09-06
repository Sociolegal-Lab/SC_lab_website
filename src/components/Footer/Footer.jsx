import style from "./Footer.module.css"

function Footer(){
    return (
    <footer>
        <section style={{display:'flex'}}>
            {/* Left side */}

            {/* Width of this block depends on the width of long logo */}
            <div style={{paddingRight:'2rem'}}>
                <img>{/* long logo */}</img>
                <p className="inter-medium">Our interdisciplinary research leverages natural language processing to critically assess the impacts of AI on legal and societal frameworks.</p>
            </div>

            {/* Right side */}
            <div style={{flex: 'auto'}} className="inter-bold">
                <div className={`${style.heading}`}>QUICK LINKS</div>
                <hr/>
                <ul >
                    <li>Home</li>
                    <li>Projects</li>
                    <li>Members</li>
                    <li>Leader</li>
                    <li>News</li>
                </ul>
            </div>
        </section>

        <section className="inter-bold">
            <div className={`${style.heading}`}>CONTACT US</div>
            <hr/>


            {/* 2*2要怎麼設定flex? 最簡潔的寫法？ */}
            <ul>
                <li>

                </li>
                <li>

                </li>
                <li>

                </li>
                <li>

                </li>
            </ul>

        </section>


        <section>
            <div></div>
            <div></div>
        </section>


    </footer>
    )
}

export default Footer
