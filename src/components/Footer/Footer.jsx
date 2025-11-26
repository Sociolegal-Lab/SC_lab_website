import {Link} from "react-router-dom"
import style from "./Footer.module.css"
import scl_logo_full_white from "../../assets/logo/4_scl_logo_full_white.png"
import openNewTab from "../../utils/openNewTab";
import useClipboard from "../../hooks/useClipboard"


function Footer(){
    const {copy, status} = useClipboard();

    return (
    <footer className={style.footer}>
        <section className={style.parent}>
            {/* Left side */}

            {/* Width of this block depends on the width of long logo */}
            <div className={style.sec1_L}>
                <img src={scl_logo_full_white} alt="scl_logo" className={style.logo}/>
                <p className={`inter-medium ${style.slogan} ${style.p}`}>Our interdisciplinary research leverages natural language processing to critically assess the impacts of AI on legal and societal frameworks.</p>
            </div>
 
            {/* Right side */}
            <div style={{flex: 'auto'}} className={`${style.sec1_R} inter-bold`}>
                <div className={`${style.heading}`}>QUICK LINKS</div>
                <hr className={style.hr}/>
                <ul >
                    <li className={style.li}><Link to="/">Home</Link></li>
                    <li className={style.li}><Link to="/projects">Projects</Link></li>
                    <li className={style.li}><Link to="/members">Members</Link></li>
                    <li className={style.li}><Link to="/news">News</Link></li>
                </ul>
            </div>
        </section>

        <section className={`${style.section2}`}>
            <div className={`${style.heading} inter-bold`}>CONTACT US</div>
            <hr className={style.hr}/>

            <div className={style.info_mother}>
                {/* add right margin and let the two elements space-between (when > 500px, two column)*/}
                {/* take out margin and let the two elements space-between (when < 500px, one column) */}
                <div  className={`${style.info} ${style.first_and_third}`}>
                    <div ><span className={`inter-bold`}>Email</span><br/><span className={`inter-medium`}>shaomanlee@gs.ncku.edu.tw</span></div>
                    <button type="button" onClick={()=>{copy("shaomanlee@gs.ncku.edu.tw")}}>
                        <svg className={`${style.icon} icon bi bi-envelope-fill`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>         
                    </button>

                </div>
                
                {/* two element space-beteen */}
                <div  className={`${style.info} ${style.second_and_fourth}`}>
                    <div ><span className={`inter-bold`}>Phone</span><br/>
                    <span className={`inter-medium`}>+886 2757575 &nbsp;&nbsp; #80980</span></div>

                    <button type="button" onClick={()=>{copy("+886 2757575,80980")}}>
                        <svg className={`${style.icon} icon bi bi-telephone-fill`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                        </svg> 
                    </button>
                </div>

                {/* add right margin and let the two elements space-between (when > 500px, two column)*/}
                {/* take out margin and let the two elements space-between (when < 500px, one column) */}
                <div  className={`${style.info} ${style.first_and_third}`}>
                    <div><span className={`inter-bold`}>GitHub</span><br/>
                    <span className={`inter-medium`}>https://github.com/Sociolegal-Lab</span></div>

                    <button type="button" onClick={()=>window.open("https://github.com/Sociolegal-Lab", '_blank', 'noopener,noreferrer')}>
                        <svg className={`${style.icon} icon bi bi-github`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>                        
                    </button>

                </div>

                {/* two element space-beteen */}
                <div  className={`${style.info} ${style.second_and_fourth}`}>
                    
                    <div><span className={`inter-bold`}>Address</span><br/><span className={`inter-medium`}>Miin Wu School of Computing</span><br/>
                    <span className={`inter-medium`}>No.1, University Road, Tainan City 701, Taiwan</span></div>    
                    
                    <button type="button" onClick={()=>window.open("https://maps.app.goo.gl/5aCHHit2uuUqx8tn7", '_blank', 'noopener,noreferrer')}>
                        <svg className={`${style.icon} icon bi bi-geo-alt-fill`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                        </svg>
                    </button>
                        
                </div>
                
            </div>


        </section>


        <section className={`inter-medium ${style.fine}`} >
            <div style= {{marginRight: "1rem"}}>© 2025 Sociolegal Computing Lab</div>
            {/* TODO: Add link to design credit */}
            <div>
                 Designed 🎨 & Built 🏗️ by {'\u0020'}
                <a className={style.credit} href="https://github.com/pluviophilezack" target="_blank" rel="noopener noreferrer">PluviophileZack</a> 
                {'\u0020'}and{'\u0020'}
                <a className={style.credit} href="https://github.com/thomaschen9329" target="_blank" rel="noopener noreferrer">ThomasChen</a>

            </div>
        </section>


    </footer>
    )
}

export default Footer
