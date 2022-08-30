import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  //===========1. Get email, password value from INPUT=============
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //===========2. Send info to Firebase/Authentication===========
  const onSubmit = async (e) => {
    e.preventDefault();
    //register user to auth
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      //set user name
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      //save user info to firestore database
      const formDataCopy = { ...formData };
      delete formDataCopy.password; //delete pass from user obj.
      formDataCopy.timestamp = serverTimestamp(); //add timestamps

      // create new "users" collection with user-data-object
      await setDoc(doc(db, 'users', uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration!');
      console.log(error.message);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            className='emailInput'
            placeholder='email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />
            {/* Show Password "EYE" icon */}
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to='forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google OAuth */}

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
      <h1>SignIn</h1>
    </>
  );
}

export default SignUp;
