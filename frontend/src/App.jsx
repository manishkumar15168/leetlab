import React, { useEffect } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'  
import SignUpPage from './page/SignUpPage'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import {Layout, Loader2} from 'lucide-react'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

   
 useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className=" size-10 animate-spin" />  
      </div>
    )
  }


  return (
    <div className='flex flex-col items-center justify-start'>
       <Toaster/>
        <Routes>
          <Route path='/' element={<Layout/>}></Route>
          <Route
          index
            element={ authUser ? <HomePage /> : <Navigate to='/login'/>}
          />
           <Route
            path='/login'
            element={!authUser ? <LoginPage/>: <Navigate to={"/"}/>}
           />
          <Route
          path='/signup'
          element={!authUser ? <SignUpPage/>: <Navigate to={"/"}/>}
          />

          <Route
          path="/problem/:id"
          element={authUser ? < ProblemPage/>:<Navigate to="/login"/>}
          />





          <Route element={<AdminRoute/>}>
            <Route path="/add-problem"
            element={authUser ? <AddProblem/>:<Navigate to="/"/>}
            />
          </Route>
        </Routes>
       </div>   
  )
}

export default App