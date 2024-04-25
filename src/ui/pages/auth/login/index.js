import './login.css'
import React, { useEffect, useState } from "react"
import { LoginService } from '../../../../services/auth';
import { JWT, PAGE_NAME,  } from '../../../../constanst';
import { useTranslation } from "react-i18next";
import DropdownLanguage from '../../../components/dropDownLanguage';
import { ToastContainer, toast } from 'react-toastify';
import { notifyAfterCallApi } from '../../../../utils/utils';
import useAppNavigate from '../../../../hooks/useAppNavigate';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../../../store/authentication/authenticationSlice'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [appNavigate]  = useAppNavigate();

    const dispatch = useDispatch()
    const count = useSelector((state) => state.counter.value)


    useEffect(() => {
      setLoading(false);
    }, []);

    const handleChangeEmail = event => {
        setEmail(event.target.value);   
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    const handleLogin = async event => {
      try {
        setLoading(true);
        event.preventDefault();

        const response = await LoginService(email, password);
        notifyAfterCallApi(response, "Đăng nhập thành công", 
          "Đăng nhập thất bại");
        if (response.status == 200){
          localStorage.setItem(JWT.ACCESS_TOKEN, response.data.data[JWT.ACCESS_TOKEN]);
          localStorage.setItem(JWT.REFRESH_TOKEN, response.data.data[JWT.REFRESH_TOKEN]);

          setTimeout(() => {
            appNavigate(PAGE_NAME.home);
          }, 2000);
        }
      } catch (error) {
        console.log(error);   
      } finally {
        setLoading(false);
      }      
    }

    return (
       <>
        

        <div class="d-flex align-items-center py-4 bg-body-tertiary" style={{width: '100vw',height: '100vh'}}>
       
        <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
          <symbol id="check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </symbol>
          <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
          </symbol>
          <symbol id="moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
          </symbol>
          <symbol id="sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
          </symbol>
        </svg>
        
        {/* Change dark/light mode buttom */}
        {/* <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
          <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
                  id="bd-theme"
                  type="button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-label="Toggle theme (auto)">
            <svg class="bi my-1 theme-icon-active" width="1em" height="1em"><use href="#circle-half"></use></svg>
            <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
            <li>
              <button  onClick={() => setTheme(THEME.LIGHT)} type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                <i class="bi bi-lightbulb me-2 opacity-50 theme-icon" width="1em" height="1em"></i>
      
                Light

              </button>
            </li>
            <li>
              <button  onClick={() => setTheme(THEME.DARK)} type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#moon-stars-fill"></use></svg>
                Dark
                <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em"><use href="#circle-half"></use></svg>
                Auto
                <svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg>
              </button>
            </li>
          </ul>
        </div> */}
    
        
    <main class="form-signin w-100 m-auto">
      <form >
      {/* <div>
      <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </Button>
     </div>
        <DropdownLanguage></DropdownLanguage>
         <p>{t("login")}</p> */}
        <img class="mb-4" src="/assets/image/twg_logo.png" alt="" width="72" height="57"/>
        <h1 class="h3 mb-3 fw-normal">Trang đăng nhập</h1>
    
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChangeEmail}/>
          <label for="floatingInput">Email</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={handleChangePassword}/>
          <label for="floatingPassword">Mật khẩu</label>
        </div>
    
        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
          <label class="form-check-label" for="flexCheckDefault">
            Nhớ mật khẩu
          </label>
        </div>
        {
          (loading)  ?
          <button class="btn btn-primary w-100 py-2" type="button" disabled="">
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span role="status">Loading...</span>
          </button>
        :
        <button class="btn btn-primary w-100 py-2" onClick={handleLogin}>Đăng nhập</button> 
        }
        
        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        
      </form>
    </main>
 
    
        </div>
       </>
    );
}

export default LoginPage