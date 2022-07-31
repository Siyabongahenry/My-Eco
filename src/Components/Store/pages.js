import { Link } from "react-router-dom";
const Pages = ()=>{
    return (
        <div className="page-links-container">
            <Link className="page-no" to="/">1</Link>
            <Link className="page-no" to="/">2</Link>
            <Link className="page-no" to="/">3</Link>
            <Link className="page-no" to="/">4</Link>
        </div>
    );
}

export default Pages;