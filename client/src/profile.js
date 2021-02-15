import ProfilePic from "./profile_pic";
import BioEditor from "./bio_editor";

export default function Profile(props) {
    //console.log("Props in profile", props);
    return (
        <>
            <div className="profile_big">
                <h3>
                    Hello {props.first} {props.last}
                </h3>

                <ProfilePic
                    first={props.first}
                    last={props.last}
                    profilePicUrl={props.profilePicUrl}
                />

                <BioEditor bio={props.bio} setBio={props.setBio} />
            </div>
        </>
    );
}
