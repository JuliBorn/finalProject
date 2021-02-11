import BioEditor from "./bio_editor";

export default function ProfilePic(props) {
    console.log("props: ", props);
    let { first, last, profilePic_url, toggleUploader } = props;
    return (
        <div className="profilepic_container">
            <img
                onClick={toggleUploader}
                scr={profilePic_url || "./default.svg"}
                alt={`${first}${last}`}
            ></img>
        </div>
    );
}
