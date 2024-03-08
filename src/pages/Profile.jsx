import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect} from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from  '../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice.js";

export default function Profile() {

  const fileRef = useRef(null);
  const { currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form 
        onChange={handleSubmit}
        className='flex flex-col gap4'
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="text" 
          ref={fileRef}
          hidden
          accept='image/*'
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} 
          alt="profile" 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center'>
          {fileUploadError ?
            (<span className='text-red-700'>
              Error Image upload(Image must be less than 2 mb)
            </span>) : filePerc > 0 && filePerc < 100 ?
            (<span className='text-slate-700'>
              {`Uploading ${filePerc}`}
            </span>) : (filePerc === 100 ? (
              <span className='text-green-700'>
                Image Successfully Uploaded!
              </span>) : ('')
            )}
        </p>

        <input 
          type="text" 
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input 
          type="email" 
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input 
          type="password" 
          defaultValue={currentUser.password}
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
          Delete Account
        </span>

        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  )
}
