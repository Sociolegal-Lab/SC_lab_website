import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage.jsx'
import News from './pages/News/News.jsx'
import Projects from './pages/Projects/Projects.jsx'
import Leader from './pages/Leader/Leader.jsx'
import Members from './pages/Members/Members.jsx'
import ProjectColumn from './pages/ProjectColumn/ProjectColumn.jsx'
import Layout from './Layout.jsx'

/* Import dynamic page: ProjectColumn_XXXX */


function App() {
  const basename = "/"
  return (<>    
  <BrowserRouter basename={basename}>
   <Routes>
        {/* element={<Layout/>} 告訴 react-router-dom（導航總管，透過 browser History API 監聽使用者在瀏覽器的行為，避免重新發送請求），當任何子層路由被匹配時，先渲染 <Layout/> 這個元素。這是React Router的預設行為模式 */}
        {/* react-router-dom 將在 <Layout/> 內部尋找 <Outlet/>，並將匹配到的子路由元件（例如 <Homepage/>、<News/>）渲染到  <Layout/> 內部 <Outlet/> 的位置。 */}
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/leader" element={<Leader/>}/>
          <Route path="/members" element={<Members/>}/>
          {/* Dynamic path, id is parameter. The id store in the return of useParams()*/}
          <Route path="/project-column/:slug" element={<ProjectColumn/>}/>
          {/* react-router 由上而下依序配對，當 */}
          <Route path="*" element={<Homepage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  
  </>
    
   
      
    
  )
}

export default App;

