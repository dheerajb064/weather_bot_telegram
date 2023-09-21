import {useState,useEffect} from 'react'

const Settings = () => {
  const [settings,setSettings] = useState({
    teleBotApiKey: "",
    weatherApiKey: ""
  });
  const [id ,setId] = useState("");
  useEffect(()=>{
  async function getSettings(){
    const res = await fetch('http://localhost:5000/telegram/bot');
    const data = await res.json();
    console.log(data);
    setSettings({teleBotApiKey: data.teleBotApiKey , weatherApiKey: data.weatherApiKey});
    setId(data._id);
  } 
  getSettings();
  },[])

  return (
    <main id="settings">
     <div className="api-key">
      <span>Telebot Api Key: </span><input type="text" className="api" value={settings.teleBotApiKey} name="teleBotApiKey" onChange={e => setSettings({...settings,[e.target.name]: e.target.value})} id="tel-api"/>
      <button className="update-btn" onClick={async (e)=>{
        const config = {
          method: "PUT",
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(settings)
        }
        console.log(config.body)
        const res = await fetch(`http://localhost:5000/telegram/bot/${id}`,config);
        
      }}>Update</button>
      </div>
      <div className="api-key">
      <span>Weather Map Api Key: </span><input type="text" className="api" value={settings.weatherApiKey} name="weatherApiKey" onChange={e => setSettings({...settings,[e.target.name]: e.target.value})} id="weather-api"/>
      <button className="update-btn" onClick={async (e)=>{
        const config = {
          method: "PUT",
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify(settings)
        }
        const res = await fetch(`http://localhost:5000/telegram/bot/${id}`,config);
        
      }}>Update</button>
      </div>  
    </main>
  )
}

export default Settings