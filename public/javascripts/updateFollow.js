let followunfollow=document.getElementById('followunfollow');
onClick=async function(value){
   console.log(value);
   const url=window.origin
   let response=await fetch(`${url}/follow/${value}`,{method:'POST'})
   let data= await response.json()
   console.log(data.isFollowing);
   if(data.isFollowing)
   {
       followunfollow.innerText='unfollow'
       followunfollow.className='unfollow w-[60%] h-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
   }else{
       followunfollow.innerText='follow'
       followunfollow.className='follow w-[60%] h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
   }

}