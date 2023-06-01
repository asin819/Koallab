import { React, useState, useRef } from "react";
import { Button, TextField, FormControl, InputLabel } from "@mui/material";
import "./styles/UserProfileCard.css";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import profileImage from '../assets/profile.png'
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";

export const UserProfileCard = ({
  UserImage,
  UserName,
  UserEmail,
  UserPassword,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(UserEmail)
  const [pass, setPass] = useState(UserPassword)


  const SaveData = () => {
    setIsEditing(false);
    console.log(email)
    console.log(pass)
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePassChange = (e) => {
    setPass(e.target.value)
  }

  const inputFile = useRef(null) 
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log(inputFile)
    uploadResource(projectid, inputFile);
  };

  return (
    <div className="UserProfileCard_container">
      <div className="UserProfileCard_details">
        <img src={profileImage} alt="profile image" width='200px' style={{
          marginTop: '20px',
          borderRadius: '10px'
        }} />
        {isEditing &&
          <Button onClick={onButtonClick} sx={{
            textTransform: "none"
          }}>Edit image
                <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>

          </Button>
        }
        <div className="UserProfileCard_titleDiv">
          <h2 className="UserProfileCard_title">{UserName}</h2>
          {isEditing && (
            <Button
              className="UserProfileCard_SaveButton"
              onClick={() => SaveData()}
              sx={{
                textTransform: 'none'
              }}
            >
              Save
            </Button>
          )}
          {!isEditing && (
            <div
              className="UserProfileCard_EditButton"
              onClick={() => setIsEditing(true)}
            >
              <PencilSquareIcon width={"24px"} style={{cursor: 'pointer'}}/>
            </div>
          )}
        </div>
        {!isEditing && <p style={{ marginBottom: '20px'}}>{UserEmail}</p>}
        {isEditing && (
          <div className="UserProfileCard_editingDivs">
            <p>Email</p>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              
              style={{ marginBottom: "20px" }}
              defaultValue={UserEmail}
            />
            <p>Password</p>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              style={{ marginBottom: "20px" }}
              
            >
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={'123'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <EyeSlashIcon width={"20px"} color="#000" />
                      ) : (
                        <EyeIcon width={"20px"} color="#000" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                
              />
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
};
