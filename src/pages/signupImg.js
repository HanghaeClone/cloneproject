import LoginTemplate from "../components/loginTemplate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { userInfototal } from "../modules/user.js";
import { useDispatch } from "react-redux";
import { signupAxios } from "../modules/user.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

function SignupImg() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signData = useSelector((state) => state.user.signup);
  const [files, setFiles] = React.useState("");
  const [filesImg, setFilesImg] = React.useState("");
  let frm = new FormData();

  //fileReader
  const reader = new FileReader();

  const onChange = (e) => {
    const file = e.target.files;

    setFiles(file);
    //fileReader
    setFilesImg(e.target.files[0]);

    reader.readAsDataURL(e.target.files[0]);

    return new Promise((resolve) => {
      reader.onload = () => {
        setFilesImg(reader.result);
        resolve();
      };
    });
  };

  const signuptotalOnClick = async () => {
    if (files === "" || null) {
      alert("사진을 올려주세요!");
      return false;
    }
    frm.append("userEmail", signData.userEmail);
    frm.append("password", signData.password);
    frm.append("userName", signData.userName);
    frm.append("userAge", signData.userAge);
    frm.append("imageUrl", files[0]);
    dispatch(userInfototal(frm));

    try {
      await dispatch(signupAxios(frm)).then((res) => {
        if (res === true) {
          navigate("/login");
          alert("회원가입되었습니다!");
        } else {
          if (res.response.data.message === "the username already exists.") {
            alert("이미 가입된 ID입니다!");
            document.getElementById("SigninBtn").disabled = false;
          } else if (res.response.data.errors[0] === undefined) {
            alert("입력한 내용을 다시 확인해주세요!");
            document.getElementById("SigninBtn").disabled = false;
          } else {
            alert(
              res.response.data.errors[0].field +
                "에 " +
                res.response.data.errors[0].reason
            );
            document.getElementById("SigninBtn").disabled = false;
          }
        }
      });
    } catch (err) {
      alert("해당 이메일은 이미 가입된 이메일입니다!");
      navigate("/signup");
    }
  };

  return (
    <LoginTemplate>
      <Form>
        {filesImg ? (
          <ShowImg alt="sample" id="showImg" src={filesImg} />
        ) : (
          <NoShowImg
            alt="sample"
            id="showImg"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAA1BMVEXi4uIvUCsuAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABODcYhAAEl463hAAAAAElFTkSuQmCC"
          />
        )}

        {filesImg ? (
          <Label>
            <FontAwesomeIcon
              icon={faArrowRotateLeft}
              size="2x"
              style={{ color: "white" }}
            />
            <input
              name="imgUpload"
              type="file"
              id="add_img"
              accept="image/*"
              onChange={onChange}
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                padding: 0,
                overflow: "hidden",
                border: 0,
                backgroundColor: "green",
              }}
            />
          </Label>
        ) : (
          <Label>
            <FontAwesomeIcon
              icon={faPlus}
              size="2x"
              style={{ color: "white" }}
            />

            <input
              name="imgUpload"
              type="file"
              id="add_img"
              accept="image/*"
              onChange={onChange}
              style={{
                width: 0,
                height: 0,
                padding: 0,
                overflow: "hidden",
                border: 0,
                backgroundColor: "green",
              }}
            />
          </Label>
        )}

        <Button color="#fccb4f" id="SignUpBtn" onClick={signuptotalOnClick}>
          Next
        </Button>
      </Form>
    </LoginTemplate>
  );
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const ShowImg = styled.img`
  position: relative;
  width: 500px;
  max-width: 85vw;
  height: 500px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  margin-bottom: 30px;
`;

const NoShowImg = styled.img`
  position: relative;
  width: 500px;
  max-width: 85vw;
  height: 500px;
  border-radius: 20px;
  background-size: cover;
  background-color: gray;
  background-position: center;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  border: 6px;
  border-style: dashed;
  border-color: #d3d3d3;
  margin-bottom: 30px;
`;

const Label = styled.label`
  width: 40px;
  height: 40px;
  background-color: pink;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f8f8; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff3774, #ff8146);
  background: linear-gradient(to right, #ff3774, #ff8146);
  position: fixed;
  top: calc(90% / 1.7 + 50px);
`;

const Button = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin-bottom: 10px;
  border: none;
  padding: 18px;
  width: 20em;
  letter-spacing: 2px;
  background-color: ${(props) => props.color};
  color: white;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
  background: #f7f8f8; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff3774, #ff8146);
  background: linear-gradient(to right, #ff3774, #ff8146);
`;

export default SignupImg;
