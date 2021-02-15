//import BioEditor from "./bio_editor";

export default function ProfilePic(props) {
    //console.log("props in profile_pic: ", props);
    let { first, last, profilePicUrl, toggleUploader } = props;
    return (
        <>
            <img
                className="profile_pic"
                src={props.profilePicUrl || "/default.svg"}
                onClick={toggleUploader}
                alt={`${first} ${last}`}
            ></img>
        </>
    );
}
