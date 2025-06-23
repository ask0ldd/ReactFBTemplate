import { useServicesContext } from "../hooks/context/useServices";
import Link from "../router/Link";

export default function Header({activeMenuItem} : {activeMenuItem : string}){

    const {authService} = useServicesContext()

    function handleDisconnect(e : React.MouseEvent){
        e.preventDefault()
        authService.disconnect()
    }

    return(
        <header>
            <ul style={{display:'flex', flexDirection:'row', columnGap:'10px', listStyleType:'none'}}>
                <Link href={"/login"}><li style={activeMenuItem == "login" ? {background:'#fff', width:'100px', textAlign:'center'} : {width:'100px', textAlign:'center'}}>login</li></Link>
                <Link href={"/register"}><li style={activeMenuItem == "register" ? {background:'#fff', width:'100px', textAlign:'center'} : {width:'100px', textAlign:'center'}}>register</li></Link>
                <Link href={"/tests"}><li style={activeMenuItem == "tests" ? {background:'#fff', width:'100px', textAlign:'center'} : {width:'100px', textAlign:'center'}}>tests</li></Link>
                <Link href={"/google"}><li style={activeMenuItem == "google" ? {background:'#fff', width:'100px', textAlign:'center'} : {width:'100px', textAlign:'center'}}>google connect</li></Link>
                <li style={{width:'100px', textAlign:'center', cursor:'pointer'}} onClick={handleDisconnect}>Disconnect</li>
            </ul>
        </header>
    )
}