import cork1890 from '../assets/Cork1890.jpg';
import cork1891 from '../assets/Cork1891.jpg';
import cork1924 from '../assets/Cork1924.jpg';
import corkMid20 from '../assets/CorkMid20.jpg';


function LandingPage() {
  return (
    <div className="text-amber-100 text-shadow-md text-shadow-black flex flex-col items-center">
      <h1 className="text-4xl pt-5 pb-10 font-semibold">The Cork Board Story</h1>
      <div className="flex flex-col items-center gap-15 pb-20">
        <img className="w-11/12 rounded-lg shadow-black shadow-md" src={`${cork1890}`} alt="History of cork 1890" />
        <img className="w-11/12 rounded-lg shadow-black shadow-md" src={`${cork1891}`} alt="History of cork 1891" />
        <img className="w-11/12 rounded-lg shadow-black shadow-md" src={`${cork1924}`} alt="History of cork 1924" />
        <img className="w-11/12 rounded-lg shadow-black shadow-md" src={`${corkMid20}`} alt="History of cork Mid 20th Century" />
      </div>
    </div>
  )
}

export default LandingPage;