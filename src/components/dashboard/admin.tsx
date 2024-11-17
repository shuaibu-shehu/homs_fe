'use client'
// import { getUsers } from '@/lib/actions/hospital';
// import { currentUser } from '@/lib/auth';
import React from 'react'
import UserCard from '../user-card'

function Admin() {
    // const [users, setUsers] = React.useState()
    // const user = await currentUser()

    // React.useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             console.log("fetching users");
                
    //             const response = await getUsers();
    //             const data = response;
    //             setUsers(data);
    //             console.log("fetched users", data);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    // console.log("user: ", user);
  return (
    <div className='flex flex-col gap-4 p-4 w-[100%]'>
      <div className=' flex gap-3  mx-auto'>
      <UserCard type="Departments" />
      <UserCard type="Active sensor" />
      <UserCard type="staff" />
      </div>
    </div>
  )
}

export default Admin