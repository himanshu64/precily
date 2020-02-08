import React,{useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser,faEnvelope, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import firebase from '../config/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = (props) => {
    const [formState, setformState] = useState();
    

    const history = useHistory();
    useEffect(() => {
        if(props.authenticated){
            history.push('/profile');
        }else{
            history.push('/');
        }
        
    }, [props.authenticated,history,formState]);
    const setFormState = () => {
        if(formState){
            setformState(false);
        }else{
            setformState(true);
        }
        
    };
    const renderForm = () => formState ? <DisplayForm  onClick={setFormState} /> : <EditForm onClick={setFormState} authenticated={props.authenticated}/>;
    return (
        <div className="bg-grey-lighter h-screen font-sans">
           <ToastContainer position={toast.POSITION.BOTTOM_CENTER}/>
            <div className=" flex justify-center items-center">
        {
           renderForm() 
            
        }
        

</div>
 
        </div>
    );
}
export const  DisplayForm = (props) =>{

  const [User, setUser] = useState({})
    useEffect(() => {
      
      const   user = firebase.auth().currentUser;
      setUser(user);
     
    }, [])
    return (
        <div className="bg-white w-4/5 sm:w-1/3  rounded overflow-hidden shadow-lg mt-12">

            <div className="flex justify-end">
            <button className="bg-red-700 text-sm hover:bg-red-900 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>Edit</button>
            </div>
  <div className="text-center p-6  border-b">
    <img className="h-24 w-24 rounded-full mx-auto" src={User.photoURL} alt="" />
   
    
  </div>
  <div className="border-b">
    
    <div className="px-6 py-3 hover:bg-gray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg align-middle content-center ">
      <FontAwesomeIcon icon={faUser} size="1x" />
      </div>
      <div className="pl-3 flex items-center">
        <p className="text-sm font-semibold text-gray-700 tracking-widest">
          {User.displayName}
        </p>
        
      </div>
    </div>
    <div className="px-6 py-3 hover:bg-gray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg content-center ">
      <FontAwesomeIcon icon={faEnvelope} size="1x"/>
      </div>
      <div className="pl-3 flex items-center">
        <p className="text-sm font-semibold text-gray-700 tracking-widest">
          {User.email}
        </p>
        
      </div>
    </div>

    <div className="px-6 py-3 hover:bg-gray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg ">
          <FontAwesomeIcon icon={faMobileAlt} size="1x"/>
      </div>
      <div className="pl-3 flex items-center">
        <p className="text-sm font-semibold text-gray-700 tracking-widest">
         {User.phoneNumber}
        </p>
        
      </div>
    </div>
    
  </div>
  
  
 
</div>
    );
}
export const EditForm = (props) => {
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState()
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const storage = firebase.storage();
    
    const [User, setUser] = useState({})
    
    useEffect(() => {
      
      const   user = firebase.auth().currentUser;
      setUser(user);
      setName(User.displayName);
      setEmail(User.email);
      setImageAsUrl({imgUrl:User.photoURL});
      
      
     
      
    }, [User])
   
    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image))
    }
    const handleFireBaseUpload = () => {
        
      
        setPhoneno(phoneno);
        if(imageAsFile === undefined ) {
          const user = firebase.auth().currentUser;
            user.updateProfile({
              phoneNumber:phoneno,
              displayName:name,
              
            }).then(() => {console.log('success')
           
          
          })
            .catch(error => {console.log(error)})
          }else{
          
          
          const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
          uploadTask.on('state_changed', 
          (snapShot) => {
           
            toast("Upload Success",{type:toast.TYPE.SUCCESS});
          }, (err) => {
            
            toast("Upload Error",{type:toast.TYPE.ERROR});
          }, () => {
            
            const   user = firebase.auth().currentUser;
            setPhoneno(phoneno);
                storage.ref('images').child(imageAsFile.name).getDownloadURL()
             .then(fireBaseUrl => {
            
              user.updateProfile({
                 photoURL:fireBaseUrl,
                 displayName:name,
                 phoneNumber:phoneno
               })
             })
          })
        
        }

     
      }
      const handleSubmitForm = e => {
        e.preventDefault();
        handleFireBaseUpload();
      }
    return (
        <div className="bg-white w-4/5 sm:w-1/3  rounded overflow-hidden shadow-lg mt-12">
            <div className="flex justify-end">
            <button className="bg-red-700 text-sm hover:bg-red-900 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>Display</button>
            </div>
  <div className="text-center p-6  border-b">
     <img className="h-24 w-24 rounded-full mx-auto" src={imageAsUrl.imgUrl} alt="" /> 
   
    <div class="md:flex mb-6">
    <form onSubmit={handleFireBaseUpload}>
        <div class="md:flex-1 px-3 text-center">
          <div class="bg-red-500 text-white font-bold tracking-widest py-2 px-4 rounded opacity-50 mx-auto cusor-pointer relative">
            <input className="opacity-0 absolute pin-x pin-y" type="file" name="image" onChange={handleImageAsFile}/>
            Add Profile
          </div>
        </div>
        </form>
      </div>
  </div>
  <div className="border-b ">
    
    <div className="px-6 py-3 hover:bg-gray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg align-middle content-center ">
      <FontAwesomeIcon icon={faUser} size="1x" />
      </div>
      <div className="pl-3 flex items-center">
      <input className="w-full shadow-inner p-4 border-0" type="text" name="name" placeholder="Acme Mfg. Co." value={name} onChange={(e)=> setName(e.target.value)}/>
        
      </div>
    </div>
    <div className="px-6 py-3 hover:bg-gray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg content-center ">
      <FontAwesomeIcon icon={faEnvelope} size="1x"/>
      </div>
      <div className="pl-3 flex items-center">
      
          <input className="w-full shadow-inner p-4 border-0" type="email" name="email" placeholder="contact@acme.co" value={email} onChange={(e)=> setEmail(e.target.value)} readOnly disabled/>
       
        
      </div>
    </div>

    <div className="px-6 py-3 hover:bg-ghandleSubmitFormray-200 flex"> 
      <div className="w-8 h-8 bg-red-600 rounded-full text-center align-middle text-white text-lg ">
          <FontAwesomeIcon icon={faMobileAlt} size="1x"/>
      </div>
      <div className="pl-3 flex items-center">
      <input className="w-full shadow-inner p-4 border-0" type="text" name="phone" placeholder="(555) 555-5555" value={phoneno} onChange={(e) => setPhoneno(e.target.value)}/>
      </div>
      
    </div>

    <div className="flex justify-center">
            <button className="bg-red-700 text-sm hover:bg-red-900 text-white font-bold py-2 px-4 rounded m-2" onClick={handleSubmitForm}>Submit</button>
            </div>
    
  </div>
  
  
 
</div>
    )
}
export default Profile;
