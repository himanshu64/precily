import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import data from './data.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'




const Dashboard = (props) => {
    const history = useHistory();
   const [endDate, setendDate] = useState();
    const [startDate, setstartDate] = useState();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    
 
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    useEffect(() => {
       
        if (props.authenticated) {
            history.push('/dashboard');
        } else {
            history.push('/');
        }
       

        const results = data.filter(user => 
            user.first_name.toLowerCase().includes(search)
        );
       
        setSearchResult(results);
       

    }, [props.authenticated, history,search,startDate,endDate]);

    const handleDateSubmit = () => {
  
    let from_date = moment(startDate).format( "l")
    let to_date = moment(endDate).format('l')
        // const result = data.filter(user => {
        //     return (startDate>= new Date(user.joining_date) && endDate <= new Date(user.joining_date));
        // });
        const result = data.filter(user => {
        return (moment(user.joining_date).format("l") >  from_date && moment(user.joining_date).format("l") <  to_date);
        });
        if(!result){
            toast("Not Data Found",{type:toast.TYPE.INFO});
        }
        setSearchResult(result);
        
    
    }
    
    const renderRow = (data,index) =>{
        
        return (
             
            <tr key={index}>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{data.id}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-full h-full rounded-full"
                            src={data.photo}
                            alt="" />
                    </div>
                    <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                            {data.first_name} {data.last_name}
                        </p>
                    </div>
                </div>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{data.email}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{data.gender}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                    {data.joining_date}
                </p>
            </td>

        </tr>
    
        )}
    
    return (

        <div class="antialiased font-sans bg-gray-200">
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER}/>
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight text-center">Users</h2>
                    </div>
                    <div class="my-2 flex sm:flex-row flex-col">
                        <div class="block relative">
                            <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                                    <path
                                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                    </path>
                                </svg>
                            </span>
                            <div className="flex flex-col">
                        <h2 class="text-sm font-semibold leading-tight">Search</h2>
                        <input placeholder="Search"
                                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                                value={search} onChange={handleSearch} />
                            </div>
                            
                        </div>
                        <div className="flex flex-col">
                        <div>
                        <h2 class="text-sm font-semibold leading-tight">Start Date</h2>
                    </div>
                            <DatePicker selected={startDate} onChange={date => setstartDate(date)} dateFormat="dd/MM/yyyy"/>
                        </div>
                        <div>
                        <div className="flex flex-col">
                        <h2 class="text-sm font-semibold leading-tight">Start Date</h2>
                    </div>
                        <DatePicker selected={endDate} onChange={date => setendDate(date)} dateFormat="dd/MM/yyyy"/>
                        </div>
                        <div className="mt-4 ml-1">
                        <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded" onClick={handleDateSubmit} disabled={!endDate && !startDate} >Submit</button>
                        </div>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                    <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                           Id
                                </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            User
                                </th>

                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Email
                                </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Gender
                                </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Joining Date
                                </th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {

                                        searchResult.map((user, index) => 
                                       renderRow(user,index)
                                        )

                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;