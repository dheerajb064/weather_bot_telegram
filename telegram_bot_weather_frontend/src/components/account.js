import {useState,useEffect} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
const Account = () => {
  
  const [users,setUsers] = useState([]);
//   useEffect( ()=>{
//   async function callApi(){
//   const res = await fetch("https://localhost:5000/telegram");
//   const data = await res.json();
//   setUsers(data);
//   }
//   callApi();
//   },[users])

  useEffect(()=>{
    (async()=>{
        const res = await fetch("http://localhost:5000/telegram");
        const data = await res.json();
        setUsers(data);
    })();
  },[users])

  return (
    <main id="accounts">
     {
      users.map((user)=>{
        return <div className="user" key={user._id}>
         <div className="user-details">
          <div className="detail">
            <span className="detail-heading">Username: </span>{user.name}
          </div>
          <div className="detail">
            <span className="detail-heading">AccountId: </span>{user.chatId}
          </div>
          <div className="detail">
            <span className="detail-heading">City: </span>{user.city}
          </div>
          <div className="detail" style={{color: user.subscription === 'active' ? 'green' : 'orange'}}>
            <span className="detail-heading" style={{color:'black'}}>Subscription: </span>{user.subscription}
          </div>
         </div>
         <div className="actions">
          <BlockIcon id="blockbtn" className="action" style={{color: user.subscription === 'active' ? 'orange' : 'green'}}onClick={async (e)=>{
           await fetch(`http://localhost:5000/telegram/block/${user.chatId}`,{method: 'GET'});
           
          }}/>
          <DeleteIcon id="deletebtn"className="action" onClick={async (e)=>{
           await fetch(`http://localhost:5000/telegram/delete/${user.chatId}`,{method: 'GET'});
           
          }}/>

         </div>
        </div>
      })
     }
    </main>
  )
}

export default Account