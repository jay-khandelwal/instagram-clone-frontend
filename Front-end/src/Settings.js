const HOST_URL = "https://instagram-cloone.herokuapp.com";
const SOCKET_URL = "wss://instagram-cloone.herokuapp.com";


const renderTimestamp = timestamp => {
    const date = new Date(timestamp)
    const todayDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
    if (todayDate.getFullYear() === date.getFullYear()){
        
        if (todayDate.getMonth()===date.getMonth()){
            if (todayDate.getDate()===date.getDate()){
                if (todayDate.getHours()===date.getHours()){
                    if (todayDate.getMinutes()-date.getMinutes() < 2){
                        return 'Just Now'
                    }
                    else{
                        return `${todayDate.getMinutes() - date.getMinutes()} MINUTES AGO` 
                    }
                }
                else{
                    return `${todayDate.getHours() - date.getHours()} HOURS AGO`
                }
            }
            else{
                return `${todayDate.getDate() - date.getDate()} DAYS AGO`
            }
        }
        else{
            return `${date.getDate()} ${monthNames[date.getMonth()]}`
        }
        
    }
};      
    

export { HOST_URL, SOCKET_URL, renderTimestamp };