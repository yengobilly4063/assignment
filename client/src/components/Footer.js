import React from "react";
import "../styles/footer.css"


const Footer = () => {
    return (
        <footer>
            <div className="footer-wrapper">
                <div className="container">
                    <h1>Copyright &copy; {new Date().getFullYear()}</h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer
