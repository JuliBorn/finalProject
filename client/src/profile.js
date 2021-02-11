

import ProfilePic from ("./profile_pic")
import BioEditor from ("./bio_editor")


export default function Profile(props) {
    console.log("Props in BioEditor", this.props);
    return (
        <>
            <div className="body">
                <h3>
                    Hello {props.first} {props.last}</h3>
            <ProfilePic first = {props.first} last = {props.last}/>
        <BioEditor/>
                
            </div>
        </>
    );
}
