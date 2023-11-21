import { useUser } from "../hooks/useUser"

export const ProfilePage = ()=>{
    const {user} = useUser()
    return(
        <section style={{flexDirection: "row"}}>
            <main>
                <img src="./src/assets/icons/user-icon.png"/>
            </main>
            <main>
                <h2>{user.lastName} {user.firstName}</h2>
                <h5 style={{
                    backgroundColor: '#dbb2b2',
                    width: '18%',
                    padding: '0.5rem',
                    'border-radius': '20px'
                }}>{user.rol}</h5> 
                <h3>{"Email: "+ user.email}</h3>
            </main>
            
        </section>
    )
}