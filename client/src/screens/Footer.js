function Footer()
{
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="black" />
                    <stop offset="95%" stopColor="yellow" />
                </linearGradient>
                    <path fill="url(#Gradient2)" fillOpacity="1"
                    d="M0,224L48,234.7C96,245,192,267,288,272C384,277,480,267,576,256C672,245,768,235,864,240C960,245,1056,267,1152,272C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
            </svg>
        </div>
    )
}
export default Footer